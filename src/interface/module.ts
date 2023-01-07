import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { MemoController } from './memo/memo.controller';

@Module({
  imports: [CqrsModule],
  controllers: [MemoController],
})
export class InterfaceModule {}
