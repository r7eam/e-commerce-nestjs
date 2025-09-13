import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from './entites/product.entity';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private productsRepository: Repository<Product>,
  ) {}
    //1- create
    //1-create()
    async create(createProductDto: CreateProductDto): Promise<Product> {
        const product = this.productsRepository.create(createProductDto);
        const savedProduct = await this.productsRepository.save(product);
        
        // Return the product with category relationship loaded
        const productWithCategory = await this.productsRepository.findOne({
            where: { id: savedProduct.id },
            relations: ['category']
        });
        
        if (!productWithCategory) {
            throw new NotFoundException('Product not found after creation');
        }
        
        return productWithCategory;
    }
    //2- finde all
    findAll(): Promise<Product[]> {
        return this.productsRepository.find({
            relations: ['category']
        });
    }
    //3- finde one
    async findOne(id: string): Promise<Product> {
        const product = await this.productsRepository.findOne({
            where: { id },
            relations: ['category']
        });
        if (!product) {
            throw new NotFoundException(`Product with id ${id} not found`);
        }
        return product;
    }
    //4- update
    async update(id: string, updateProductDto: UpdateProductDto): Promise<Product> {
        await this.productsRepository.update(id, updateProductDto);
        return this.findOne(id);
    }
    //5- remove
    async remove(id: string): Promise<void> {
        const result = await this.productsRepository.delete(id);
        if (result.affected === 0) {
            throw new NotFoundException(`Product with id ${id} not found`);
        }
    }
}

