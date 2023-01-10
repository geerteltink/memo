import { IsBoolean, IsDate, IsNotEmpty, IsOptional } from 'class-validator';

export class CreateMemoDto {
  @IsNotEmpty()
  content: string;

  @IsOptional()
  @IsBoolean()
  is_read?: boolean;

  @IsOptional()
  @IsBoolean()
  is_archived?: boolean;

  @IsOptional()
  @IsDate()
  scheduled_for?: Date;

  @IsOptional()
  @IsDate()
  created?: Date;
}
