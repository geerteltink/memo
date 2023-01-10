import { RabbitMQModule } from '@golevelup/nestjs-rabbitmq';
import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { CqrsModule } from '@nestjs/cqrs';
import { MemoCreatedHandler } from './memo-created.handler';
import { MemoCreatedPublisher } from './memo-created.publisher';
import { MemoCreatedSubscriber } from './memo-created.subscriber';

@Module({
  imports: [
    CqrsModule,
    RabbitMQModule.forRootAsync(RabbitMQModule, {
      useFactory: async (config: ConfigService) => ({
        exchanges: [
          {
            name: config.get<string>('RABBITMQ_EXCHANGE'),
            type: 'topic',
          },
        ],
        uri: config.get<string>('RABBITMQ_URL'),
        connectionInitOptions: { wait: false },
      }),
      inject: [ConfigService],
    }),
  ],
  providers: [MemoCreatedHandler, MemoCreatedPublisher, MemoCreatedSubscriber],
})
export class MessagingModule {}
