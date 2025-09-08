import { Controller, Get, Post, Put, Delete, Body, Param } from '@nestjs/common';
import { UsersService, User } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  findAll(): User[] {
    return this.usersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): User | undefined {
    return this.usersService.findOne(+id);
  }

  @Post()
  create(@Body() body: Omit<User, 'id'>): User {
    return this.usersService.create(body);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() body: Partial<Omit<User, 'id'>>): User | undefined {
    return this.usersService.update(+id, body);
  }

  @Delete(':id')
  remove(@Param('id') id: string): boolean {
    return this.usersService.remove(+id);
  }
}
