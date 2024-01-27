import { Controller, Get } from '@nestjs/common';
import { AppService } from 'src/modules/App/app.service';
import { ApiTags } from '@nestjs/swagger';

@Controller('api/app')
@ApiTags('App')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
