import { reactive, useContext } from '@nuxtjs/composition-api'
import { CreateCouncilRequest, UpdateCouncilRequest, CouncilListRequest } from "@/api/councilRepository";
import { CouncilType } from "@/types";
import { defaultMinistryItem, defaultCouncilItem } from '@/compositions/util/const'

type CouncilPayload = Required<CreateCouncilRequest>
type CreateState = CouncilPayload
type State = {
  councilData: CouncilType
  councilList: CouncilType[]
  councilCount: number
}

const initCreateState = {
  name: '',
  url: '',
  description: '',
  ministry: defaultMinistryItem,
}
const initState = {
  councilData: defaultCouncilItem,
  councilList: [],
  councilCount: 0,
}

export default function useCouncil() {
  const { $repository } = useContext()

  const createState = reactive<CreateState>(initCreateState)
  const state = reactive<State>(initState)
  // const state = reactive<State>({
  //   councilData: {
  //     id: 0,
  //     title: '',
  //     council: '',
  //   },
  //   councilList: [],
  //   councilCount: 0,
  // })
  const getCouncil = async (councilid: CouncilType['id']) => {
    const councilData = await $repository.council.getCouncil(councilid)
    // console.log('councilid', councilid)
    // console.log('getCouncil', councilData)

    state.councilData = councilData
  }

  const getCouncilList = async(payload: CouncilListRequest = {}) => {
    const councils= await $repository.council.getCouncilList(payload)

    // console.log('councils', councils)
    
    state.councilList = councils.results
    state.councilCount = councils.count
  }

  const createCouncil = async (payload: CreateCouncilRequest) => {
    const response = await $repository.council.createCouncil(payload)

    console.log('createCouncil response', response)
    if (response) {
      await getCouncilList()
      return response
    }

    return false
  }

  const updateCouncil = async (payload: UpdateCouncilRequest) => {
    const councilData = await $repository.council.updateCouncil(payload)

    if (councilData) {
      return councilData
    }

    return false
  }

  const deleteCouncil = async (councilid: CouncilType['id']) => {
    await $repository.council.deleteCouncil(councilid)
    await getCouncilList()
  }
  return {
    createState,
    state,
    getCouncil,
    getCouncilList,
    createCouncil,
    updateCouncil,
    deleteCouncil,
  }
}