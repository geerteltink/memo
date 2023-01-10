import { IEvent } from '@nestjs/cqrs';

export class MemoCreated implements IEvent {
  constructor(public readonly id: string) {}
}
