import { Post } from './post.interface';
import { User } from './user.interface';

export interface CombinedData {
  user: User;
  posts: Post[];
}
