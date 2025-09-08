import { Injectable } from '@nestjs/common';

export interface User {
  id: number;
  name: string;
  username: string;
  email: string;
}

@Injectable()
export class UsersService {
  private users: User[] = [
    { id: 1, name: 'Alice', username: 'alice01', email: 'alice@mail.com' },
    { id: 2, name: 'Bob', username: 'bob02', email: 'bob@mail.com' },
  ];

  findAll(): User[] {
    return this.users;
  }

  findOne(id: number): User | undefined {
    return this.users.find(u => u.id === id);
  }

  create(user: Omit<User, 'id'>): User {
    const newUser = { id: this.users.length+1, ...user };
    this.users.push(newUser);
    return newUser;
  }

  update(id: number, userData: Partial<Omit<User, 'id'>>): User | undefined {
    const user = this.findOne(id);
    if (user) Object.assign(user, userData);
    return user;
  }

  remove(id: number): boolean {
    const index = this.users.findIndex(u => u.id === id);
    if (index !== -1) {
      this.users.splice(index, 1);
      return true;
    }
    return false;
  }
}
