import { RabbitMQModule } from '@golevelup/nestjs-rabbitmq';
import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { MemoCreatedHandler } from './memo-created.handler';
import { MemoCreatedPublisher } from './memo-created.publisher';
import { MemoCreatedSubscriber } from './memo-created.subscriber';

@Module({
  imports: [
    CqrsModule,
    RabbitMQModule.forRoot(RabbitMQModule, {
      exchanges: [
        {
          name: 'memo-exchange',
          type: 'topic',
        },
      ],
      uri: 'amqp://memo:secret@rabbitmq:5672/default',
      connectionInitOptions: { wait: false },
      name: 'default',
    }),
  ],
  providers: [MemoCreatedHandler, MemoCreatedPublisher, MemoCreatedSubscriber],
})
export class MessagingModule {}
