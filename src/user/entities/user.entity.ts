import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { CvEntity } from '../../cv/entities/cv.entity';

@Entity('user')
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @OneToMany(() => CvEntity, (cv) => cv.user)
  cvs: CvEntity[];
}
