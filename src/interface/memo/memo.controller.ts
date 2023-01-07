import { Body, Controller, NotFoundException, Param, Post } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { AppendMemoCommand } from 'src/application/append-memo/append-memo.comand';
import { CreateMemoCommand } from 'src/application/create-memo/create-memo.comand';
import { MemoNotFound } from 'src/domain/memo/memo-not-found.error';
import { AppendMemoDto } from './append.memo.dto';
import { CreateMemoDto } from './create-memo.dto';

@Controller('memo')
export class MemoController {
  constructor(private readonly commandBus: CommandBus) {}

  @Post()
  async createMemo(@Body() dto: CreateMemoDto): Promise<string> {
    return this.commandBus.execute(new CreateMemoCommand(dto.content, dto.isRead, dto.isArchived, dto.scheduledFor, dto.created));
  }

  @Post(':id/append')
  async appendToMemo(@Param('id') id: string, @Body() dto: AppendMemoDto): Promise<string> {
    try {
      return await this.commandBus.execute(new AppendMemoCommand(id, dto.content));
    } catch (err) {
      if (err instanceof MemoNotFound) {
        throw new NotFoundException(err.message);
      }
    }
  }
}
