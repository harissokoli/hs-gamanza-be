import {
  IsDate,
  IsEmail,
  IsNotEmpty,
  IsString,
  MinLength,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreatePlayerDto {
  @ApiProperty({ description: `Player's first name` })
  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  first_name: string;

  @ApiProperty({ description: `Player's last name` })
  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  last_name: string;

  @ApiProperty({ description: `Player's email` })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({ description: `Player's date of birth` })
  @IsNotEmpty()
  @IsString()
  @IsDate()
  dob: Date;
}
