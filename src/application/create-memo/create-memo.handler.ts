import { Inject } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { MEMO_REPOSITORY, MemoRepository, Memo } from 'src/domain';
import { CreateMemoCommand } from './create-memo.comand';
import { Serializer } from 'jsonapi-serializer';

@CommandHandler(CreateMemoCommand)
export class CreateMemoHandler implements ICommandHandler<CreateMemoCommand> {
  constructor(
    @Inject(MEMO_REPOSITORY)
    private memoRepository: MemoRepository
  ) {}

  async execute(command: CreateMemoCommand): Promise<string> {
    const memo = new Memo({
      id: await this.memoRepository.nextId(),
      content: command.content,
      isRead: command.isRead ?? false,
      isArchived: command.isArchived ?? false,
      created: command.created ?? new Date(),
      modified: null,
      scheduledFor: null,
    });

    await this.memoRepository.save(memo);

    const serializer = new Serializer('memo', {});

    return serializer.serialize(memo);
  }
}
