import { MessageRepository } from '../repositories/messageRepository';
import { CreateMessageInput, MessageResponse } from '../types/message';

export class MessageService {
  private messageRepository = new MessageRepository();

  async getChannelMessages(channelId: number, limit = 50): Promise<MessageResponse[]> {
    const messages = await this.messageRepository.findByChannelId(channelId, limit);
    return messages.map(this.toMessageResponse).reverse(); // Reverse to show oldest first
  }

  async createMessage(
    input: CreateMessageInput,
    channelId: number,
    userId: number
  ): Promise<MessageResponse> {
    const message = await this.messageRepository.create({
      ...input,
      channel_id: channelId,
      user_id: userId,
    });
    return this.toMessageResponse(message);
  }

  private toMessageResponse(message: {
    _id?: string;
    channel_id: number;
    user_id: number;
    content: string;
    attachments?: Array<{ file_id: string; filename: string; mime_type: string; size: number }>;
    edited_at?: Date;
    created_at: Date;
    updated_at: Date;
  }): MessageResponse {
    return {
      id: message._id?.toString() || '',
      channel_id: message.channel_id,
      user_id: message.user_id,
      content: message.content,
      attachments: message.attachments,
      edited_at: message.edited_at?.toISOString(),
      created_at: message.created_at.toISOString(),
      updated_at: message.updated_at.toISOString(),
    };
  }
}
