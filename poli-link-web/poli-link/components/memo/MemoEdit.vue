<template>
  <v-card>
    <v-card-title> メモ の管理 </v-card-title>
    <v-card-subtitle>
      <v-form lazy-validation>
        <v-row>
          <v-col
            cols="12"
            sm="4"
          >
            <v-text-field
              label="タイトル"
              dense
              outlined
              clearable
              v-model="form.title"
              >
            </v-text-field>
          </v-col>
          <v-col
            cols="12"
            sm="4"
          >
          <v-text-field
            label="メモ内容"
            dense
            outlined
            clearable
            v-model="form.memo"
            >
          </v-text-field>
          </v-col>
          <v-col
            cols="12"
            sm="4"
          >
            <v-btn color="primary" @click="handleCreateMemo">新規</v-btn>
          </v-col>
        </v-row>
      </v-form>
    </v-card-subtitle>

    <v-card-text>
      <v-data-table
        :headers="headers"
        :items="memoList"
        dense
      >
        <template v-slot:[`item.actions`]="{ item }">
          <v-icon
            small
            class="mr-2"
            @click="editItem(item)"
          >
            mdi-pencil
          </v-icon>
          <v-icon
            small
            @click="deleteItem(item)"
          >
            mdi-delete
          </v-icon>
        </template>
      </v-data-table>
    </v-card-text>

  </v-card>
</template>

<script lang="ts">
import { PropType } from 'vue'
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
import { RepositoryFactory } from "~/repositories/RepositoryFactory";
import { useMemoList, useMemo } from "@/compositions";

const MemoRepository = RepositoryFactory.get('memo')
interface StateData {
  id: number
  title: string
  memo: string
  isLoading: boolean,
  memos: []
}


import { Memo } from '@/types'

export default defineComponent({
  name: 'MemoEdit',
  setup() {

    const headers = [
      {text: 'タイトル', value: 'title'},
      {text: 'メモ', value: 'memo'},
      {text: '', value: 'actions', sortable: false},
    ]

    const {
      state: memoListState,
      getMemoList,
    } = useMemoList()

    const {
      createState: createMemoState,
    } = useMemo()


    const { createMemo } = useMemo()

    const handleCreateMemo = async() => {
      try {
        console.log('createMemoState', createMemoState)
        const newMemo = await createMemo(createMemoState) //こことformを結びつける

        if (!newMemo) {
          return
        }

        console.log('Success')
      } catch (error) {
        console.log('error')
        // setError(error)
      }
    }

    const fetchData = async (offset = 0) => {
      await getMemoList({ offset })
      console.log('fetchData')
    }

    const { fetchState } = useFetch(() => fetchData())
    // console.log('fetchState', fetchState)

    return {
      headers,
      // state,
      fetchState,
      fetchData,
      ...toRefs(memoListState),
      form: createMemoState,
      handleCreateMemo,
    }
  }
  

  // props: {
  //   memoList: {
  //     type: Array as () => PropType<Memo[]>,
  //     required: true,
  //   },
  // },


})
</script>

<style>

</style>