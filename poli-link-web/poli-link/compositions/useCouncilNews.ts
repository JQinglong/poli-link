import { reactive, useContext } from '@nuxtjs/composition-api'
import { CreateCouncilNewsRequest, UpdateCouncilNewsRequest, CouncilNewsListRequest } from "@/api/councilNewsRepository";
import { CouncilType, CouncilNewsType } from "@/types";
import { defaultCouncilItem, defaultCouncilNewsItem } from '@/compositions/util/const'

type CouncilNewsPayload = Required<CreateCouncilNewsRequest>
type CreateState = CouncilNewsPayload
type State = {
  councilNewsData: CouncilNewsType
  councilNewsList: CouncilNewsType[]
  councilNewsCount: number
}

const initCreateState = {
  url: '',
  council: defaultCouncilItem,
}
const initState = {
  councilNewsData: defaultCouncilNewsItem,
  councilNewsList: [],
  councilNewsCount: 0,
}

export default function useCouncilNews() {
  const { $repository } = useContext()

  const createState = reactive<CreateState>(initCreateState)
  const state = reactive<State>(initState)
  // const state = reactive<State>({
  //   councilNewsData: {
  //     id: 0,
  //     title: '',
  //     councilNews: '',
  //   },
  //   councilNewsList: [],
  //   councilNewsCount: 0,
  // })
  const getCouncilNews = async (councilNewsId: CouncilNewsType['id']) => {
    const councilNewsData = await $repository.councilNews.getCouncilNews(councilNewsId)
    // console.log('councilNewsId', councilNewsId)
    // console.log('getCouncilNews', councilNewsData)

    state.councilNewsData = councilNewsData
  }

  const getCouncilNewsList = async(payload: CouncilNewsListRequest = {}) => {
    const councilNewss= await $repository.councilNews.getCouncilNewsList(payload)

    // console.log('getCouncilNewsList', councilNewss)
    console.log('getCouncilNewsList payload', payload)
    console.log('getCouncilNewsList councilNewss.count', councilNewss.count)
    
    state.councilNewsList = councilNewss.results
    state.councilNewsCount = councilNewss.count
  }

  const createCouncilNews = async (payload: CreateCouncilNewsRequest) => {
    const response = await $repository.councilNews.createCouncilNews(payload)

    // console.log('createCouncilNews response', response)
    if (response) {
      await getCouncilNewsList({ council: payload.council.id })
      return response
    }

    return false
  }

  const updateCouncilNews = async (payload: UpdateCouncilNewsRequest) => {
    const councilNewsData = await $repository.councilNews.updateCouncilNews(payload)

    if (councilNewsData) {
      return councilNewsData
    }

    return false
  }

  const deleteCouncilNews = async (councilNewsId: CouncilNewsType['id']) => {
    await $repository.councilNews.deleteCouncilNews(councilNewsId)
    // 本当は引数必要
    await getCouncilNewsList()
  }
  return {
    createState,
    state,
    getCouncilNews,
    getCouncilNewsList,
    createCouncilNews,
    updateCouncilNews,
    deleteCouncilNews,
  }
}