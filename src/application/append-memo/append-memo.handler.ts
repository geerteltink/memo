import { Inject } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { MemoRepository, MEMO_REPOSITORY } from 'src/domain';
import { AppendMemoCommand } from './append-memo.command';

@CommandHandler(AppendMemoCommand)
export class AppendMemoHandler implements ICommandHandler<AppendMemoCommand> {
  constructor(
    @Inject(MEMO_REPOSITORY)
    private memoRepository: MemoRepository
  ) {}

  async execute(command: AppendMemoCommand): Promise<void> {
    const memo = await this.memoRepository.findById(command.id);
    memo.append(command.content, new Date());
    await this.memoRepository.update(memo);
  }
}
