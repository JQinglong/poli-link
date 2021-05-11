<template>
  <div class="container">
    <council-edit/>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive } from "@nuxtjs/composition-api"
import CouncilEdit from "~/components/council/CouncilEdit.vue";

export default defineComponent({
  components: { CouncilEdit },
  head: {
    title: "会議体登録"
  },
  setup(_props, context) {

    return {  }
  }
})
</script>