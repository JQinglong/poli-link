<template>
  <div class="container">
    <p>{{ memos }}</p>
  </div>
</template>

<script>
import { RepositoryFactory } from "~/repositories/RepositoryFactory";
const MemoRepository = RepositoryFactory.get('memo')

export default {
  name: "name",
  // components: { }
  data() {
    return {
      isLoading: false,
      memos: [],
    }
  },
  created () {
    this.fetch()
  },
  methods: {
    async fetch () {
      this.isLoading = true
      const { data } = await MemoRepository.get()
      this.isLoading = false
      this.memos = data;
    }
  }
}
</script>

<style>

</style>