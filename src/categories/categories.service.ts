/* eslint-disable prettier/prettier */
import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Category } from './entities/category.entity';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(Category)
    private categoriesRepository: Repository<Category>,
  ) {}
  

  //1- create
  async create(
    createCategoryDto: CreateCategoryDto,
    image?: Express.Multer.File,
  ): Promise<Category> {
    const { name, description } = createCategoryDto;
    const existingCategory = await this.categoriesRepository.findOne({
      where: { name: name },
    });
    if (existingCategory) {
      throw new ConflictException('Category already exists!');
    }

    const category = this.categoriesRepository.create({
      name: name,
      description: description || '',
      image: `/uploads/categories/${image ? image.filename : ''}`,
    });
    return this.categoriesRepository.save(category);
  }

  

  //2- finde all
  findAll(): Promise<Category[]> {
    return this.categoriesRepository.find({
      relations: ['products']
    });
  }

  //3- finde one
  async findOne(id: number): Promise<Category> {
    const category = await this.categoriesRepository.findOne({
      where: { id },
      relations: ['products']
    });
    if (!category) {
      throw new NotFoundException(`Category with id ${id} not found`);
    }
    return category;
  }

  //4- update
  async update(id: number, updateCategoryDto: UpdateCategoryDto): Promise<Category> {
    await this.categoriesRepository.update(id, updateCategoryDto);
    return this.findOne(id);
  }

  //5- remove
  async remove(id: number): Promise<void> {
    const result = await this.categoriesRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Category with id ${id} not found`);
    }
  }
}
