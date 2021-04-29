<template>
  <div>
    <v-card dark>
      <v-card-title class="pa-2 blue-grey darken-1">
        <h3 class="title grow">構成員検索</h3>
      </v-card-title>
    </v-card>
    <!-- 構成員リスト -->
    <person-list />
  </div>
</template>

<script lang="ts">
import {
  ref,
  defineComponent,
} from '@nuxtjs/composition-api'
import PersonList from '~/components/person/PersonList.vue'

export default defineComponent({
  components: { PersonList },
  setup() {


    return {
    }
  }
})
</script>
