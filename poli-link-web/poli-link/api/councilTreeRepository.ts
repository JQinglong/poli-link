import { NuxtAxiosInstance } from '@nuxtjs/axios'
import {
  CouncilTreeType,
  ResponseType,
  ResponseTypes,
  CustomErrors,
} from '@/types'
import { LIMIT_LIST_ITEM } from '@/constants'

type CouncilTreeId = CouncilTreeType['id']

export interface CouncilTreeListRequest  {
  limit?: number
  offset?: number
  council?: string
  parent?: string
}

// Pick 第1引数から第2引数以降で指定したkey値とその値で構成されたObjectを返す。
// 逆にId以外だよね
export type CreateCouncilTreeRequest = Pick<
CouncilTreeType,
  'council' | 'parent' | 'level' | 'order'
>
export type UpdateCouncilTreePayload = Partial<CreateCouncilTreeRequest>
export type UpdateCouncilTreeRequest = {
  payload: UpdateCouncilTreePayload
  id: CouncilTreeId
}

// 以下ほとんど文字置換だけなので、本当はもう少しうまくできるはず
type CouncilTreeResponse = ResponseType<CouncilTreeType>
type CouncilTreeListResponse = ResponseTypes<CouncilTreeType[]>

export const councilTreeRepository = (axios: NuxtAxiosInstance) => ({
  getCouncilTree(councilTreeId: CouncilTreeId): CouncilTreeResponse {
    return axios.$get(`/council_tree/${councilTreeId}`)
  },

  getCouncilTreeList({
    limit = LIMIT_LIST_ITEM,
    offset = 0,
    council='',
    parent='',
  }: CouncilTreeListRequest = {}): CouncilTreeListResponse {
    const defaultParam = {
    }

    return axios.$get('/council_tree/', {
      params: {...defaultParam, limit, offset, council, parent},
    })
  },
  createCouncilTree(payload: CreateCouncilTreeRequest): CouncilTreeResponse | CustomErrors {
    return axios.$post('/council_tree/', payload)
  },
  updateCouncilTree(request: UpdateCouncilTreeRequest): CouncilTreeResponse | CustomErrors {
    return axios.$put(`/council_tree/${request.id}/`, request.payload )
  },
  deleteCouncilTree(councilTreeId: CouncilTreeId) {
    return axios.$delete(`/council_tree/${councilTreeId}/`)
  },

})

export type CouncilTreeRepository = ReturnType<typeof councilTreeRepository>
