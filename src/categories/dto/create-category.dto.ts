/* eslint-disable prettier/prettier */
import {
  IsString,
  IsOptional,
} from 'class-validator';

export class CreateCategoryDto {
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsString()
  image?: string;
}