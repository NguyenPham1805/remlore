import { CommentReaction } from './reaction';
import { User } from './user';

export interface Comment {
  id: string;
  content: string;
  author: User;
  postId?: string;
  replyToId?: string;
  createdAt: Date;
  updatedAt: Date;
  reactions: CommentReaction[];
  replies: Comment[];
  replyCount: number;
}
