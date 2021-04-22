import { NuxtAxiosInstance } from '@nuxtjs/axios'
import {
  Memo,
  ResponseType,
  ResponseTypes,
  CustomErrors,
} from '@/types'
import { LIMIT_LIST_ITEM } from '@/constants'

type Memoid = Memo['id']

export interface MemoListRequest  {
  limit?: number
  offset?: number
}
export type CreateMemoRequest = Pick<
  Memo,
  'title' | 'memo'
>
export type UpdateMemoPayload = Partial<CreateMemoRequest>
export type UpdateMemoRequest = {
  payload: UpdateMemoPayload
  id: Memoid
}

// type MemoResponse = ResponseType<'memoData', Memo>
type MemoResponse = ResponseType<Memo>

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
  createMemo(payload: CreateMemoRequest): MemoResponse | CustomErrors {
    console.log('createMemo', payload)
    return axios.$post('/memo/', payload)
  },
  updateMemo(request: UpdateMemoRequest): MemoResponse | CustomErrors {
    return axios.$put(`/memo/${request.id}/`, request.payload )
  },
  deleteMemo(memoid: Memoid) {
    return axios.$delete(`/memo/${memoid}/`)
  },

})

export type MemoRepository = ReturnType<typeof memoRepository>
