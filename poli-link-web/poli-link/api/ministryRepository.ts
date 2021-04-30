import { NuxtAxiosInstance } from '@nuxtjs/axios'
import {
  MinistryType,
  ResponseType,
  ResponseTypes,
  CustomErrors,
  ListRequestType
} from '@/types'
import { LIMIT_LIST_ITEM } from '@/constants'

type MinistryId = MinistryType['id']

// これは個別に定義する必要があるのかは若干疑問なので、Indexの方に持っていく
// ListRequestType　を使う
// export interface MinistryListRequest  {
//   limit?: number
//   offset?: number
// }

// Pick 第1引数から第2引数以降で指定したkey値とその値で構成されたObjectを返す。
// 逆にId以外だよね
export type CreateMinistryRequest = Pick<
MinistryType,
  'name' | 'name_e' | 'abbreviation' | 'url'
>
export type UpdateMinistryPayload = Partial<CreateMinistryRequest>
export type UpdateMinistryRequest = {
  payload: UpdateMinistryPayload
  id: MinistryId
}

// 以下ほとんど文字置換だけなので、本当はもう少しうまくできるはず
type MinistryResponse = ResponseType<MinistryType>
type MinistryListResponse = ResponseTypes<MinistryType[]>

export const ministryRepository = (axios: NuxtAxiosInstance) => ({
  getMinistry(ministryid: MinistryId): MinistryResponse {
    return axios.$get(`/ministry/${ministryid}`)
  },

  getMinistryList({
    limit = LIMIT_LIST_ITEM,
    offset = 0,
  }: ListRequestType = {}): MinistryListResponse {
    const defaultParam = {
    }

    return axios.$get('/ministry/', {
      params: {...defaultParam, limit, offset},
    })
  },
  createMinistry(payload: CreateMinistryRequest): MinistryResponse | CustomErrors {
    return axios.$post('/ministry/', payload)
  },
  updateMinistry(request: UpdateMinistryRequest): MinistryResponse | CustomErrors {
    return axios.$put(`/ministry/${request.id}/`, request.payload )
  },
  deleteMinistry(ministryid: MinistryId) {
    return axios.$delete(`/ministry/${ministryid}/`)
  },

})

export type MinistryRepository = ReturnType<typeof ministryRepository>
