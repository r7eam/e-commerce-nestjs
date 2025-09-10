import { Injectable,NotFoundException,ConflictException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { User, UserRole } from "./entites/user.entity";
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User)
        private readonly usersRepository: Repository<User>,
    ) {}
    //1-create()
    async create(createUserDto: CreateUserDto): Promise<User> {
        const { email, password, name, role } = createUserDto;  
        const existingUser = await this.usersRepository.findOne({ where: { email } });
        if (existingUser) {
            throw new ConflictException('Email already in use');
        }
        //Hash the password before saving
        const hashedPassword = await bcrypt.hash(password, 10);
        //Create a new user object
        const user = this.usersRepository.create({
            email,
            password: hashedPassword,
            name,
            role: UserRole.USER,
        });
        await this.usersRepository.save(user);
        return user;
    }

    //2-findAll()
    async findAll(): Promise<User[]> {
        return this.usersRepository.find();
    }
    //3-findOne()
    async findOne(id: string): Promise<User> {
        const userId = Number(id);
        const user = await this.usersRepository.findOne({ where: { id: userId } });
        if (!user) {
            throw new NotFoundException('User not found');
        }
        return user;
    }
    async update(id: string, updateUserDto: UpdateUserDto): Promise<User> {
        const userId = Number(id);
        const user = await this.usersRepository.findOne({ where: { id: userId } });
        if (!user) {
            throw new NotFoundException('User not found');
        }
        // Update the user with the new data
        Object.assign(user, updateUserDto);
        await this.usersRepository.save(user);
        return user;
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