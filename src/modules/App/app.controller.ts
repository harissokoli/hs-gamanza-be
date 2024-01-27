import { Controller, Get } from '@nestjs/common';
import { AppService } from '@modules/App/app.service';
import { ApiTags } from '@nestjs/swagger';

@Controller('api/app')
@ApiTags('App')
export class AppController {
  constructor(private readonly appService: AppService) {}
}
