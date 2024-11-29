import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateSkillDto } from './dto/create-skill.dto';
import { SkillEntity } from './entities/skill.entity';

@Injectable()
export class SkillService {
  constructor(
    @InjectRepository(SkillEntity)
    private skillRepository: Repository<SkillEntity>,
  ) {}

  async create(createSkillDto: CreateSkillDto): Promise<SkillEntity> {
    const skill = this.skillRepository.create(createSkillDto);
    return this.skillRepository.save(skill);
  }
}
