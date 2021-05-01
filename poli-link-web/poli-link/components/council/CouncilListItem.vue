<template>
  <div>
    <v-card>
      <v-card-title v-text="council.name"></v-card-title>
      <v-card-text> {{ council.description }} </v-card-text>

      <v-card-actions>
        <v-btn class="ml-2 mt-5" outlined rounded small @click="$router.push(`/council/${council.id}/`)"> 詳細を見る </v-btn>
        <v-spacer></v-spacer>
        <v-btn icon>
          <v-icon>mdi-bookmark</v-icon>
        </v-btn>

      </v-card-actions>
    </v-card>
  </div>
</template>

<script lang="ts">
import { PropType } from 'vue'
import { defineComponent } from '@nuxtjs/composition-api';
import { CouncilType } from "@/types";
export default defineComponent({
  name: 'CouncilListItem',
  props: {
    council: {
      type: Object as () => PropType<CouncilType>,
      required: true,
    },
  },
  setup(props, { root }) {
    return {

    };
  },
});
</script>
