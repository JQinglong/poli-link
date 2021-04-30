export type ResponseType<V> = Promise<V>
export type ResponseMapType<K extends string, V> = Promise<{ [P in K]: V }>

export type ResponseTypes<T> = Promise<T>

export type CustomErrors = {
  errors: {
    errorName: string[]
  }
}

export interface ListRequestType  {
  limit?: number
  offset?: number
}

export interface Memo {
  id: number
  title: string
  memo: string
}
export interface CouncilType {
  id: string
  name: string
  url: string
  description: string
  ministry_id: string
}

export interface MinistryType {
  id: string
  name: string
  name_e: string
  abbreviation: string
  url: string
}
