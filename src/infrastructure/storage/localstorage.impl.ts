import { StorageContract } from "@/application/contracts/storage.contract";

export class LocalStorageImpl<T> implements StorageContract<T> {
  get(key: string): T | null {
    const value = localStorage.getItem(key);

    if (value) {
      return JSON.parse(value);
    }

    return null;
  }

  set(key: string, value: T): void {
    localStorage.setItem(key, JSON.stringify(value));
  }

  remove(key: string): void {
    localStorage.removeItem(key);
  }
}
