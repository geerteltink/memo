import { Memo } from './memo.model';

export const MEMO_REPOSITORY = 'memo-repository';

export interface MemoRepository {
  nextId: () => Promise<string>;
  save: (memo: Memo) => Promise<void>;
  update(memo: Memo): Promise<void>;
  findById: (id: string) => Promise<Memo | null>;
}
