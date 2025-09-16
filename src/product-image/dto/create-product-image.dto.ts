import { Type } from 'class-transformer';
import { IsNotEmpty, IsBoolean, IsOptional, IsString } from 'class-validator';

export class CreateProductImageDto {
  @IsOptional()
  @IsString()
  image_url?: string;

  @IsOptional()
  @Type(() => Boolean)
  @IsBoolean()
  is_primary?: boolean;

  @IsOptional()
  @IsString()
  alt_text?: string;

  @IsNotEmpty()
  @IsString()
  productId: string;
}