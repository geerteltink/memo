import { Body, Controller, Get, NotFoundException, Param, Post } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { AppendMemoCommand, CreateMemoCommand, GetMemoQuery, GetMemosQuery } from 'src/application';
import { MemoNotFound } from 'src/domain';
import { AppendMemoDto } from './append.memo.dto';
import { CreateMemoDto } from './create-memo.dto';

@Controller('memo')
export class MemoController {
  constructor(private readonly commandBus: CommandBus, private readonly queryBus: QueryBus) {}

  @Get()
  async getMemos(): Promise<string> {
    return await this.queryBus.execute(new GetMemosQuery());
  }

  @Get(':id')
  async getMemo(@Param('id') id: string): Promise<string> {
    try {
      return await this.queryBus.execute(new GetMemoQuery(id));
    } catch (err) {
      if (err instanceof MemoNotFound) {
        throw new NotFoundException(err.message);
      }
    }
  }

  @Post()
  async createMemo(@Body() dto: CreateMemoDto): Promise<string> {
    return await this.commandBus.execute(
      new CreateMemoCommand(dto.content, dto.is_read, dto.is_archived, dto.scheduled_for, dto.created)
    );
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
