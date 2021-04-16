import { reactive, useContext } from '@nuxtjs/composition-api'
import { MemoListRequest, CreateMemoRequest, UpdateMemoRequest } from "@/api/memoRepository";
import { Memo } from "@/types";
import MemoKey from '~/store/memo-key';

type MemoPayload = Required<CreateMemoRequest>
type CreateState = MemoPayload
type State = {
  memo: Memo
  memoList: Memo[]
  memoCount: number
}

const initCreateState = {
    title: '',
    memo: '',
}
const initState = {
  memo: {
    id: 0,
    title: '',
    memo: '',
  },
}

export default function useMemo() {
  const { $repository } = useContext()

  const createState = reactive<CreateState>(initCreateState)
  // const state = reactive<State>(initState)
  const state = reactive<State>({
    memo: {
      id: 0,
      title: '',
      memo: '',
    },
    memoList: [],
    memoCount: 0,
  })
  const getMemo = async (memoid: Memo['id']) => {
    const { memo } = await $repository.memo.getMemo(memoid)

    state.memo = memo
  }

  const getMemoList = async(payload: MemoListRequest = {}) => {
    const memos= await $repository.memo.getMemoList(payload)

    console.log('memos', memos)
    
    state.memoList = memos
    state.memoCount = memos.length
  }

  const createMemo = async (payload: CreateMemoRequest) => {
    const response = await $repository.memo.createMemo(payload)

    if ('memo' in response) {
      await getMemoList()
      return response.memo
    }

    return false
  }

  const updateMemo = async (payload: UpdateMemoRequest) => {
    const response = await $repository.memo.updateMemo(payload)

    if ('memo' in response) {
      return response.memo
    }

    return false
  }

  const deleteMemo = async (memoid: Memo['id']) => {
    await $repository.memo.deleteMemo(memoid)
    await getMemoList()
  }
  return {
    createState,
    state,
    getMemo,
    getMemoList,
    createMemo,
    updateMemo,
    deleteMemo,
  }
}