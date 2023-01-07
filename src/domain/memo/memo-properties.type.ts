export type MemoEssentialProperties = Readonly<
  Required<{
    id: string;
    content: string;
    created: Date;
  }>
>;

export type MemoOptionalProperties = Readonly<
  Partial<{
    isRead?: boolean;
    isArchived?: boolean;
    scheduledFor?: Date;
    modified?: Date;
  }>
>;

export type MemoProperties = MemoEssentialProperties & Required<MemoOptionalProperties>;
