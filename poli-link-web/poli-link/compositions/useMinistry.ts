import { reactive, useContext } from '@nuxtjs/composition-api'
import { CreateMinistryRequest, UpdateMinistryRequest } from "@/api/ministryRepository";
import { ListRequestType, MinistryType } from "@/types";

type MinistryPayload = Required<CreateMinistryRequest>
type CreateState = MinistryPayload
type State = {
  ministryData: MinistryType
  ministryList: MinistryType[]
  ministryCount: number
}

const initCreateState = {
  name: '',
  name_e: '',
  abbreviation: '',
  url: '',
}
const initState = {
  ministryData: {
    id: '',
    name: '',
    name_e: '',
    abbreviation: '',
    url: '',
  },
  ministryList: [],
  ministryCount: 0,
}

export default function useMinistry() {
  const { $repository } = useContext()

  const createState = reactive<CreateState>(initCreateState)
  const state = reactive<State>(initState)
  // const state = reactive<State>({
  //   ministryData: {
  //     id: 0,
  //     title: '',
  //     ministry: '',
  //   },
  //   ministryList: [],
  //   ministryCount: 0,
  // })
  const getMinistry = async (ministryid: MinistryType['id']) => {
    const ministryData = await $repository.ministry.getMinistry(ministryid)
    console.log('ministryid', ministryid)
    console.log('getMinistry', ministryData)

    state.ministryData = ministryData
  }

  const getMinistryList = async(payload: ListRequestType = {}) => {
    const ministrys= await $repository.ministry.getMinistryList(payload)

    console.log('ministrys', ministrys)
    
    state.ministryList = ministrys.results
    state.ministryCount = ministrys.count
  }

  const createMinistry = async (payload: CreateMinistryRequest) => {
    const response = await $repository.ministry.createMinistry(payload)

    console.log('createMinistry response', response)
    if (response) {
      await getMinistryList()
      return response
    }

    return false
  }

  const updateMinistry = async (payload: UpdateMinistryRequest) => {
    const ministryData = await $repository.ministry.updateMinistry(payload)

    if (ministryData) {
      return ministryData
    }

    return false
  }

  const deleteMinistry = async (ministryid: MinistryType['id']) => {
    await $repository.ministry.deleteMinistry(ministryid)
    await getMinistryList()
  }
  return {
    createState,
    state,
    getMinistry,
    getMinistryList,
    createMinistry,
    updateMinistry,
    deleteMinistry,
  }
}