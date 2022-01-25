import { NuxtAxiosInstance } from '@nuxtjs/axios'
import {
  CouncilNewsType,
  ResponseType,
  ResponseTypes,
  CustomErrors,
  ListRequestType
} from '@/types'
import { LIMIT_LIST_ITEM } from '@/constants'

type CouncilNewsId = CouncilNewsType['id']

// これは個別に定義する必要があるのかは若干疑問なので、Indexの方に持っていく
// ListRequestType　を使う
// export interface CouncilNewsListRequest  {
//   limit?: number
//   offset?: number
// }
export interface CouncilNewsListRequest  {
  limit?: number
  offset?: number
  council?: string
}

// Pick 第1引数から第2引数以降で指定したkey値とその値で構成されたObjectを返す。
// 逆にId以外だよね
export type CreateCouncilNewsRequest = Pick<
CouncilNewsType,
  'url' | 'council'
>
export type UpdateCouncilNewsPayload = Partial<CreateCouncilNewsRequest>
export type UpdateCouncilNewsRequest = {
  payload: UpdateCouncilNewsPayload
  id: CouncilNewsId
}

// 以下ほとんど文字置換だけなので、本当はもう少しうまくできるはず
type CouncilNewsResponse = ResponseType<CouncilNewsType>
type CouncilNewsListResponse = ResponseTypes<{count: number, next: string,previous: string, results: CouncilNewsType[]}>

export const councilNewsRepository = (axios: NuxtAxiosInstance) => ({
  getCouncilNews(councilNewsId: CouncilNewsId): CouncilNewsResponse {
    return axios.$get(`/council_news/${councilNewsId}`)
  },

  getCouncilNewsList({
    limit = LIMIT_LIST_ITEM,
    offset = 0,
    council='',
  }: CouncilNewsListRequest = {}): CouncilNewsListResponse {
    const defaultParam = {
    }
    // console.log('councilNewsRepository person', person)
    return axios.$get('/council_news/', {
      params: {...defaultParam, limit, offset, council},
    })
  },
  createCouncilNews(payload: CreateCouncilNewsRequest): CouncilNewsResponse | CustomErrors {
    return axios.$post('/council_news/', payload)
  },
  updateCouncilNews(request: UpdateCouncilNewsRequest): CouncilNewsResponse | CustomErrors {
    return axios.$put(`/council_news/${request.id}/`, request.payload )
  },
  deleteCouncilNews(councilNewsId: CouncilNewsId) {
    return axios.$delete(`/council_news/${councilNewsId}/`)
  },

})

export type CouncilNewsRepository = ReturnType<typeof councilNewsRepository>
