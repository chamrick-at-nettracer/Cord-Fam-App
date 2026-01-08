import { MessageRepository } from '../repositories/messageRepository';
import { UserRepository } from '../repositories/userRepository';
import { CreateMessageInput, MessageResponse, MessageUser } from '../types/message';

export class MessageService {
  private messageRepository = new MessageRepository();
  private userRepository = new UserRepository();

  async getChannelMessages(channelId: number, limit = 50): Promise<MessageResponse[]> {
    const messages = await this.messageRepository.findByChannelId(channelId, limit);

    // Get unique user IDs and fetch user data
    const userIds = [...new Set(messages.map((m) => m.user_id))];
    const users = await Promise.all(userIds.map((id) => this.userRepository.findById(id)));
    const userMap = new Map(
      users.filter((u): u is NonNullable<typeof u> => u !== null).map((u) => [u.id, u])
    );

    return messages
      .map((message) => this.toMessageResponse(message, userMap.get(message.user_id)))
      .reverse(); // Reverse to show oldest first
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
    const user = await this.userRepository.findById(userId);
    return this.toMessageResponse(message, user || undefined);
  }

  private toMessageResponse(
    message: {
      _id?: string;
      channel_id: number;
      user_id: number;
      content: string;
      attachments?: Array<{ file_id: string; filename: string; mime_type: string; size: number }>;
      edited_at?: Date;
      created_at: Date;
      updated_at: Date;
    },
    user?: {
      id: number;
      username: string;
      first_name?: string;
      last_name?: string;
      avatar_url?: string;
      preferred_color?: string;
    }
  ): MessageResponse {
    const messageUser: MessageUser = user
      ? {
          id: user.id,
          username: user.username,
          first_name: user.first_name,
          last_name: user.last_name,
          avatar_url: user.avatar_url,
          preferred_color: user.preferred_color,
        }
      : {
          id: message.user_id,
          username: `User ${message.user_id}`,
        };

    return {
      id: message._id?.toString() || '',
      channel_id: message.channel_id,
      user_id: message.user_id,
      user: messageUser,
      content: message.content,
      attachments: message.attachments,
      edited_at: message.edited_at?.toISOString(),
      created_at: message.created_at.toISOString(),
      updated_at: message.updated_at.toISOString(),
    };
  }
}
