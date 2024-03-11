export interface Transaction {
  id: string | number;
  operation: string;
  description: string;
  quantity: number;
  createdAt: string | Date;
}

export interface Operation {
  value: string;
  viewValue: string;
}
