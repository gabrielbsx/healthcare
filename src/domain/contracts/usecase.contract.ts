export interface UseCaseContract<T, U> {
  execute(data: T): Promise<U>;
}
