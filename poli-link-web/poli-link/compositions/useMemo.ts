import { reactive, useContext } from '@nuxtjs/composition-api'
import { CreateMemoRequest, UpdateMemoRequest } from "@/api/memoRepository";
import { Memo } from "@/types";

type MemoPayload = Required<CreateMemoRequest>
type CreateState = MemoPayload
type State = {
  memo: Memo
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
  const state = reactive<State>(initState)

  const getMemo = async (memoid: Memo['id']) => {
    const { memo } = await $repository.memo.getMemo(memoid)

    state.memo = memo
  }

  const createMemo = async (payload: CreateMemoRequest) => {
    const response = await $repository.memo.createMemo(payload)

    if ('memo' in response) {
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
  }
  return {
    createState,
    state,
    getMemo,
    createMemo,
    updateMemo,
    deleteMemo,
  }
}