import { IsNotEmpty, IsBoolean, IsOptional, IsString } from 'class-validator';

export class CreateProductImageDto {
  @IsNotEmpty()
  @IsString()
  image_url: string;

  @IsOptional()
  @IsBoolean()
  is_primary?: boolean;

  @IsOptional()
  @IsString()
  alt_text?: string;

  @IsNotEmpty()
  productId: number;
}