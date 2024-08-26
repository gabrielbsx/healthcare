export interface TokenContract<T> {
  generateToken(data: T): Promise<string>;
  verifyToken(token: string): Promise<T>;
}
