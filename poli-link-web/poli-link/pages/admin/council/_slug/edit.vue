<template>
  <div>
    <council-member-edit
      :councilId="slug"
    />

  </div>
</template>

<script lang="ts">
import {
  defineComponent,
  useContext,
} from '@nuxtjs/composition-api'
import CouncilMemberEdit from '~/components/council/CouncilMemberEdit.vue';

export default defineComponent({
  components: { CouncilMemberEdit },
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