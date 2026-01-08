import { ChannelRepository } from '../repositories/channelRepository';
import { CreateChannelInput, ChannelResponse } from '../types/channel';

export class ChannelService {
  private channelRepository = new ChannelRepository();

  async getAllChannels(): Promise<ChannelResponse[]> {
    const channels = await this.channelRepository.findAll();
    return channels.map(this.toChannelResponse);
  }

  async getChannelById(id: number): Promise<ChannelResponse> {
    const channel = await this.channelRepository.findById(id);
    if (!channel) {
      throw new Error('Channel not found');
    }
    return this.toChannelResponse(channel);
  }

  async createChannel(input: CreateChannelInput, userId: number): Promise<ChannelResponse> {
    const channel = await this.channelRepository.create({
      ...input,
      created_by: userId,
    });
    return this.toChannelResponse(channel);
  }

  async isMember(channelId: number, userId: number): Promise<boolean> {
    return await this.channelRepository.isMember(channelId, userId);
  }

  async ensureMember(channelId: number, userId: number): Promise<void> {
    const isMember = await this.isMember(channelId, userId);
    if (!isMember) {
      // Check if channel is private
      const channel = await this.channelRepository.findById(channelId);
      if (!channel) {
        throw new Error('Channel not found');
      }
      // Auto-join public channels, require explicit join for private channels
      if (!channel.is_private) {
        await this.channelRepository.addMember(channelId, userId);
      } else {
        throw new Error('You are not a member of this private channel');
      }
    }
  }

  private toChannelResponse(channel: {
    id: number;
    name: string;
    description?: string;
    created_by: number;
    is_private: boolean;
    created_at: Date;
    updated_at: Date;
  }): ChannelResponse {
    return {
      id: channel.id,
      name: channel.name,
      description: channel.description,
      created_by: channel.created_by,
      is_private: channel.is_private,
      created_at: channel.created_at.toISOString(),
      updated_at: channel.updated_at.toISOString(),
    };
  }
}
