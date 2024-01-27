import { Controller, Get } from '@nestjs/common';
import { AppService } from 'src/Modules/App/app.service';

@Controller('api/app')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
