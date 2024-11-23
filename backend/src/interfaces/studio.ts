export interface Studio {
  id: number;
  name: string;
  children?: Studio[]; // Recursive type for potential nested studios
}
