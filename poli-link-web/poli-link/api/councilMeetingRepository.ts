import { NuxtAxiosInstance } from '@nuxtjs/axios'
import {
  CouncilMeetingType,
  ResponseType,
  ResponseTypes,
  CustomErrors,
  ListRequestType
} from '@/types'
import { LIMIT_LIST_ITEM } from '@/constants'

type CouncilMeetingId = CouncilMeetingType['id']

// これは個別に定義する必要があるのかは若干疑問なので、Indexの方に持っていく
// ListRequestType　を使う
// export interface CouncilMeetingListRequest  {
//   limit?: number
//   offset?: number
// }
export interface CouncilMeetingListRequest  {
  limit?: number
  offset?: number
  council?: string
}

// Pick 第1引数から第2引数以降で指定したkey値とその値で構成されたObjectを返す。
// 逆にId以外だよね
export type CreateCouncilMeetingRequest = Pick<
CouncilMeetingType,
  'name' | 'place' | 'order' | 'meeting_date' | 'url_minute' | 'url_document' | 'council'
>
export type UpdateCouncilMeetingPayload = Partial<CreateCouncilMeetingRequest>
export type UpdateCouncilMeetingRequest = {
  payload: UpdateCouncilMeetingPayload
  id: CouncilMeetingId
}

// 以下ほとんど文字置換だけなので、本当はもう少しうまくできるはず
type CouncilMeetingResponse = ResponseType<CouncilMeetingType>
type CouncilMeetingListResponse = ResponseTypes<CouncilMeetingType[]>

export const councilMeetingRepository = (axios: NuxtAxiosInstance) => ({
  getCouncilMeeting(councilMeetingId: CouncilMeetingId): CouncilMeetingResponse {
    return axios.$get(`/council_meeting/${councilMeetingId}`)
  },

  getCouncilMeetingList({
    limit = LIMIT_LIST_ITEM,
    offset = 0,
    council=''
  }: CouncilMeetingListRequest = {}): CouncilMeetingListResponse {
    const defaultParam = {
    }

    return axios.$get('/council_meeting/', {
      params: {...defaultParam, limit, offset, council},
    })
  },
  createCouncilMeeting(payload: CreateCouncilMeetingRequest): CouncilMeetingResponse | CustomErrors {
    return axios.$post('/council_meeting/', payload)
  },
  updateCouncilMeeting(request: UpdateCouncilMeetingRequest): CouncilMeetingResponse | CustomErrors {
    return axios.$put(`/council_meeting/${request.id}/`, request.payload )
  },
  deleteCouncilMeeting(councilMeetingId: CouncilMeetingId) {
    return axios.$delete(`/council_meeting/${councilMeetingId}/`)
  },

})

export type CouncilMeetingRepository = ReturnType<typeof councilMeetingRepository>
