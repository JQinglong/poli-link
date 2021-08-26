import { reactive, useContext } from '@nuxtjs/composition-api'
import { CreateCouncilMeetingRequest, UpdateCouncilMeetingRequest, CouncilMeetingListRequest } from "@/api/councilMeetingRepository";
import { CouncilType, CouncilMeetingType } from "@/types";
import { defaultCouncilItem, defaultCouncilMeetingItem } from '@/compositions/util/const'

type CouncilMeetingPayload = Required<CreateCouncilMeetingRequest>
type CreateState = CouncilMeetingPayload
type State = {
  councilMeetingData: CouncilMeetingType
  councilMeetingList: CouncilMeetingType[]
  councilMeetingCount: number
}

const initCreateState = {
  name: '',
  place: '',
  order: 0,
  meeting_date: new Date(),
  url_minute: '',
  url_document: '',
  council: defaultCouncilItem,
}
const initState = {
  councilMeetingData: defaultCouncilMeetingItem,
  councilMeetingList: [],
  councilMeetingCount: 0,
}

export default function useCouncilMeeting () {
  const { $repository } = useContext()

  const createState = reactive<CreateState>(initCreateState)
  const state = reactive<State>(initState)
  // const state = reactive<State>({
  //   councilMeetingData: {
  //     id: 0,
  //     title: '',
  //     councilMeeting: '',
  //   },
  //   councilMeetingList: [],
  //   councilMeetingCount: 0,
  // })
  const getCouncilMeeting = async (councilMeetingId: CouncilMeetingType['id']) => {
    const councilMeetingData = await $repository.councilMeeting.getCouncilMeeting(councilMeetingId)
    // console.log('councilMeetingId', councilMeetingId)
    // console.log('getCouncilMeeting', councilMeetingData)

    state.councilMeetingData = councilMeetingData
  }

  const getCouncilMeetingList = async (payload: CouncilMeetingListRequest = {}) => {
    console.log('getCouncilMeetingList payload', payload)
    const councilMeetings = await $repository.councilMeeting.getCouncilMeetingList(payload)

    console.log('getCouncilMeetingList', councilMeetings)

    state.councilMeetingList = councilMeetings.results
    state.councilMeetingCount = councilMeetings.count
  }

  const createCouncilMeeting = async (payload: CreateCouncilMeetingRequest) => {
    const response = await $repository.councilMeeting.createCouncilMeeting(payload)

    // console.log('createCouncilMeeting response', response)
    if (response) {
      await getCouncilMeetingList({ council: payload.council.id })
      return response
    }

    return false
  }

  const updateCouncilMeeting = async (payload: UpdateCouncilMeetingRequest) => {
    const councilMeetingData = await $repository.councilMeeting.updateCouncilMeeting(payload)

    if (councilMeetingData) {
      return councilMeetingData
    }

    return false
  }

  const deleteCouncilMeeting = async (councilMeetingId: CouncilMeetingType['id']) => {
    await $repository.councilMeeting.deleteCouncilMeeting(councilMeetingId)
    await getCouncilMeetingList()
  }
  return {
    createState,
    state,
    getCouncilMeeting,
    getCouncilMeetingList,
    createCouncilMeeting,
    updateCouncilMeeting,
    deleteCouncilMeeting,
  }
}