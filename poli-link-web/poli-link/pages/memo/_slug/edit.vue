<template>
  <div>
    memo edit
    <memo-edit-form
      :memoId="slug"
    />

  </div>
</template>

<script lang="ts">
import {
  defineComponent,
  useContext,
} from '@nuxtjs/composition-api'
import MemoList from '~/components/memo/MemoList.vue';
import MemoEditForm from '~/components/memo/MemoEditForm.vue';

export default defineComponent({
  setup() {
    const { app, params, query } = useContext()
    const { slug } = params.value

    console.log('slug', slug)

    return {
      slug,
    }
  },
})
</script>

<style>

</style>