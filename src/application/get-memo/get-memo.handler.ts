import { Inject } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { Serializer } from 'jsonapi-serializer';
import { MemoRepository, MEMO_REPOSITORY } from 'src/domain';
import { GetMemoQuery } from './get-memo.query';

@QueryHandler(GetMemoQuery)
export class GetMemoHandler implements IQueryHandler<GetMemoQuery> {
  constructor(
    @Inject(MEMO_REPOSITORY)
    private memoRepository: MemoRepository
  ) {}

  async execute(query: GetMemoQuery): Promise<string> {
    const memos = await this.memoRepository.findById(query.id);
    const serializer = new Serializer('memo', {
      keyForAttribute: 'snake_case',
      attributes: ['content', 'isRead', 'isArchived', 'created', 'modified', 'scheduledFor'],
    });

    return serializer.serialize(memos);
  }
}
