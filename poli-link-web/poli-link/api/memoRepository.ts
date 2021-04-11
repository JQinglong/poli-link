import { NuxtAxiosInstance } from '@nuxtjs/axios'
import {
  Memo,
  ResponseType,
  ResponseTypes,
} from '@/types'
import { LIMIT_LIST_ITEM } from '@/constants'

type Memoid = Memo['id']

export interface MemoListRequest  {
  limit?: number
  offset?: number
}

type MemoResponse = ResponseType<'memo', Memo>
// type MemoListResponse = ResponseTypes<{
//   memos: Memo[]
//   memosCount: number
// }>
type MemoListResponse = ResponseTypes<Memo[]>

export const memoRepository = (axios: NuxtAxiosInstance) => ({
  getMemo(memoid: Memoid): MemoResponse {
    return axios.$get(`/memo/${memoid}`)
  },

  getMemoList({
    limit = LIMIT_LIST_ITEM,
    offset = 0,
  }: MemoListRequest = {}): MemoListResponse {
    const defaultParam = {
    }

    console.log('getMemoList', axios.$get('/memo', {      params: {...defaultParam, limit, offset},    }))

    return axios.$get('/memo/', {
      params: {...defaultParam, limit, offset},
    })
  },

})

export type MemoRepository = ReturnType<typeof memoRepository>
