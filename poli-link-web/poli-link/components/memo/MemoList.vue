<template>
  <div v-if="memoList.length">
    メモだよ{{memoList.length}}
    <div
      v-for="(memo, memoIndex) in memoList"
      :key="memoIndex"
    >
      {{memo.title}}
      {{memo.memo}}
    </div>
  </div>
  <div v-else>No memos are here... yet.</div>
</template>

<script lang="ts">
import { PropType } from 'vue'
import { defineComponent, useContext } from '@nuxtjs/composition-api'
import { Memo } from '@/types'

export default defineComponent({
  name: 'MemoList',
  props: {
    memoList: {
      type: Array as () => PropType<Memo[]>,
      required: true,
    },
  },
})
</script>

<style>

</style>