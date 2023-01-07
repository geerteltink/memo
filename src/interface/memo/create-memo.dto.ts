export interface CreateMemoDto {
  content: string;
  isRead?: boolean;
  isArchived?: boolean;
  scheduledFor?: Date;
  created?: Date;
}
