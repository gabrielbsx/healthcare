import { ApiContract } from "@/application/contracts/api.contract";
import axios from "axios";

export abstract class AxiosApiImpl<T> implements ApiContract<T> {
  protected readonly baseUrl;
  protected readonly api;

  constructor(protected readonly entityName: string) {
    this.baseUrl = import.meta.env.VITE_API_BASE_URL;

    this.api = axios.create({
      baseURL: this.baseUrl,
    });
  }

  async get(url: string): Promise<T> {
    const response = await this.api.get<T>(url);

    const { data } = response;

    return data;
  }

  async post(url: string, data: T): Promise<T> {
    const response = await this.api.post<T>(url, data);

    const { data: responseData } = response;

    return responseData;
  }

  async put(url: string, data: T): Promise<T> {
    const response = await this.api.put<T>(url, data);

    const { data: responseData } = response;

    return responseData;
  }

  async delete(url: string): Promise<T> {
    const response = await this.api.delete<T>(url);

    const { data } = response;

    return data;
  }
}
