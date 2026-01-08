export interface User {
  id: number;
  email: string;
  username: string;
  first_name?: string;
  last_name?: string;
  avatar_url?: string;
  preferred_color?: string;
}

export interface MessageUser {
  id: number;
  username: string;
  first_name?: string;
  last_name?: string;
  avatar_url?: string;
  preferred_color?: string;
}

export interface Channel {
  id: number;
  name: string;
  description?: string;
  created_by: number;
  is_private: boolean;
  created_at: string;
  updated_at: string;
}

export interface Message {
  id: string;
  channel_id: number;
  user_id: number;
  user: MessageUser;
  content: string;
  attachments?: Array<{
    file_id: string;
    filename: string;
    mime_type: string;
    size: number;
  }>;
  edited_at?: string;
  created_at: string;
  updated_at: string;
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: {
    code: string;
    message: string;
    details?: unknown;
  };
}

export interface AuthResponse {
  user: User;
  token: string;
}
