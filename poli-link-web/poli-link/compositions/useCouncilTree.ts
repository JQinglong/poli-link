import { reactive, useContext } from '@nuxtjs/composition-api'
import { CreateCouncilTreeRequest, UpdateCouncilTreeRequest, CouncilTreeListRequest } from "@/api/councilTreeRepository";
import { CouncilType, CouncilTreeType } from "@/types";
import { defaultCouncilItem, defaultCouncilTreeItem } from '@/compositions/util/const'

type CouncilTreePayload = Required<CreateCouncilTreeRequest>
type CreateState = CouncilTreePayload
type State = {
  councilTreeData: CouncilTreeType
  councilTreeList: CouncilTreeType[]
  councilTreeCount: number
}

const initCreateState = {
  council: defaultCouncilItem,
  parent: defaultCouncilItem,
  level: 0,
  order: 0,
}
const initState = {
  councilTreeData: defaultCouncilTreeItem,
  councilTreeList: [],
  councilTreeCount: 0,
}

export default function useCouncilTree () {
  const { $repository } = useContext()

  const createState = reactive<CreateState>(initCreateState)
  const state = reactive<State>(initState)
  // const state = reactive<State>({
  //   councilTreeData: {
  //     id: 0,
  //     title: '',
  //     councilTree: '',
  //   },
  //   councilTreeList: [],
  //   councilTreeCount: 0,
  // })
  const getCouncilTree = async (councilTreeId: CouncilTreeType['id']) => {
    const councilTreeData = await $repository.councilTree.getCouncilTree(councilTreeId)
    // console.log('councilTreeId', councilTreeId)
    // console.log('getCouncilTree', councilTreeData)

    state.councilTreeData = councilTreeData
  }

  const getCouncilTreeList = async (payload: CouncilTreeListRequest = {}) => {
    // console.log('getCouncilTreeList', payload)
    const councilTrees = await $repository.councilTree.getCouncilTreeList(payload)

    console.log('getCouncilTreeList', councilTrees)

    state.councilTreeList = councilTrees
    state.councilTreeCount = councilTrees.length
  }

  const createCouncilTree = async (payload: CreateCouncilTreeRequest) => {
    const response = await $repository.councilTree.createCouncilTree(payload)

    // console.log('createCouncilTree response', response)
    if (response) {
      await getCouncilTreeList({ council: payload.council.id })
      return response
    }

    return false
  }

  const updateCouncilTree = async (payload: UpdateCouncilTreeRequest) => {
    const councilTreeData = await $repository.councilTree.updateCouncilTree(payload)

    if (councilTreeData) {
      return councilTreeData
    }

    return false
  }

  const deleteCouncilTree = async (councilTreeId: CouncilTreeType['id']) => {
    await $repository.councilTree.deleteCouncilTree(councilTreeId)
    await getCouncilTreeList()
  }
  return {
    createState,
    state,
    getCouncilTree,
    getCouncilTreeList,
    createCouncilTree,
    updateCouncilTree,
    deleteCouncilTree,
  }
}