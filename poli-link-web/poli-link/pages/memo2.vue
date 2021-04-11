<template>
  <div class="container">
          <template v-if="fetchState.pending">
abcd
          </template>
      <template v-if="!fetchState.pending && !fetchState.error">

      <memo-list
        :memo-list="memoList"
      />
      </template>
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
  toRef,
  toRefs,
  useFetch,
  reactive,
  onMounted,
} from "@nuxtjs/composition-api"
import { RepositoryFactory } from "~/repositories/RepositoryFactory";
import MemoList from "@/components/memo/MemoList.vue";
import { useMemoList } from "@/compositions";

const MemoRepository = RepositoryFactory.get('memo')
interface StateData {
  id: number
  title: string
  memo: string
  isLoading: boolean,
  memos: []
}

export default defineComponent({
  head: {
    title: "Memo"
  },
  setup() {
    // const state = reactive<StateData>({
    //   id: 0,
    //   title: 'title0',
    //   memo: 'memo0',
    //   isLoading: false,
    //   memos: []
    // })

    // const fetch = async () => {
    //   state.isLoading = true
    //   console.log('state.isLoading', state.isLoading)
    //   const { data } = await MemoRepository.get()
    //   state.isLoading = false
    //   console.log('state.isLoading', state.isLoading)
    //   console.log('data', data)
    //   // state.memos = data
    // }

    const {
      state: memoListState,
      getMemoList
    } = useMemoList()

    const fetchData = async (offset = 0) => {
      await getMemoList({ offset })
      console.log('fetchData')
    }

    const { fetchState } = useFetch(() => fetchData())
    console.log('fetchState', fetchState)




    // onMounted(fetch) 

    return {
      // state,
      fetchState,
      fetchData,
      ...toRefs(memoListState)
    }

  }
})


</script>

<style>

</style>