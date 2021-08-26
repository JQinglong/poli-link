import { NuxtAxiosInstance } from '@nuxtjs/axios'
import {
  PersonType,
  ResponseType,
  ResponseTypes,
  CustomErrors,
  ListRequestType
} from '@/types'
import { LIMIT_LIST_ITEM } from '@/constants'

type PersonId = PersonType['id']

// これは個別に定義する必要があるのかは若干疑問なので、Indexの方に持っていく
// ListRequestType　を使う
// export interface PersonListRequest  {
//   limit?: number
//   offset?: number
// }

// Pick 第1引数から第2引数以降で指定したkey値とその値で構成されたObjectを返す。
// 逆にId以外だよね
export type CreatePersonRequest = Pick<
PersonType,
  'name' | 'name_kana' | 'name_e' | 'url_official' | 'url_wikipedia' | 'url_twitter' | 'url_facebook' | 'url_youtube' | 'career_summary'
>
export type UpdatePersonPayload = Partial<CreatePersonRequest>
export type UpdatePersonRequest = {
  payload: UpdatePersonPayload
  id: PersonId
}

// 以下ほとんど文字置換だけなので、本当はもう少しうまくできるはず
type PersonResponse = ResponseType<PersonType>
type PersonListResponse = ResponseTypes<{count: number, next: string,previous: string, results: PersonType[]}>

export const personRepository = (axios: NuxtAxiosInstance) => ({
  getPerson(personid: PersonId): PersonResponse {
    return axios.$get(`/person/${personid}`)
  },

  getPersonList({
    limit = LIMIT_LIST_ITEM,
    offset = 0,
  }: ListRequestType = {}): PersonListResponse {
    const defaultParam = {
    }

    return axios.$get('/person/', {
      params: {...defaultParam, limit, offset},
    })
  },
  createPerson(payload: CreatePersonRequest): PersonResponse | CustomErrors {
    return axios.$post('/person/', payload)
  },
  updatePerson(request: UpdatePersonRequest): PersonResponse | CustomErrors {
    return axios.$put(`/person/${request.id}/`, request.payload )
  },
  deletePerson(personid: PersonId) {
    return axios.$delete(`/person/${personid}/`)
  },

})

export type PersonRepository = ReturnType<typeof personRepository>
