import { Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { InjectRepository } from '@nestjs/typeorm';
import { UserModel } from './entity/user.entity';
import { Repository } from 'typeorm';
import { ProfileModel } from './entity/profile.entity';
import { PostModel } from './entity/post.entity';
import { TagModel } from './entity/tag.entity';

@Controller()
export class AppController {
  constructor(
    @InjectRepository(UserModel)
    private readonly userRepository: Repository<UserModel>,
    @InjectRepository(ProfileModel)
    private readonly profileRepository: Repository<ProfileModel>,
    @InjectRepository(PostModel)
    private readonly PostRepository: Repository<PostModel>,
    @InjectRepository(TagModel)
    private readonly TagRepository: Repository<TagModel>
  ) {}

  @Post('users')
  postUser(){
    return this.userRepository.save({
      // title: 'test title'
    });
  }

  @Get('users')
  gerUsers(){
    return this.userRepository.find({
      relations:{
        profile: true,
        posts: true
      },
    });
  }

  @Patch('users/:id')
  async patchUser(
    @Param('id') id: string,
  ){
    const user = await this.userRepository.findOne({
      where:{
        id: parseInt(id),
      }
    });

    return this.userRepository.save({
      ...user,
      // title: user.title + '0',
  })
  }

  @Post('user/profile')
  async createUserAndProfile(){
    const user = await this.userRepository.save({
      email: 'asdf@asdf.com',

    });

    const profile = await this.profileRepository.save({
      profileImg: 'asdf.jpg',
      user,
    });

    return user;
  }

  @Post('user/post')
  async createUserAndPosts(){
    const user = await this.userRepository.save({
      email: 'qwer1234@qwer.com',
    });

    await this.PostRepository.save({
      author: user,
      title: 'post 1',
    });

    await this.PostRepository.save({
      author: user,
      title: 'post 2',
    });
    return user;
  }

  @Post('posts/tags')
  async createPostsTags(){
    const post1 = await this.PostRepository.save({
      title: 'tag test 1',
    });
    const post2 = await this.PostRepository.save({
      title: 'tag test 2',
    });

    const tag1 = await this.TagRepository.save({
      name: 'js',
      posts:[post1, post2],
    });
    const tag2 = await this.TagRepository.save({
      name: 'python',
      posts: [post1],
    });
    const post3 = await this.PostRepository.save({
      title: 'nextjs',
      tags: [tag1, tag2],
    });

    return true;
  }
  @Get('posts')
  getPosts(){
    return this.PostRepository.find({
      relations:{
        tags: true,
      }
    });
  }

  @Get('tags')
  getTags(){
    return this.TagRepository.find({
      relations:{
        posts:true,
      }
    });
  }
}