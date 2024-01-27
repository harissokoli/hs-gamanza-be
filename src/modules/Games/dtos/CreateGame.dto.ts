import { IsNotEmpty, IsString, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateGameDto {
  @ApiProperty({ description: 'Title of the game' })
  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  title: string;
}
