import { TokenContract } from "@/application/contracts/token.contract";
import { Buffer } from "buffer";

export class SimpleTokenImpl<T extends string | object | Buffer>
  implements TokenContract<T>
{
  async generateToken(data: T): Promise<string> {
    const simpleToken = Buffer.from(JSON.stringify(data)).toString("base64");
    return simpleToken;
  }

  async verifyToken(token: string): Promise<T> {
    const data = Buffer.from(token, "base64").toString();
    return JSON.parse(data) as T;
  }
}
