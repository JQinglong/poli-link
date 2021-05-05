<template>
  <div class="container">
    <memo-edit
    />
    
    <!-- <p>{{ info.text }}</p>
    <button @click="onClicked">ボタン</button>

      <input v-model="state.memo" placeholder="メモを入力してください">
      <button @click="addMemo">追加</button>
      <br>
      <li v-for="(memo, index) in memolist" :key="index">
        {{ memo }}
        <button @click="removeMemo(index)">delete</button>
      </li> -->
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, computed } from "@nuxtjs/composition-api"
// import { MemoStore } from "~/store";
import MemoEdit from "@/components/memo/MemoEdit.vue";

// type Memo = {
//   id: number
//   title: string
//   memo: string
// }
interface Memo {
  id: number
  title: string
  memo: string
}

export default defineComponent({
  head: {
    title: "Memo"
  },
  setup(_props, context) {
    // const memos = ref<Memo[]>([])
    const state = reactive<Memo>({
      id: 0,
      title: 'title0',
      memo: 'memo0'
    })

    // const memos = MemoStore

    // const memolist = computed(() => memos.getMemos)

    // const store = MemoStore
    // store.actions.getData(context.root.$repositories)


    // const memolist = computed(() => memos.getData)

    // const addMemo = () => {
    //   console.log(state.title)
    //   memos.add(state.memo)
    //   state.memo = ''
    // }

    // const removeMemo = (index: number) => {
    //   memos.remove(index)
    // }

    
    // watch(async () => {
    //   memos.value = await context.root.$axios.$get('http://localhost:8000/api/memo/')
    // })


    const info = reactive({
      text: ""
    })

    /*
      created() {
        this.text = "まだ押されていません"
      }
    */
    info.text = "まだ押されていません"

    /*
      methods: {
        onClicked() {
          this.text = "押されたよ！"
        }
      }
    */
    const onClicked = () => {
      info.text = "押されたよ！"
    }

    return { info, onClicked, state,
    //  memos, memolist, addMemo, removeMemo
      }
  }
})
</script>