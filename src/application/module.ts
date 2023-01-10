import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { DomainLayer } from 'src/domain';
import { InfrastructureLayer } from 'src/infrastructure';
import { AppendMemoHandler } from './append-memo/append-memo.handler';
import { CreateMemoHandler } from './create-memo/create-memo.handler';
import { GetMemoHandler } from './get-memo/get-memo.handler';
import { GetMemosHandler } from './get-memos/get-memos.handler';

@Module({
  // Imports only from the domain or infrastructure layer
  imports: [CqrsModule, DomainLayer, InfrastructureLayer],
  // Add handlers here
  providers: [CreateMemoHandler, AppendMemoHandler, GetMemosHandler, GetMemoHandler],
})
export class ApplicationLayer {}
