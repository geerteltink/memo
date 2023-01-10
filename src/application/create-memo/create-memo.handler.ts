import { Inject } from '@nestjs/common';
import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { Serializer } from 'jsonapi-serializer';
import { Memo, MemoRepository, MEMO_REPOSITORY } from 'src/domain';
import { CreateMemoCommand } from './create-memo.command';

@CommandHandler(CreateMemoCommand)
export class CreateMemoHandler implements ICommandHandler<CreateMemoCommand> {
  constructor(
    @Inject(MEMO_REPOSITORY)
    private memoRepository: MemoRepository,
    private publisher: EventPublisher
  ) {}

  async execute(command: CreateMemoCommand): Promise<string> {
    const memo = Memo.create({
      id: await this.memoRepository.nextId(),
      content: command.content,
      isRead: command.isRead ?? false,
      isArchived: command.isArchived ?? false,
      created: command.created ?? new Date(),
      modified: null,
      scheduledFor: null,
    });

    await this.memoRepository.save(memo);

    this.publisher.mergeObjectContext(memo).commit();

    const serializer = new Serializer('memo', {
      keyForAttribute: 'snake_case',
    });

    return serializer.serialize(memo);
  }
}
