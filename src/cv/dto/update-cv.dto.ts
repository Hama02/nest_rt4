import { IsArray, IsInt, IsOptional, IsString } from 'class-validator';

export class UpdateCvDto {
  @IsString()
  @IsOptional()
  name?: string;

  @IsString()
  @IsOptional()
  firstname?: string;

  @IsInt()
  @IsOptional()
  age?: number;

  @IsString()
  @IsOptional()
  cin?: string;

  @IsString()
  @IsOptional()
  job?: string;

  @IsString()
  @IsOptional()
  path?: string;

  @IsArray()
  @IsOptional()
  skills?: number[]; // Liste des IDs des compétences
}
