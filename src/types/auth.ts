
export interface RegisterRequest {
  username: string;
  email: string;
  password: string;
  bio?: string;
  profilePicture?: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface AuthResponse {
  token: string;
  refreshToken: string;
  user: UserDTO;
}

export interface UserDTO {
  id: number;
  username: string;
  email: string;
  bio?: string;
  profilePicture?: string;
  active: boolean;
}

export interface ProfileUpdateRequest {
  bio?: string;
  profilePicture?: string;
}
