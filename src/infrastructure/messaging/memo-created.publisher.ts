import { AmqpConnection } from '@golevelup/nestjs-rabbitmq';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { MemoCreated } from 'src/domain';

@EventsHandler(MemoCreated)
export class MemoCreatedPublisher implements IEventHandler<MemoCreated> {
  constructor(private readonly connection: AmqpConnection) {}

  handle(event: MemoCreated) {
    console.log('Publishing MemoCreated event to RabbitMQ', event);

    this.connection.publish('memo-exchange', 'memo-created', event);
  }
}
