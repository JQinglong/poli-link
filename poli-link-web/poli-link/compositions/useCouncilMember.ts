import { reactive, useContext } from '@nuxtjs/composition-api'
import { CreateCouncilMemberRequest, UpdateCouncilMemberRequest, CouncilMemberListRequest } from "@/api/councilMemberRepository";
import { ListRequestType, CouncilMemberType } from "@/types";

type CouncilMemberPayload = Required<CreateCouncilMemberRequest>
type CreateState = CouncilMemberPayload
type State = {
  councilMemberData: CouncilMemberType
  councilMemberList: CouncilMemberType[]
  councilMemberCount: number
}

const initCreateState = {
  name: '',
  occupation: '',
  position: '',
  council: '',
  person: '',
}
const initState = {
  councilMemberData: {
    id: '',
    name: '',
    occupation: '',
    position: '',
    council: '',
    person: '',
    },
  councilMemberList: [],
  councilMemberCount: 0,
}

export default function useCouncilMember() {
  const { $repository } = useContext()

  const createState = reactive<CreateState>(initCreateState)
  const state = reactive<State>(initState)
  // const state = reactive<State>({
  //   councilMemberData: {
  //     id: 0,
  //     title: '',
  //     councilMember: '',
  //   },
  //   councilMemberList: [],
  //   councilMemberCount: 0,
  // })
  const getCouncilMember = async (councilMemberId: CouncilMemberType['id']) => {
    const councilMemberData = await $repository.councilMember.getCouncilMember(councilMemberId)
    // console.log('councilMemberId', councilMemberId)
    // console.log('getCouncilMember', councilMemberData)

    state.councilMemberData = councilMemberData
  }

  const getCouncilMemberList = async(payload: CouncilMemberListRequest = {}) => {
    const councilMembers= await $repository.councilMember.getCouncilMemberList(payload)

    console.log('councilMembers', councilMembers)
    
    state.councilMemberList = councilMembers
    state.councilMemberCount = councilMembers.length
  }

  const createCouncilMember = async (payload: CreateCouncilMemberRequest) => {
    const response = await $repository.councilMember.createCouncilMember(payload)

    // console.log('createCouncilMember response', response)
    if (response) {
      await getCouncilMemberList()
      return response
    }

    return false
  }

  const updateCouncilMember = async (payload: UpdateCouncilMemberRequest) => {
    const councilMemberData = await $repository.councilMember.updateCouncilMember(payload)

    if (councilMemberData) {
      return councilMemberData
    }

    return false
  }

  const deleteCouncilMember = async (councilMemberId: CouncilMemberType['id']) => {
    await $repository.councilMember.deleteCouncilMember(councilMemberId)
    await getCouncilMemberList()
  }
  return {
    createState,
    state,
    getCouncilMember,
    getCouncilMemberList,
    createCouncilMember,
    updateCouncilMember,
    deleteCouncilMember,
  }
}