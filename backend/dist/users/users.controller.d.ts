import { UsersService, User } from './users.service';
export declare class UsersController {
    private readonly usersService;
    constructor(usersService: UsersService);
    findAll(): User[];
    findOne(id: string): User | undefined;
    create(body: Omit<User, 'id'>): User;
    update(id: string, body: Partial<Omit<User, 'id'>>): User | undefined;
    remove(id: string): boolean;
}
