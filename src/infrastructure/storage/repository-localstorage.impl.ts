import { ApiContract } from "@/application/contracts/api.contract";

export class RepositoryLocalStorageImpl<T> implements ApiContract<T> {
  async get(url: string): Promise<T | null> {
    const id = url.split('/').pop();

    const baseUrl = url.split('/').slice(0, -1).join('/');

    const appendData = localStorage.getItem(baseUrl);

    if (appendData) {
      const parsedData = JSON.parse(appendData) as T[];

      return parsedData.find((item) => {
        const idItem = (item as unknown as { id: string }).id;

        return idItem === id;
      }) || null;
    }

    return null;
  }

  async post(url: string, data: Omit<T, 'id'>): Promise<T> {
    const dataWithId = { ...data, id: Math.random().toString(36).substr(2, 9) };
    const appendData = localStorage.getItem(url);

    if (appendData) {
      const parsedData = JSON.parse(appendData) as T[];
      localStorage.setItem(url, JSON.stringify([...parsedData, dataWithId]));
    }
    
    localStorage.setItem(url, JSON.stringify([dataWithId]));

    return data as T;
  }

  async put(url: string, data: Partial<T>): Promise<T> {
    const appendData = localStorage.getItem(url);

    const id = (data as unknown as { id: string }).id;

    if (appendData) {
      const parsedData = JSON.parse(appendData) as T[];
      const updatedData = parsedData.map((item) => {
        const idItem = (item as unknown as { id: string }).id;

        if (idItem === id) {
          return { ...item, ...data };
        }

        return item;
      });

      localStorage.setItem(url, JSON.stringify(updatedData));
    }

    return data as T;
  }

  async delete(url: string): Promise<T | null> {
    const id = url.split('/').pop();

    const baseUrl = url.split('/').slice(0, -1).join('/');

    const appendData = localStorage.getItem(baseUrl);

    if (appendData) {
      const parsedData = JSON.parse(appendData) as T[];
      const updatedData = parsedData.filter((item) => {
        const idItem = (item as unknown as { id: string }).id;

        return idItem !== id;
      });

      localStorage.setItem(url, JSON.stringify(updatedData));

      return parsedData.find((item) => {
        const idItem = (item as unknown as { id: string }).id;

        return idItem === id;
      }) || null;
    }
    
    return null;
  }
}
