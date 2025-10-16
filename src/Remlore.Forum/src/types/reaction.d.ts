import { EReaction } from '@remlore/enums';
import { User } from './user';

export interface Reaction {
  id: string;
  type: EReaction;
  userId: string;
  postId: string;
  createdAt: Date;
}

export type PostReaction = {
  postId: string;
  user: User;
  type: EReaction;
};

export interface CommentReaction {
  commentId: String;
  user: User;
  type: EReaction;
}
