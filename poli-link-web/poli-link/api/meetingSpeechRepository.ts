import { NuxtAxiosInstance } from '@nuxtjs/axios'
import {
  MeetingSpeechType,
  ResponseType,
  ResponseTypes,
  CustomErrors,
} from '@/types'
import { LIMIT_LIST_ITEM } from '@/constants'

type MeetingSpeechId = MeetingSpeechType['id']

// これは個別に定義する必要があるのかは若干疑問なので、Indexの方に持っていく
// ListRequestType　を使う
// export interface MeetingSpeechListRequest  {
//   limit?: number
//   offset?: number
// }
export interface MeetingSpeechListRequest  {
  limit?: number
  offset?: number
  council?: string
  council_meeting?: string
  person?: string
}

// Pick 第1引数から第2引数以降で指定したkey値とその値で構成されたObjectを返す。
// 逆にId以外だよね
export type CreateMeetingSpeechRequest = Pick<
MeetingSpeechType,
  'council' | 'council_meeting' | 'order' | 'speaker' | 'person' | 'speech' | 'description'
>
export type UpdateMeetingSpeechPayload = Partial<CreateMeetingSpeechRequest>
export type UpdateMeetingSpeechRequest = {
  payload: UpdateMeetingSpeechPayload
  id: MeetingSpeechId
}

// 以下ほとんど文字置換だけなので、本当はもう少しうまくできるはず
type MeetingSpeechResponse = ResponseType<MeetingSpeechType>
type MeetingSpeechListResponse = ResponseTypes<MeetingSpeechType[]>

export const meetingSpeechRepository = (axios: NuxtAxiosInstance) => ({
  getMeetingSpeech(meetingSpeechId: MeetingSpeechId): MeetingSpeechResponse {
    return axios.$get(`/meeting_speech/${meetingSpeechId}`)
  },

  getMeetingSpeechList({
    limit = LIMIT_LIST_ITEM,
    offset = 0,
    council='',
    council_meeting='',
    person='',
  }: MeetingSpeechListRequest = {}): MeetingSpeechListResponse {
    const defaultParam = {
    }

    return axios.$get('/meeting_speech/', {
      params: {...defaultParam, limit, offset, council, council_meeting, person},
    })
  },
  createMeetingSpeech(payload: CreateMeetingSpeechRequest): MeetingSpeechResponse | CustomErrors {
    return axios.$post('/meeting_speech/', payload)
  },
  updateMeetingSpeech(request: UpdateMeetingSpeechRequest): MeetingSpeechResponse | CustomErrors {
    return axios.$put(`/meeting_speech/${request.id}/`, request.payload )
  },
  deleteMeetingSpeech(meetingSpeechId: MeetingSpeechId) {
    return axios.$delete(`/meeting_speech/${meetingSpeechId}/`)
  },

})

export type MeetingSpeechRepository = ReturnType<typeof meetingSpeechRepository>
