
import axios from 'axios';
import { RegisterRequest, LoginRequest, AuthResponse, ProfileUpdateRequest, UserDTO } from '@/types/auth';

const API_URL = 'http://localhost:8080/api';

export const authService = {
  async register(data: RegisterRequest): Promise<AuthResponse> {
    const response = await axios.post<AuthResponse>(`${API_URL}/auth/register`, data);
    if (response.data.token) {
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('refreshToken', response.data.refreshToken);
    }
    return response.data;
  },

  async login(data: LoginRequest): Promise<AuthResponse> {
    const response = await axios.post<AuthResponse>(`${API_URL}/auth/login`, data);
    if (response.data.token) {
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('refreshToken', response.data.refreshToken);
    }
    return response.data;
  },

  async updateProfile(userId: number, data: ProfileUpdateRequest): Promise<UserDTO> {
    const token = localStorage.getItem('token');
    if (!token) throw new Error('No token found');

    let updatedUser = await this.getCurrentUser();

    if (data.bio) {
      const bioResponse = await axios.post(
        `${API_URL}/graphql`,
        {
          query: `
            mutation UpdateBio($userId: ID!, $bio: String!) {
              updateBio(userId: $userId, bio: $bio) {
                id
                bio
              }
            }
          `,
          variables: { userId, bio: data.bio }
        },
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );
      updatedUser = { ...updatedUser, ...bioResponse.data.data.updateBio };
    }

    if (data.profilePicture) {
      const pictureResponse = await axios.post(
        `${API_URL}/graphql`,
        {
          query: `
            mutation UpdateProfilePicture($userId: ID!, $pictureUrl: String!) {
              updateProfilePicture(userId: $userId, pictureUrl: $pictureUrl) {
                id
                profilePicture
              }
            }
          `,
          variables: { userId, pictureUrl: data.profilePicture }
        },
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );
      updatedUser = { ...updatedUser, ...pictureResponse.data.data.updateProfilePicture };
    }

    return updatedUser;
  },

  async getCurrentUser(): Promise<UserDTO> {
    const token = localStorage.getItem('token');
    if (!token) throw new Error('No token found');

    const response = await axios.post(
      `${API_URL}/graphql`,
      {
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
      },
      {
        headers: { Authorization: `Bearer ${token}` }
      }
    );

    return response.data.data.getCurrentUser;
  },

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('refreshToken');
  }
};
