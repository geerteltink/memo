import { IsNotEmpty } from 'class-validator';

export class AppendMemoDto {
  @IsNotEmpty()
  content: string;
}
