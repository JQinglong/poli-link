import { reactive, useContext } from '@nuxtjs/composition-api'
import { CreatePersonRequest, UpdatePersonRequest } from "@/api/personRepository";
import { ListRequestType, PersonType } from "@/types";

type PersonPayload = Required<CreatePersonRequest>
type CreateState = PersonPayload
type State = {
  personData: PersonType
  personList: PersonType[]
  personCount: number
}

const initCreateState = {
  name: '',
  name_kana: '',
  name_e: '',
  url_official: '',
  url_wikipedia: '',
  url_twitter: '',
  url_facebook: '',
  url_youtube: '',
  career_summary: '',
}
const initState = {
  personData: {
    id: '',
    name: '',
    name_kana: '',
    name_e: '',
    url_official: '',
    url_wikipedia: '',
    url_twitter: '',
    url_facebook: '',
    url_youtube: '',
    career_summary: '',
  },
  personList: [],
  personCount: 0,
}

export default function usePerson() {
  const { $repository } = useContext()

  const createState = reactive<CreateState>(initCreateState)
  const state = reactive<State>(initState)
  // const state = reactive<State>({
  //   personData: {
  //     id: 0,
  //     title: '',
  //     person: '',
  //   },
  //   personList: [],
  //   personCount: 0,
  // })
  const getPerson = async (personid: PersonType['id']) => {
    const personData = await $repository.person.getPerson(personid)
    console.log('personid', personid)
    console.log('getPerson', personData)

    state.personData = personData
  }

  const getPersonList = async(payload: ListRequestType = {}) => {
    const persons= await $repository.person.getPersonList(payload)

    // console.log('persons', persons)
    
    state.personList = persons.results
    state.personCount = persons.count
  }

  const createPerson = async (payload: CreatePersonRequest) => {
    const response = await $repository.person.createPerson(payload)

    console.log('createPerson response', response)
    if (response) {
      await getPersonList()
      return response
    }

    return false
  }

  const updatePerson = async (payload: UpdatePersonRequest) => {
    const personData = await $repository.person.updatePerson(payload)

    if (personData) {
      return personData
    }

    return false
  }

  const deletePerson = async (personid: PersonType['id']) => {
    await $repository.person.deletePerson(personid)
    await getPersonList()
  }
  return {
    createState,
    state,
    getPerson,
    getPersonList,
    createPerson,
    updatePerson,
    deletePerson,
  }
}