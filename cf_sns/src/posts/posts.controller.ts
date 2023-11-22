import { Controller, Get, Param, Post, Body, Put, Delete } from '@nestjs/common';
import { PostsService } from './posts.service';


@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  // 1) GET /posts
  //    모든 post를 다 가져온다.
  // 2) GET /posts/:id
  //    id에 해당되는 post를 가져온다.
  //    예를 들어 id=1일 경우 id가 1인 포스트를 가져온다.
  // 3) POST /posts
  //    POST를 생성한다.
  // 4) PUT /posts/:id
  //    id에 해당되는 POST를 변경한다.
  // 5) DELETE /posts/:id
  //    id에 해당되는 POST를 삭제한다.


  @Get()
  getPosts(){
    return this.postsService.getAllposts();
  }

  @Get(':id')
  getPost(@Param('id') id: string){
    return this.postsService.getPostById(+id);
  }

  @Post()
  postPosts(
    @Body('author') author: string,
    @Body('title') title: string,
    @Body('content') content: string,
    ){
      return this.postsService.createPost(
        author, title, content,
      );
    }

  @Put(':id')
  putPost(
    @Param('id') id: string,
    @Body('author') author?: string,
    @Body('title') title?: string,
    @Body('content') content?: string,
  )
  {
    return this.postsService.updatePost(
      +id, author, title, content,
    );
  }

  @Delete(':id')
  deletePost(
    @Param('id') id: string
  ){
    return this.postsService.deletePost(+id);
  }
}