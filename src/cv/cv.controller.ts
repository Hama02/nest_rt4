import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { CvService } from './cv.service';
import { CreateCvDto } from './dto/create-cv.dto';
import { UpdateCvDto } from './dto/update-cv.dto';

@Controller('cv')
export class CvController {
  constructor(private readonly cvService: CvService) {}

  @Post()
  async create(@Body() createCvDto: CreateCvDto) {
    console.log('hello');
    return this.cvService.create(createCvDto);
  }

  @Get()
  async findAll() {
    return this.cvService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: number) {
    return this.cvService.findOne(id);
  }

  @Patch(':id')
  async update(@Param('id') id: number, @Body() updateCvDto: UpdateCvDto) {
    return this.cvService.update(id, updateCvDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: number) {
    return this.cvService.remove(id);
  }
}
