<template>
  <div class="container">
    <council-admin/>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive } from "@nuxtjs/composition-api"
import CouncilAdmin from "~/components/council/CouncilAdmin.vue";

export default defineComponent({
  components: { CouncilAdmin },
  head: {
    title: "会議体登録"
  },
  setup(_props, context) {

    return {  }
  }
})
</script>