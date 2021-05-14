<template>
  <div>
    <v-icon small class="mr-2" @click="$router.push(`/admin/council/`)"> mdi-arrow-left-circle </v-icon>
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