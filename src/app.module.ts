import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ApplicationLayer } from './application';
import { validateConfig } from './env.validation';
import { InfrastructureLayer } from './infrastructure';
import { InterfaceModule } from './interface';

@Module({
  imports: [
    ConfigModule.forRoot({
      cache: true,
      isGlobal: true,
      validate: validateConfig,
    }),
    ApplicationLayer,
    InfrastructureLayer,
    InterfaceModule,
  ],
})
export class AppModule {}
