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
              @click="$router.push(`/memo/${item.id}/edit`)"
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

        <v-dialog v-model="dialogDelete" max-width="500px">
          <v-card>
            <v-card-title class="headline">削除しますか?</v-card-title>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="closeDelete">Cancel</v-btn>
              <v-btn color="blue darken-1" text @click="deleteItemConfirm">OK</v-btn>
              <v-spacer></v-spacer>
            </v-card-actions>
          </v-card>
        </v-dialog>

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
import { useMemo } from "@/compositions";

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
  setup(_, { root })  {

    const headers = [
      {text: 'タイトル', value: 'title'},
      {text: 'メモ', value: 'memo'},
      {text: '', value: 'actions', sortable: false},
    ]

    const state = reactive<Data>({
      dialogDelete: false,
      editedIndex: -1,
      editedItem: {
        id: -1,
        title: '',
        meeo: '',
      },
      defaultItem: {
        id: -1,
        title: '',
        meeo: '',
      },
    })

    // const {
    //   state: memoListState,
    //   getMemoList,
    // } = useMemoList()

    const {
      state: memoState,
      createState: createMemoState,
      createMemo,
      deleteMemo,
      getMemoList,
    } = useMemo()

    const handleCreateMemo = async() => {
      try {
        console.log('createMemoState', createMemoState)
        const newMemo = await createMemo(createMemoState) //こことformを結びつける

        if (!newMemo) {
          return
        }

      } catch (error) {
        console.log('error', error)
        // setError(error)
      }
    }

    const deleteItem = (item: Memo) =>{
      state.editedIndex = item.id
      state.editedItem = item
      console.log('item', state.editedItem)
      state.dialogDelete = true
    }

    const closeDelete = () =>{
      state.dialogDelete = false
      root.$nextTick(() => {
        state.editedItem = Object.assign({}, state.defaultItem)
        state.editedIndex = -1
      })
    }

    const deleteItemConfirm = async() =>{
      console.log('deleteItemConfirm', state.editedItem)
      const memoid:number = state.editedItem.id
      deleteMemo(memoid)
      // fetchData()
      closeDelete()
    }

    const fetchData = async (offset = 0) => {
      await getMemoList({ offset })
      console.log('fetchData')
    }

    const { fetchState } = useFetch(() => fetchData())
    // console.log('fetchState', fetchState)

    return {
      headers,
      ...toRefs(state),
      fetchState,
      fetchData,
      ...toRefs(memoState),
      form: createMemoState,
      handleCreateMemo,
      deleteItem,
      closeDelete,
      deleteItemConfirm,
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