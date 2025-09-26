// Authentication related types

export interface Login {
  email: string;
  password: string;
}

interface Tokens {
  access: string;
  refresh: string;
}

type Authorization = {
  user: UserAuthResponse;
  tokens: Tokens;
}

export interface AuthResponse {
  authorization: Authorization;
}

// You'll need to define UserAuthResponse based on your server
export interface UserAuthResponse {
  id: string;
  email: string;
  name: string;
  // Add other user fields as needed
}
