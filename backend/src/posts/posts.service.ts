import { Injectable } from '@nestjs/common';

export interface Post {
  id: number;
  userId: number;
  title: string;
}

@Injectable()
export class PostsService {
  private posts: Post[] = [
    { id: 1, userId: 1, title: 'Hello World' },
    { id: 2, userId: 2, title: 'NestJS Rocks' },
  ];

  findAll(): Post[] {
    return this.posts;
  }

  findOne(id: number): Post | undefined {
    return this.posts.find(p => p.id === id);
  }

  create(post: Omit<Post, 'id'>): Post {
    const newPost = { id: this.posts.length+1, ...post };
    this.posts.push(newPost);
    return newPost;
  }

  update(id: number, postData: Partial<Omit<Post, 'id'>>): Post | undefined {
    const post = this.findOne(id);
    if (post) Object.assign(post, postData);
    return post;
  }

  remove(id: number): boolean {
    const index = this.posts.findIndex(p => p.id === id);
    if (index !== -1) {
      this.posts.splice(index, 1);
      return true;
    }
    return false;
  }
}
