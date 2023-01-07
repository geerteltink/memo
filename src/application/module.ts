import { Module } from '@nestjs/common';
import { DomainLayer } from 'src/domain';
import { InfrastructureLayer } from 'src/infrastructure';
import { AppendMemoHandler } from './append-memo/append-memo.handler';
import { CreateMemoHandler } from './create-memo/create-memo.handler';

@Module({
  // Imports only from the domain or infrastructure layer
  imports: [DomainLayer, InfrastructureLayer],
  // Add handlers here
  providers: [CreateMemoHandler, AppendMemoHandler],
})
export class ApplicationLayer {}
