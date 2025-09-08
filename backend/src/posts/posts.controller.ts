import { Controller, Get, Post as PostMethod, Put, Delete, Body, Param } from '@nestjs/common';
import { PostsService, Post } from './posts.service';

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Get()
  findAll(): Post[] {
    return this.postsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Post | undefined {
    return this.postsService.findOne(+id);
  }

  @PostMethod()
  create(@Body() body: Omit<Post, 'id'>): Post {
    return this.postsService.create(body);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() body: Partial<Omit<Post, 'id'>>): Post | undefined {
    return this.postsService.update(+id, body);
  }

  @Delete(':id')
  remove(@Param('id') id: string): boolean {
    return this.postsService.remove(+id);
  }
}
