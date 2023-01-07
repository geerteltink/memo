import { Module } from '@nestjs/common';
import { ApplicationLayer } from './application';
import { InfrastructureLayer } from './infrastructure';
import { InterfaceModule } from './interface';

@Module({
  imports: [ApplicationLayer, InfrastructureLayer, InterfaceModule],
})
export class AppModule {}
