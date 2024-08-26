import { TokenContract } from "@/application/contracts/token.contract";
import jwt from "jsonwebtoken";

export class JWTImpl<T extends string | object | Buffer> implements TokenContract<T> {
  async generateToken(data: T): Promise<string> {
    return jwt.sign(data, "secret");
  }

  async verifyToken(token: string): Promise<T> {
    return jwt.verify(token, "secret") as T;
  }
}
