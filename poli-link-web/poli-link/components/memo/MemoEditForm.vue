<template>
  <v-form
    lazy-validation
  >
    {{ form.memoData.id }}
    <v-text-field
      v-model="form.memoData.title"
      label="タイトル"
      required
    ></v-text-field>

    <v-text-field
      v-model="form.memoData.memo"
      label="メモ"
      required
    ></v-text-field>
    <v-btn
      color="success"
      class="mr-4"
      @click="handleUpdateMemo"
    >
      更新
    </v-btn>
    <v-btn @click="$router.push('/memo/')">戻る</v-btn>
  </v-form>
</template>

<script lang="ts">
import {
  Data,
  defineComponent,
  reactive,
  ref,
  toRef,
  toRefs,
  useFetch,
  onMounted,
} from "@nuxtjs/composition-api"
// import { RepositoryFactory } from "~/repositories/RepositoryFactory";
import { useMemo } from "@/compositions";
import { Memo } from '@/types'

// const MemoRepository = RepositoryFactory.get('memo')

export default defineComponent({
  name: 'MemoEditForm',
  props: {
    memoId: {
      type: String,
      required: true,
    },
  },
  setup(props, { root })  {
    const {
      state: memoState,
      updateMemo,
      getMemo,
    } = useMemo()

    const handleUpdateMemo = async() => {
      try {
        console.log('handleUpdateMemo', memoState)
        await updateMemo({id: memoState.memoData.id, payload: {"title": memoState.memoData.title, "memo": memoState.memoData.memo}}) 

        return

      } catch (error) {
        console.log('error')
        // setError(error)
      }
    }

    const fetchData = async () => {
      await getMemo(Number(props.memoId))
    }

    const { fetchState } = useFetch(() => fetchData())

    return {
      form: memoState,
      handleUpdateMemo,
    }
  }

})

</script>

<style>

</style>