import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProductImage } from './entities/product-image.entity';
import { CreateProductImageDto } from './dto/create-product-image.dto';
import { UpdateProductImageDto } from './dto/update-product-image.dto';

@Injectable()
export class ProductImagesService {
  constructor(
    @InjectRepository(ProductImage)
    private readonly repo: Repository<ProductImage>,
  ) {}

  create(dto: CreateProductImageDto) {
    const image = this.repo.create({
      ...dto,
      product: { id: dto.productId } as any, // ربط بالمنتج
    });
    return this.repo.save(image);
  }

  findAll() {
    return this.repo.find({ relations: ['product'] });
  }

  findOne(id: number) {
    return this.repo.findOne({ where: { id }, relations: ['product'] });
  }

  async update(id: number, dto: UpdateProductImageDto) {
    await this.repo.update(id, dto);
    return this.findOne(id);
  }

  remove(id: number) {
    return this.repo.delete(id);
  }
}
