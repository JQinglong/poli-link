<template>
  <div class="container">
      <input v-model="state.memo" placeholder="メモを入力してください">
      <br>
      <li v-for="(memo, index) in state.memos" :key="index">
        {{ memo }}
      </li>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, onMounted } from "@nuxtjs/composition-api"
import { RepositoryFactory } from "~/repositories/RepositoryFactory";
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
  setup(_props, context) {
    const state = reactive<StateData>({
      id: 0,
      title: 'title0',
      memo: 'memo0',
      isLoading: false,
      memos: []
    })

    const fetch = async () => {
      state.isLoading = true
      console.log('state.isLoading', state.isLoading)
      const { data } = await MemoRepository.get()
      state.isLoading = false
      console.log('state.isLoading', state.isLoading)
      console.log('data', data)
      state.memos = data
    }

    onMounted(fetch) 

    return {state}

  }
})


</script>

<style>

</style>