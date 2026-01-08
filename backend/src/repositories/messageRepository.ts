import { mongoConnection } from '../database/mongodb';
import { Message, CreateMessageInput } from '../types/message';

export class MessageRepository {
  private getCollection() {
    return mongoConnection.getDb().collection<Message>('messages');
  }

  async findByChannelId(channelId: number, limit = 50): Promise<Message[]> {
    const collection = this.getCollection();
    return await collection
      .find({ channel_id: channelId })
      .sort({ created_at: -1 })
      .limit(limit)
      .toArray();
  }

  async create(input: CreateMessageInput & { channel_id: number; user_id: number }): Promise<Message> {
    const collection = this.getCollection();
    const message: Message = {
      channel_id: input.channel_id,
      user_id: input.user_id,
      content: input.content,
      attachments: input.attachments || [],
      created_at: new Date(),
      updated_at: new Date(),
    };

    const result = await collection.insertOne(message);
    const created = await collection.findOne({ _id: result.insertedId });
    if (!created) {
      throw new Error('Failed to create message');
    }
    return created;
  }
}
