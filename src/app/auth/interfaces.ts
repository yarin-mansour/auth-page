export interface RefreshToken {
    id: number;
    userId: number;
    token: string;
    refreshCount: number;
    expiryDate: Date;
  }

  export interface LoginResponse {
    accessToken: string;
    refreshToken: RefreshToken;
    tokenType: string;
  }

  export interface LoginRequest {
    email: string;
    password: string;
    remember: boolean;
  }
 
  export interface RegisterRequest {
    email?: string;
    username?: string;
    agree?: boolean;
    password?: string;
    confirmPassword?: string;
  }

  export interface ResetResponse {
    email: string;
    status: number;
  }
  
  export interface RegisterResponse {
    status: number;
    message: string;
  }