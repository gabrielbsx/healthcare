export interface ApiContract<T> {
  get(url: string): Promise<T | null>;
  post(url: string, data: Omit<T, 'id'>): Promise<T>;
  put(url: string, data: Partial<T>): Promise<T>;
  delete(url: string): Promise<T | null>;
}
