export interface IPet {
  id?: number;
  name: string;
  category: {
    id: number;
    name: string;
  };
  status: string;
}
