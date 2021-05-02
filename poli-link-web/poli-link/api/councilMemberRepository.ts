import { NuxtAxiosInstance } from '@nuxtjs/axios'
import {
  CouncilMemberType,
  ResponseType,
  ResponseTypes,
  CustomErrors,
  ListRequestType
} from '@/types'
import { LIMIT_LIST_ITEM } from '@/constants'

type CouncilMemberId = CouncilMemberType['id']

// これは個別に定義する必要があるのかは若干疑問なので、Indexの方に持っていく
// ListRequestType　を使う
// export interface CouncilMemberListRequest  {
//   limit?: number
//   offset?: number
// }

// Pick 第1引数から第2引数以降で指定したkey値とその値で構成されたObjectを返す。
// 逆にId以外だよね
export type CreateCouncilMemberRequest = Pick<
CouncilMemberType,
  'name' | 'occupation' | 'position' | 'council' | 'person'
>
export type UpdateCouncilMemberPayload = Partial<CreateCouncilMemberRequest>
export type UpdateCouncilMemberRequest = {
  payload: UpdateCouncilMemberPayload
  id: CouncilMemberId
}

// 以下ほとんど文字置換だけなので、本当はもう少しうまくできるはず
type CouncilMemberResponse = ResponseType<CouncilMemberType>
type CouncilMemberListResponse = ResponseTypes<CouncilMemberType[]>

export const councilMemberRepository = (axios: NuxtAxiosInstance) => ({
  getCouncilMember(councilMemberId: CouncilMemberId): CouncilMemberResponse {
    return axios.$get(`/council_member/${councilMemberId}`)
  },

  getCouncilMemberList({
    limit = LIMIT_LIST_ITEM,
    offset = 0,
  }: ListRequestType = {}): CouncilMemberListResponse {
    const defaultParam = {
    }

    return axios.$get('/council_member/', {
      params: {...defaultParam, limit, offset},
    })
  },
  createCouncilMember(payload: CreateCouncilMemberRequest): CouncilMemberResponse | CustomErrors {
    return axios.$post('/council_member/', payload)
  },
  updateCouncilMember(request: UpdateCouncilMemberRequest): CouncilMemberResponse | CustomErrors {
    return axios.$put(`/council_member/${request.id}/`, request.payload )
  },
  deleteCouncilMember(councilMemberId: CouncilMemberId) {
    return axios.$delete(`/council_member/${councilMemberId}/`)
  },

})

export type CouncilMemberRepository = ReturnType<typeof councilMemberRepository>
