import { Entity,Column,PrimaryGeneratedColumn,UpdateDateColumn,CreateDateColumn } from 'typeorm';

export enum UserRole {
    SUPER_ADMIN = 'super_admin',
    ADMIN = 'admin',
    USER = 'customer'
}

@Entity('users')
export class User {
    @PrimaryGeneratedColumn()
    id: number;
    @Column()
    name: string;
    @Column()
    email: string;
    @Column( { type: 'enum', enum: UserRole, default: UserRole.USER } )
    role: UserRole;
    @Column()
    password: string;
    @CreateDateColumn()
    createdAt: Date;
    @UpdateDateColumn()
    updatedAt: Date;
}