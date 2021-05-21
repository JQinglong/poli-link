<template>
  <div class="container">
    <person-admin />
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive } from "@nuxtjs/composition-api"
import PersonAdmin from "~/components/person/PersonAdmin.vue";

export default defineComponent({
  components: { PersonAdmin },
  head: {
    title: "構成員登録"
  },
  setup(_props, context) {

    return {  }
  }
})
</script>