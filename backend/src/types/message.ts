export interface Message {
  _id?: string;
  channel_id: number;
  user_id: number;
  content: string;
  attachments?: Attachment[];
  edited_at?: Date;
  created_at: Date;
  updated_at: Date;
}

export interface Attachment {
  file_id: string;
  filename: string;
  mime_type: string;
  size: number;
}

export interface CreateMessageInput {
  content: string;
  attachments?: Attachment[];
}

export interface MessageUser {
  id: number;
  username: string;
  first_name?: string;
  last_name?: string;
  avatar_url?: string;
  preferred_color?: string;
}

export interface MessageResponse {
  id: string;
  channel_id: number;
  user_id: number;
  user: MessageUser;
  content: string;
  attachments?: Attachment[];
  edited_at?: string;
  created_at: string;
  updated_at: string;
}
