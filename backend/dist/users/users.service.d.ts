export interface User {
    id: number;
    name: string;
    username: string;
    email: string;
}
export declare class UsersService {
    private users;
    findAll(): User[];
    findOne(id: number): User | undefined;
    create(user: Omit<User, 'id'>): User;
    update(id: number, userData: Partial<Omit<User, 'id'>>): User | undefined;
    remove(id: number): boolean;
}
