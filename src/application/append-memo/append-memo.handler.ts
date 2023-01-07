import { Inject } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { MEMO_REPOSITORY, MemoRepository } from 'src/domain';
import { AppendMemoCommand } from './append-memo.comand';

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
