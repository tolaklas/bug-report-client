
export interface Bug {
  title: string;
  description: string;
  priority: number;
  reporter?: string;
  createdAt?: string;
  updatedAt?: string;
  status?: string;
}
