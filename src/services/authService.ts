
import axios from 'axios';
import { RegisterRequest, LoginRequest, AuthResponse, ProfileUpdateRequest, UserDTO } from '@/types/auth';

const API_URL = 'http://localhost:8088/api';

// Create axios instance with default config
const axiosInstance = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true
});

// Add token to requests
axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Add refresh token interceptor
axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      const refreshToken = localStorage.getItem('refreshToken');
      
      try {
        const response = await axiosInstance.post<AuthResponse>('/auth/refresh', null, {
          params: { refreshToken }
        });
        
        if (response.data.token) {
          localStorage.setItem('token', response.data.token);
          localStorage.setItem('refreshToken', response.data.refreshToken);
          originalRequest.headers.Authorization = `Bearer ${response.data.token}`;
          return axiosInstance(originalRequest);
        }
      } catch (refreshError) {
        // If refresh fails, logout
        authService.logout();
      }
    }
    return Promise.reject(error);
  }
);

export const authService = {
  async register(data: RegisterRequest): Promise<AuthResponse> {
    try {
      const response = await axiosInstance.post<AuthResponse>('/auth/register', data);
      console.log('Registration response:', response.data);
      
      if (response.data.token && response.data.user) {
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('refreshToken', response.data.refreshToken);
        return response.data;
      } else {
        console.error('Invalid response structure:', response.data);
        throw new Error('Invalid response from server');
      }
    } catch (error) {
      console.error('Registration error:', error);
      throw error;
    }
  },

  async login(data: LoginRequest): Promise<AuthResponse> {
    const response = await axiosInstance.post<AuthResponse>('/auth/login', data);
    if (response.data.token) {
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('refreshToken', response.data.refreshToken);
    }
    return response.data;
  },

  async updateProfile(userId: number, data: ProfileUpdateRequest): Promise<UserDTO> {
    if (data.profilePicture) {
      const pictureResponse = await axiosInstance.post('/graphql', {
        query: `
          mutation UpdateProfilePicture($userId: ID!, $pictureUrl: String!) {
            updateProfilePicture(userId: $userId, pictureUrl: $pictureUrl) {
              id
              profilePicture
            }
          }
        `,
        variables: { 
          userId: userId.toString(), 
          pictureUrl: data.profilePicture 
        }
      });

      if (pictureResponse.data.errors) {
        throw new Error(pictureResponse.data.errors[0].message);
      }
    }

    if (data.bio) {
      const bioResponse = await axiosInstance.post('/graphql', {
        query: `
          mutation UpdateBio($userId: ID!, $bio: String!) {
            updateBio(userId: $userId, bio: $bio) {
              id
              bio
            }
          }
        `,
        variables: { 
          userId: userId.toString(), 
          bio: data.bio 
        }
      });

      if (bioResponse.data.errors) {
        throw new Error(bioResponse.data.errors[0].message);
      }
    }

    return this.getCurrentUser();
  },

  async getCurrentUser(): Promise<UserDTO> {
    const response = await axiosInstance.post('/graphql', {
      query: `
        query GetCurrentUser {
          getUserById(id: "me") {
            id
            username
            email
            bio
            profilePicture
            active
          }
        }
      `
    });

    if (response.data.errors) {
      throw new Error(response.data.errors[0].message);
    }

    return response.data.data.getUserById;
  },

  initiateGoogleAuth() {
    window.location.href = 'http://localhost:8088/oauth2/authorization/google';
  },

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('refreshToken');
  }
};
