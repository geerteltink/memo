export class CreateMemoCommand {
  constructor(
    public readonly content: string,
    public readonly isRead: boolean,
    public readonly isArchived: boolean,
    public readonly scheduledFor: Date,
    public readonly created: Date,
  ) {}
}
