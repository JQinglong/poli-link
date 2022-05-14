import { Context } from '@nuxt/types'
import {
  memoRepository,
  MemoRepository,
  ministryRepository,
  MinistryRepository,
  councilRepository,
  CouncilRepository,
  personRepository,
  PersonRepository,
  councilMemberRepository,
  CouncilMemberRepository,
  councilMeetingRepository,
  CouncilMeetingRepository,
  meetingSpeechRepository,
  MeetingSpeechRepository,
  councilTreeRepository,
  CouncilTreeRepository,
  councilNewsRepository,
  CouncilNewsRepository,
  filterSpeechRepository,
  FilterSpeechRepository,
} from '@/api'
import { ErrorType } from '@/constants'

export type Repository = {
  memo: MemoRepository
  ministry: MinistryRepository
  council: CouncilRepository
  person: PersonRepository
  councilMember: CouncilMemberRepository
  councilMeeting: CouncilMeetingRepository
  meetingSpeech: MeetingSpeechRepository
  councilTree: CouncilTreeRepository
  councilNews: CouncilNewsRepository
  filterSpeech: FilterSpeechRepository
}

/**
 * @see https://axios.nuxtjs.org
 * @see https://github.com/gothinkster/realworld/tree/3155494efe68432772157de38a90c49b3698897f/api
 */
const createRepository = ({ app, $axios, redirect }: Context): Repository => {
  $axios.onError((error) => {
    console.log('createRepository error', error, error.response?.data)
    if (!error.response) {
      return
    }

    const code = error.response.status

    if (code === ErrorType.Unprocessable) {
      return Promise.reject(error.response.data.console.errors)
    }
    if (code === ErrorType.Unauthorized) {
      redirect('/login')

      return
    }

    if (code === ErrorType.Forbidden) {
      app?.router?.back()

      return
    }

    if (code === ErrorType.NotFound) {
      redirect('/')
    }
  })

  console.log('createRepository', $axios)

  return {
    memo: memoRepository($axios),
    ministry: ministryRepository($axios),
    council: councilRepository($axios),
    person: personRepository($axios),
    councilMember: councilMemberRepository($axios),
    councilMeeting: councilMeetingRepository($axios),
    meetingSpeech: meetingSpeechRepository($axios),
    councilTree: councilTreeRepository($axios),
    councilNews: councilNewsRepository($axios),
    filterSpeech: filterSpeechRepository($axios),
  }
}

export default createRepository