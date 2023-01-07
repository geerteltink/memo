import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { HttpClientModule } from './http/http-client.module';
import { PersistenceModule } from './persistance/module';

@Module({
  // Imports only from 3rd party dependencies
  imports: [CqrsModule, HttpClientModule, PersistenceModule],
  exports: [PersistenceModule],
})
export class InfrastructureLayer {}
