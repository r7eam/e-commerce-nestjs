import { Injectable,NotFoundException,ConflictException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { User, UserRole } from "./entites/user.entity";
import * as bcrypt from 'bcrypt';

// Type for user response without password
type SafeUser = Omit<User, 'password'>;

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User)
        private readonly usersRepository: Repository<User>,
    ) {}
    //1-create()
    async create(createUserDto: CreateUserDto): Promise<SafeUser> {
        const { email, password: userPassword, name, role } = createUserDto;  
        const existingUser = await this.usersRepository.findOne({ where: { email } });
        if (existingUser) {
            throw new ConflictException('Email already in use');
        }
        //Hash the password before saving
        const hashedPassword = await bcrypt.hash(userPassword, 10);
        //Create a new user object
        const user = this.usersRepository.create({
            email,
            password: hashedPassword,
            name,
            role: UserRole.USER,
        });
        await this.usersRepository.save(user);
        const { password, ...result } = user;
        return result;
    }

    //2-findAll()
    async findAll(): Promise<SafeUser[]> {
        const users = await this.usersRepository.find();
        return users.map(({ password, ...rest }) => rest);
    }
    //3-findOne()
    async findOne(id: string): Promise<SafeUser> {
        const userId = Number(id);
        const user = await this.usersRepository.findOne({ where: { id: userId } });
        if (!user) {
            throw new NotFoundException('User not found');
        }
        const { password, ...result } = user;
        return result;
    }
    async update(id: string, updateUserDto: UpdateUserDto): Promise<SafeUser> {
        const userId = Number(id);
        const user = await this.usersRepository.findOne({ where: { id: userId } });
        if (!user) {
            throw new NotFoundException('User not found');
        }
        // Update the user with the new data
        Object.assign(user, updateUserDto);
        await this.usersRepository.save(user);
        const { password, ...result } = user;
        return result;
    }

    //5-remove()
    async remove(id: string): Promise<void> {
        const userId = Number(id);
        const user = await this.usersRepository.findOne({ where: { id: userId } });
        if (!user) {
            throw new NotFoundException('User not found');
        }
        await this.usersRepository.remove(user);
    }
}