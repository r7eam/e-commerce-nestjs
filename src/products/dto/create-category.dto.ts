import{isString, IsNotEmpty, IsOptional, IsString} from "class-validator";

export class CreateCategoryDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsOptional()
  description?: string;

  @IsOptional()
  image?: string;
}