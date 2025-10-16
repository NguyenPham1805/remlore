import { Comment } from './comment';
import { Reaction } from './reaction';
import { User } from './user';

export interface RemlorePost {
  id: string;
  title: string;
  content: string;
  createdAt: Date;
  updatedAt: Date;
  author: User;
  reactions: Reaction[];
  comments: Comment[];
}

export interface CreatePost {
  title: string;
  content: string;
  attachMedia?: string;
  galleryImages?: string[];
}
