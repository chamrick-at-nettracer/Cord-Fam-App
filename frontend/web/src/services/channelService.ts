import api from './api';
import type { ApiResponse, Channel } from '../types/api';

export const channelService = {
  async getAllChannels(): Promise<Channel[]> {
    const response = await api.get<ApiResponse<Channel[]>>('/channels');
    if (response.data.success && response.data.data) {
      return response.data.data;
    }
    throw new Error(response.data.error?.message || 'Failed to fetch channels');
  },

  async getChannelById(id: number): Promise<Channel> {
    const response = await api.get<ApiResponse<Channel>>(`/channels/${id}`);
    if (response.data.success && response.data.data) {
      return response.data.data;
    }
    throw new Error(response.data.error?.message || 'Failed to fetch channel');
  },

  async createChannel(name: string, description?: string): Promise<Channel> {
    const response = await api.post<ApiResponse<Channel>>('/channels', {
      name,
      description,
      is_private: false,
    });
    if (response.data.success && response.data.data) {
      return response.data.data;
    }
    throw new Error(response.data.error?.message || 'Failed to create channel');
  },
};
