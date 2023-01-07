import { AggregateRoot } from '@nestjs/cqrs';
import { MemoProperties } from './memo-properties.type';

export class Memo extends AggregateRoot {
  private readonly id: string;
  private content: string;
  private isRead: boolean;
  private isArchived: boolean;
  private readonly created: Date;
  private modified?: Date;
  private scheduledFor?: Date;

  constructor(properties: MemoProperties) {
    super();
    Object.assign(this, properties);
  }

  public append(content: string, modified: Date): void {
    this.content = this.content + content;
    this.modified = modified;
  }

  public extract(): MemoProperties {
    return {
      id: this.id,
      content: this.content,
      isRead: this.isRead,
      isArchived: this.isArchived,
      created: this.created,
      modified: this.modified,
      scheduledFor: this.scheduledFor,
    };
  }
}
