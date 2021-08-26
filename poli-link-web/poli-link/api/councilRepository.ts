import { NuxtAxiosInstance } from '@nuxtjs/axios'
import {
  CouncilType,
  ResponseType,
  ResponseTypes,
  CustomErrors,
  // ListRequestType
} from '@/types'
import { LIMIT_LIST_ITEM } from '@/constants'

type CouncilId = CouncilType['id']


// これは個別に定義する必要があるのかは若干疑問なので、Indexの方に持っていく
// ListRequestType　を使う
// export interface CouncilListRequest  {
//   limit?: number
//   offset?: number
// }
export interface CouncilListRequest  {
  limit?: number
  offset?: number
  ministry?: string
  person?: string
}

// Pick 第1引数から第2引数以降で指定したkey値とその値で構成されたObjectを返す。
// 逆にId以外だよね
export type CreateCouncilRequest = Pick<
CouncilType,
  'name' | 'url' | 'description' | 'ministry'
>
export type UpdateCouncilPayload = Partial<CreateCouncilRequest>
export type UpdateCouncilRequest = {
  payload: UpdateCouncilPayload
  id: CouncilId
}

// 以下ほとんど文字置換だけなので、本当はもう少しうまくできるはず
type CouncilResponse = ResponseType<CouncilType>
type CouncilListResponse = ResponseTypes<{count: number, next: string,previous: string, results: CouncilType[]}>

export const councilRepository = (axios: NuxtAxiosInstance) => ({
  getCouncil(councilid: CouncilId): CouncilResponse {
    return axios.$get(`/council/${councilid}`)
  },

  getCouncilList({
    limit = LIMIT_LIST_ITEM,
    offset = 0,
    ministry='',
    person='',
  }: CouncilListRequest = {}): CouncilListResponse {
    const defaultParam = {
    }

    return axios.$get('/council/', {
      params: {...defaultParam, limit, offset},
    })
  },
  createCouncil(payload: CreateCouncilRequest): CouncilResponse | CustomErrors {
    return axios.$post('/council/', payload)
  },
  updateCouncil(request: UpdateCouncilRequest): CouncilResponse | CustomErrors {
    return axios.$put(`/council/${request.id}/`, request.payload )
  },
  deleteCouncil(councilid: CouncilId) {
    return axios.$delete(`/council/${councilid}/`)
  },

})

export type CouncilRepository = ReturnType<typeof councilRepository>
