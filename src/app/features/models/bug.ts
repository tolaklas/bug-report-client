
export interface Bug {
  id?: string;
  title: string;
  description: string;
  priority: number;
  reporter?: string;
  createdAt?: string;
  updatedAt?: string;
  status?: string;
}
