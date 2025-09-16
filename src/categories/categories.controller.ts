/* eslint-disable prettier/prettier */
import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  Query,
  UseInterceptors,
  UploadedFile,
  ParseFilePipe,
  MaxFileSizeValidator,
} from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { of } from 'rxjs';
import { diskStorage, StorageEngine } from 'multer';
import { extname } from 'path';
import { FileInterceptor } from '@nestjs/platform-express';


@Controller('categories')
export class categoryController {
  constructor(private readonly categoryService: CategoriesService) {}

  @Post()
  @UseInterceptors(FileInterceptor('image', {
    storage: diskStorage({
      destination: './uploads/categories',
      filename: (req, file, cb) => {

        const uniqueName = Date.now() + '-' + Math.round(Math.random() * 1e9);
        const ext = extname(file.originalname);
      cb(null, `${uniqueName}${ext}`);
    }
    }),

  }))
async create(@Body() createCategoryDto: CreateCategoryDto, @UploadedFile(
        new ParseFilePipe({
            validators: [
                new MaxFileSizeValidator({maxSize: 5 * 1024 * 1024}), 
            ],
            fileIsRequired: false,
        }),
    )
    image?: Express.Multer.File,
     ){
        return this.categoryService.create(createCategoryDto,image);
    };


  @Get()
  async findAll(
    @Query('offset') offset: number = 1,
    @Query('limit') limit: number = 10,
  ) {
    return this.categoryService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.categoryService.findOne(+id);
  }
}
