<template>
  <div>
    <council-edit
      :councilId="slug"
    />

  </div>
</template>

<script lang="ts">
import {
  defineComponent,
  useContext,
} from '@nuxtjs/composition-api'
import CouncilEdit from '~/components/council/CouncilEdit.vue';

export default defineComponent({
  components: { CouncilEdit },
  head: {
    title: "Council Edit"
  },
  setup() {
    const { params } = useContext()
    const { slug } = params.value

    return {
      slug,
    }
  },
})
</script>

<style>

</style>