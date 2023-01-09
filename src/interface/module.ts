import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { TerminusModule } from '@nestjs/terminus';
import { HttpClientModule } from 'src/infrastructure/http/http-client.module';
import { HealthController } from './health/health.controller';
import { MemoController } from './memo/memo.controller';
import { RootController } from './root.controller';

@Module({
  imports: [CqrsModule, TerminusModule, HttpClientModule],
  controllers: [RootController, HealthController, MemoController],
})
export class InterfaceModule {}
