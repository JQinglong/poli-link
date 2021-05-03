import { reactive, useContext } from '@nuxtjs/composition-api'
import { CreateMeetingSpeechRequest, UpdateMeetingSpeechRequest, MeetingSpeechListRequest } from "@/api/meetingSpeechRepository";
import { ListRequestType, MeetingSpeechType } from "@/types";

type MeetingSpeechPayload = Required<CreateMeetingSpeechRequest>
type CreateState = MeetingSpeechPayload
type State = {
  meetingSpeechData: MeetingSpeechType
  meetingSpeechList: MeetingSpeechType[]
  meetingSpeechCount: number
}

const initCreateState = {
  council: '',
  council_meeting: '',
  order: 0,
  speaker: '',
  person: '',
  speech: '',
  description: '',
}
const initState = {
  meetingSpeechData: {
    id: '',
    council: '',
    council_meeting: '',
    order: 0,
    speaker: '',
    person: '',
    speech: '',
    description: '',
  },
  meetingSpeechList: [],
  meetingSpeechCount: 0,
}

export default function useMeetingSpeech () {
  const { $repository } = useContext()

  const createState = reactive<CreateState>(initCreateState)
  const state = reactive<State>(initState)
  // const state = reactive<State>({
  //   meetingSpeechData: {
  //     id: 0,
  //     title: '',
  //     meetingSpeech: '',
  //   },
  //   meetingSpeechList: [],
  //   meetingSpeechCount: 0,
  // })
  const getMeetingSpeech = async (meetingSpeechId: MeetingSpeechType['id']) => {
    const meetingSpeechData = await $repository.meetingSpeech.getMeetingSpeech(meetingSpeechId)
    // console.log('meetingSpeechId', meetingSpeechId)
    // console.log('getMeetingSpeech', meetingSpeechData)

    state.meetingSpeechData = meetingSpeechData
  }

  const getMeetingSpeechList = async (payload: MeetingSpeechListRequest = {}) => {
    const meetingSpeechs = await $repository.meetingSpeech.getMeetingSpeechList(payload)

    // console.log('meetingSpeechs', meetingSpeechs)

    state.meetingSpeechList = meetingSpeechs
    state.meetingSpeechCount = meetingSpeechs.length
  }

  const createMeetingSpeech = async (payload: CreateMeetingSpeechRequest) => {
    const response = await $repository.meetingSpeech.createMeetingSpeech(payload)

    // console.log('createMeetingSpeech response', response)
    if (response) {
      await getMeetingSpeechList()
      return response
    }

    return false
  }

  const updateMeetingSpeech = async (payload: UpdateMeetingSpeechRequest) => {
    const meetingSpeechData = await $repository.meetingSpeech.updateMeetingSpeech(payload)

    if (meetingSpeechData) {
      return meetingSpeechData
    }

    return false
  }

  const deleteMeetingSpeech = async (meetingSpeechId: MeetingSpeechType['id']) => {
    await $repository.meetingSpeech.deleteMeetingSpeech(meetingSpeechId)
    await getMeetingSpeechList()
  }
  return {
    createState,
    state,
    getMeetingSpeech,
    getMeetingSpeechList,
    createMeetingSpeech,
    updateMeetingSpeech,
    deleteMeetingSpeech,
  }
}