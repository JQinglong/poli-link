<template>
  <div>
    <!-- 会議体情報 -->
    <council-info :councilId="slug" />
  </div>
</template>

<script lang="ts">
import { defineComponent, useContext } from '@nuxtjs/composition-api';

import CouncilInfo from '~/components/council/CouncilInfo.vue';

export default defineComponent({
  components: { CouncilInfo },
  setup() {
    const { app, params, query, route } = useContext()
    console.log('params.value', params.value)
    const { slug } = params.value

    return {
      slug,
    };
  },
});
</script>
