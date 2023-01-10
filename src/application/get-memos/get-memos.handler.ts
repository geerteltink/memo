import { Inject } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { Serializer } from 'jsonapi-serializer';
import { MemoRepository, MEMO_REPOSITORY } from 'src/domain';
import { GetMemosQuery } from './get-memos.query';

@QueryHandler(GetMemosQuery)
export class GetMemosHandler implements IQueryHandler<GetMemosQuery> {
  constructor(
    @Inject(MEMO_REPOSITORY)
    private memoRepository: MemoRepository
  ) {}

  async execute(): Promise<string> {
    const memos = await this.memoRepository.find();
    const serializer = new Serializer('memo', {
      keyForAttribute: 'snake_case',
      attributes: ['isRead', 'isArchived', 'created', 'modified', 'scheduledFor'],
    });

    return serializer.serialize(memos);
  }
}
