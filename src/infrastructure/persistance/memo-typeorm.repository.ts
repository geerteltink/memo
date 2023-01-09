import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { v4 as uuidV4 } from 'uuid';
import { Memo, MemoNotFound, MemoRepository } from 'src/domain';
import { MemoEntity } from './memo.entity';

export class MemoTypeOrmRepository implements MemoRepository {
  constructor(
    @InjectRepository(MemoEntity)
    private readonly repository: Repository<MemoEntity>
  ) {}

  public async nextId(): Promise<string> {
    return uuidV4();
  }

  public async save(memo: Memo): Promise<void> {
    const dto = this.modelToEntity(memo);
    const entity = this.repository.create(dto);

    await this.repository.insert(entity);
  }

  public async update(memo: Memo): Promise<void> {
    const dto = this.modelToEntity(memo);

    await this.repository.update({ id: dto.id }, dto);
  }

  public async findById(id: string): Promise<Memo> {
    const entity = await this.repository.findOneBy({ id });

    if (entity === null) {
      throw new MemoNotFound(`A memo with id ${id} was not found.`);
    }

    return this.entityToModel(entity);
  }

  public async find(): Promise<Memo[]> {
    const entities = await this.repository.find();

    return entities.map(entity => this.entityToModel(entity));
  }

  private modelToEntity(model: Memo): MemoEntity {
    return {
      ...model.extract(),
    };
  }

  private entityToModel(entity: MemoEntity): Memo {
    return new Memo({ ...entity });
  }
}
