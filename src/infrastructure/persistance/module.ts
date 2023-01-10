import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MEMO_REPOSITORY } from 'src/domain';
import { MemoTypeOrmRepository } from './memo-typeorm.repository';
import { MemoEntity } from './memo.entity';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: async (config: ConfigService) => ({
        type: 'postgres',
        host: config.get<string>('POSTGRES_HOST'),
        //port: +configService.get('PORT'),
        database: config.get<string>('POSTGRES_DB'),
        username: config.get<string>('POSTGRES_USER'),
        password: config.get<string>('POSTGRES_PASSWORD'),
        entities: [MemoEntity],
        autoLoadEntities: true,
        synchronize: true,
        migrationsRun: true,
        migrations: [],
      }),
      inject: [ConfigService],
    }),
    TypeOrmModule.forFeature([MemoEntity]),
  ],
  providers: [{ provide: MEMO_REPOSITORY, useClass: MemoTypeOrmRepository }],
  exports: [MEMO_REPOSITORY],
})
export class PersistenceModule {}
