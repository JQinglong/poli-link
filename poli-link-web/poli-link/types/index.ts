export interface Memo {
  id: number
  title: string
  memo: string
}

export type ResponseType<K extends string, V> = Promise<{ [P in K]: V }>

export type ResponseTypes<T> = Promise<T>
