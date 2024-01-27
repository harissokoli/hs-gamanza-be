import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from 'src/modules/App/app.module';
import { GlobalSeederService } from 'src/modules/Seeder/global-seeder.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  });

  const config = new DocumentBuilder()
    .setTitle('HS - Gamanza API')
    .setDescription('Description lorem ipsum')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  const globalSeeder = app.get(GlobalSeederService);
  await globalSeeder.seedAll();

  await app.listen(3000);
}
bootstrap();
