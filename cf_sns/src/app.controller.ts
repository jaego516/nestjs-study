import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller() // 여기에 path parameter 정의 'post'
export class AppController {
  constructor(private readonly appService: AppService) {}
}
