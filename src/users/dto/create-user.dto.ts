import { IsString,IsEmail,IsEnum,IsOptional,MinLength } from "class-validator"
import { UserRole } from "../entites/user.entity";

export class CreateUserDto {
    @IsString()
    name: string;

    @IsEmail()
    email: string;

    @IsString()
    @MinLength(6)
    password: string;

    @IsEnum(UserRole)
    @IsOptional()
    role?: UserRole;
}