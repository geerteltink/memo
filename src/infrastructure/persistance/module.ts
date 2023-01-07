import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MEMO_REPOSITORY } from 'src/domain';
import { MemoTypeOrmRepository } from './memo-typeorm.repository';
import { MemoEntity } from './memo.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'postgres',
      database: 'memo',
      username: 'memo',
      password: 'secret',
      entities: [MemoEntity],
      autoLoadEntities: true,
      synchronize: true,
      migrationsRun: true,
      migrations: [],
    }),
    TypeOrmModule.forFeature([MemoEntity]),
  ],
  providers: [{ provide: MEMO_REPOSITORY, useClass: MemoTypeOrmRepository }],
  exports: [MEMO_REPOSITORY],
})
export class PersistenceModule {}
