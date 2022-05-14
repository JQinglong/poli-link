import { reactive, useContext } from '@nuxtjs/composition-api'
import { FilterSpeechListRequest } from "@/api/filterSpeechRepository";
import { CouncilType, CouncilMeetingType, MeetingSpeechType } from "@/types";
import { defaultCouncilItem, defaultCouncilMeetingItem } from '@/compositions/util/const'

// type MeetingSpeechPayload = Required<CreateMeetingSpeechRequest>
// type CreateState = MeetingSpeechPayload
type State = {
  meetingSpeechData: MeetingSpeechType
  meetingSpeechList: MeetingSpeechType[]
  meetingSpeechCount: number
}

// const initCreateState = {
//   council: defaultCouncilItem,
//   council_meeting: defaultCouncilMeetingItem,
//   order: 0,
//   speaker: '',
//   person: '',
//   speech: '',
//   description: '',
// }

const initState = {
  meetingSpeechData: {
    id: '',
    council: defaultCouncilItem,
    council_meeting: defaultCouncilMeetingItem,
    order: 0,
    speaker: '',
    person: '',
    speech: '',
    description: '',
  },
  meetingSpeechList: [],
  meetingSpeechCount: 0,
}

export default function useFilterSpeech () {
  const { $repository } = useContext()

  // const createState = reactive<CreateState>(initCreateState)
  const state = reactive<State>(initState)

  const getFilterSpeech = async (meetingSpeechId: MeetingSpeechType['id']) => {
    const meetingSpeechData = await $repository.filterSpeech.getfilterSpeech(meetingSpeechId)

    state.meetingSpeechData = meetingSpeechData
  }

  const getFilterSpeechList = async (payload: FilterSpeechListRequest = {}) => {
    const meetingSpeechs = await $repository.filterSpeech.getFilterSpeechList(payload)

    // console.log('getFilterSpeechList payload', payload)
    // console.log('getFilterSpeechList meetingSpeechs', meetingSpeechs)
    // console.log('getFilterSpeechList meetingSpeechs.count', meetingSpeechs.count)

    // state.meetingSpeechList = meetingSpeechs.results
    // state.meetingSpeechCount = meetingSpeechs.count
    state.meetingSpeechList = meetingSpeechs.results
    state.meetingSpeechCount = meetingSpeechs.count
    // console.log('getFilterSpeechList state', state)
  }


  return {
    // createState,
    state,
    getFilterSpeech,
    getFilterSpeechList,
  }
}