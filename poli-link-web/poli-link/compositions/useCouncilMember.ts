import { reactive, useContext } from '@nuxtjs/composition-api'
import { CreateCouncilMemberRequest, UpdateCouncilMemberRequest, CouncilMemberListRequest } from "@/api/councilMemberRepository";
import { CouncilType, CouncilMemberType } from "@/types";
import { defaultCouncilItem, defaultCouncilMemberItem } from '@/compositions/util/const'

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
  council: defaultCouncilItem,
  person: '',
}
const initState = {
  councilMemberData: defaultCouncilMemberItem,
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

    // console.log('getCouncilMemberList', councilMembers)
    // console.log('getCouncilMemberList payload', payload)
    
    state.councilMemberList = councilMembers.results
    state.councilMemberCount = councilMembers.count
  }

  const createCouncilMember = async (payload: CreateCouncilMemberRequest) => {
    const response = await $repository.councilMember.createCouncilMember(payload)

    // console.log('createCouncilMember response', response)
    if (response) {
      await getCouncilMemberList({ council: payload.council.id })
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
    // 本当は引数必要
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