import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  Query,
} from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Controller('products')
export class ProductController {
    constructor(
        private readonly productsService: ProductService
        ) {}

    @Post() 
    async create(@Body() createProductDto: CreateProductDto) {
        return this.productsService.create(createProductDto);
    }   
    @Get()
    async findAll(
        @Query('offset') offset: number = 1,
        @Query('limit') limit: number = 10,
    ) {
        return this.productsService.findAll();
    }
    @Get(':id')
    async findOne(@Param('id') id: string) {
        return this.productsService.findOne(id);
    }

    @Put(':id')
    async update(
        @Param('id') id: string,
        @Body() updateProductDto: UpdateProductDto,
    ) {
        return this.productsService.update(id, updateProductDto);
    }

    @Delete(':id')
    async remove(@Param('id') id: string) {
        return this.productsService.remove(id);
    }
}