export interface Channel {
  id: number;
  name: string;
  description?: string;
  created_by: number;
  is_private: boolean;
  created_at: Date;
  updated_at: Date;
}

export interface CreateChannelInput {
  name: string;
  description?: string;
  is_private?: boolean;
}

export interface ChannelResponse {
  id: number;
  name: string;
  description?: string;
  created_by: number;
  is_private: boolean;
  created_at: string;
  updated_at: string;
}
