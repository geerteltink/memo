import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { MemoCreated } from 'src/domain';

@EventsHandler(MemoCreated)
export class MemoCreatedHandler implements IEventHandler<MemoCreated> {
  handle(event: MemoCreated) {
    console.log('Handling internal MemoCreated', event);
  }
}
