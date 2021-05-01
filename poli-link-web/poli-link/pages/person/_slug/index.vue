<template>
  <div>
    <person-info :personId="slug" />
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
  useContext,
} from '@nuxtjs/composition-api'

import PersonInfo from '~/components/person/PersonInfo.vue';

export default defineComponent({
  components: { PersonInfo },
  setup() {
    const { app, params, query } = useContext()
    const { slug } = params.value

    return {
      slug,
    }
  },
})
</script>