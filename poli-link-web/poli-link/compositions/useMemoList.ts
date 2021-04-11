import { reactive, ref, useContext } from '@nuxtjs/composition-api'
import { Memo } from "@/types";
import { MemoListRequest } from "@/api/memoRepository";

type State = {
  memoList: Memo[]
  memoCount: number
}

export default function useMemoList() {
  const { $repository } = useContext()

  const state = reactive<State>({
    memoList: [],
    memoCount: 0,
  })

  const getMemoList = async(payload: MemoListRequest = {}) => {
    // const {
    //   memos,
    //   memosCount,
    // } = await $repository.memo.getMemoList(payload)
    const memos= await $repository.memo.getMemoList(payload)

    console.log('memos', memos)
    
    state.memoList = memos
    state.memoCount = memos.length
  }

  return {
    state,
    getMemoList,
  }
}