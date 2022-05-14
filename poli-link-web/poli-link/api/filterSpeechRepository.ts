import { NuxtAxiosInstance } from '@nuxtjs/axios'
import {
  MeetingSpeechType,
  ResponseType,
  ResponseTypes,
  CustomErrors,
} from '@/types'
import { LIMIT_LIST_ITEM } from '@/constants'

type MeetingSpeechId = MeetingSpeechType['id']

export interface FilterSpeechListRequest  {
  limit?: number
  offset?: number
  speech?: string
  council?: string[]
  council_meeting?: string[]
  person?: string[]
  council__ministry?: string[]
}

type FilterSpeechResponse = ResponseType<MeetingSpeechType>
type FilterSpeechListResponse = ResponseTypes<{count: number, next: string,previous: string, results: MeetingSpeechType[]}>

export const filterSpeechRepository = (axios: NuxtAxiosInstance) => ({
  getfilterSpeech(meetingSpeechId: MeetingSpeechId): FilterSpeechResponse {
    return axios.$get(`/filter_speech/${meetingSpeechId}`)
  },

  getFilterSpeechList({
    limit = LIMIT_LIST_ITEM,
    offset = 0,
    speech='',
    council=[''],
    council_meeting=[''],
    person=[''],
    council__ministry=[''],
  }: FilterSpeechListRequest = {}): FilterSpeechListResponse {
    const defaultParam = {
    }

        // 必要なプロパティだけ追加するのは意外と難しい
    // 重複プロパティの追加はできない　と思ったら下記は大丈夫
    // const cc = council ? {council} : {}
    // const cm = council_meeting ? {council_meeting} : {}
    // const ps = person ? {person} : {}
    // const mn = council__ministry ? {council__ministry} : {}
    // const p = {...defaultParam, limit, offset, ...cc, ...cm, ...ps, ...mn}

    const params = new URLSearchParams();
    params.append('limit', limit.toString())
    params.append('offset', offset.toString())
    params.append('speech', speech)
    council.map(element => params.append('council', element))
    council_meeting.map(element => params.append('council_meeting', element))
    person.map(element => params.append('person', element))
    council__ministry.map(element => params.append('council__ministry', element))

    return axios.$get('/filter_speech/', {
      // params: {...defaultParam, council, council_meeting, person, council__ministry},
      params: params,
    })
  },

})

export type FilterSpeechRepository = ReturnType<typeof filterSpeechRepository>
