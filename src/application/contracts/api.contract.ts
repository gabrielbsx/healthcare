export interface ApiContract<T> {
  get(url: string): Promise<T>;
  post(url: string, data: T): Promise<T>;
  put(url: string, data: T): Promise<T>;
  delete(url: string): Promise<T>;
}
