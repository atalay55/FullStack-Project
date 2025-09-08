export interface Post {
    id: number;
    userId: number;
    title: string;
}
export declare class PostsService {
    private posts;
    findAll(): Post[];
    findOne(id: number): Post | undefined;
    create(post: Omit<Post, 'id'>): Post;
    update(id: number, postData: Partial<Omit<Post, 'id'>>): Post | undefined;
    remove(id: number): boolean;
}
