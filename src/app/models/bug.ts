export interface Bug {
  title: string;
  priority: number;
  reporter: string;
  dateCreated?: string;
  status?: string;
}