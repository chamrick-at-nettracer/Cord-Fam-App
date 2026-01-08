import api from './api';
import type { ApiResponse, Message } from '../types/api';

export const messageService = {
  async getChannelMessages(channelId: number): Promise<Message[]> {
    const response = await api.get<ApiResponse<Message[]>>(`/channels/${channelId}/messages`);
    if (response.data.success && response.data.data) {
      return response.data.data;
    }
    throw new Error(response.data.error?.message || 'Failed to fetch messages');
  },

  async sendMessage(channelId: number, content: string): Promise<Message> {
    const response = await api.post<ApiResponse<Message>>(`/channels/${channelId}/messages`, {
      content,
    });
    if (response.data.success && response.data.data) {
      return response.data.data;
    }
    throw new Error(response.data.error?.message || 'Failed to send message');
  },
};
