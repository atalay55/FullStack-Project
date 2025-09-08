import { PostsService, Post } from './posts.service';
export declare class PostsController {
    private readonly postsService;
    constructor(postsService: PostsService);
    findAll(): Post[];
    findOne(id: string): Post | undefined;
    create(body: Omit<Post, 'id'>): Post;
    update(id: string, body: Partial<Omit<Post, 'id'>>): Post | undefined;
    remove(id: string): boolean;
}
