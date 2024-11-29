import { Module } from '@nestjs/common';
import { CvService } from './cv.service';
import { CvController } from './cv.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from '../user/entities/user.entity';
import { SkillEntity } from '../skill/entities/skill.entity';
import { CvEntity } from './entities/cv.entity';

@Module({
  imports: [TypeOrmModule.forFeature([CvEntity, UserEntity, SkillEntity])],
  controllers: [CvController],
  providers: [CvService],
})
export class CvModule {}
