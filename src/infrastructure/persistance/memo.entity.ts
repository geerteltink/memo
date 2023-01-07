import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('memo')
export class MemoEntity {
  @PrimaryGeneratedColumn('uuid')
  public id: string;

  @Column()
  content: string;

  @Column()
  isRead: boolean;

  @Column()
  isArchived: boolean;

  @Column()
  created: Date;

  @Column({ nullable: true })
  modified: Date;

  @Column({ nullable: true })
  scheduledFor: Date;
}
