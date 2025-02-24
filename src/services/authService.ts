
import axios from 'axios';
import { RegisterRequest, LoginRequest, AuthResponse, ProfileUpdateRequest, UserDTO } from '@/types/auth';

const API_URL = 'http://localhost:8088/api';

// Create an axios instance with default config
const axiosInstance = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true // Important for handling cookies with CORS
});

// Add interceptor to add token to requests
axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Add interceptor to handle token refresh
axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      const refreshToken = localStorage.getItem('refreshToken');
      
      try {
        const response = await axios.post(`${API_URL}/auth/refresh`, null, {
          params: { refreshToken },
          withCredentials: true
        });
        
        const { token, refreshToken: newRefreshToken } = response.data;
        localStorage.setItem('token', token);
        localStorage.setItem('refreshToken', newRefreshToken);
        
        originalRequest.headers.Authorization = `Bearer ${token}`;
        return axios(originalRequest);
      } catch (error) {
        // If refresh token fails, logout user
        authService.logout();
        return Promise.reject(error);
      }
    }
    return Promise.reject(error);
  }
);

export const authService = {
  async register(data: RegisterRequest): Promise<AuthResponse> {
    const response = await axiosInstance.post<AuthResponse>('/auth/register', data);
    if (response.data.token) {
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('refreshToken', response.data.refreshToken);
    }
    return response.data;
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
    let updatedUser = await this.getCurrentUser();

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
        variables: { userId, bio: data.bio }
      });
      updatedUser = { ...updatedUser, ...bioResponse.data.data.updateBio };
    }

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
        variables: { userId, pictureUrl: data.profilePicture }
      });
      updatedUser = { ...updatedUser, ...pictureResponse.data.data.updateProfilePicture };
    }

    return updatedUser;
  },

  async getCurrentUser(): Promise<UserDTO> {
    const response = await axiosInstance.post('/graphql', {
      query: `
        query GetCurrentUser {
          getCurrentUser {
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

    return response.data.data.getCurrentUser;
  },

  initiateGoogleAuth() {
    window.location.href = `${API_URL}/oauth2/authorize/google?redirect_uri=${window.location.origin}/oauth2/callback`;
  },

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('refreshToken');
    // Additional cleanup if needed
  }
};
