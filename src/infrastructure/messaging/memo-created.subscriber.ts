import { RabbitSubscribe } from '@golevelup/nestjs-rabbitmq';
import { Injectable } from '@nestjs/common';
import { MemoCreated } from 'src/domain';

@Injectable()
export class MemoCreatedSubscriber {
  @RabbitSubscribe({
    exchange: 'memo-exchange',
    routingKey: 'memo-created',
    queue: 'memo-created-queue',
  })
  public async pubSubHandler(msg: MemoCreated) {
    console.log(`Received MemoCreated message from RabbitMQ: ${JSON.stringify(msg)}`);
  }
}
