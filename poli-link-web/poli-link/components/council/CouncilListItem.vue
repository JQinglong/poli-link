<template>
  <div>
    <v-card>
      <v-card-title v-text="council.name"></v-card-title>
      <v-card-text>[ {{ council.ministry.name }} ]</v-card-text>
      <v-card-text> {{ council.description }} </v-card-text>
      <v-card-actions>
        <v-btn class="ml-2 mt-5" outlined rounded small @click="$router.push(`/council/${council.id}/`)"> 詳細を見る </v-btn>
        <v-spacer></v-spacer>
        <v-btn icon>
          <v-icon>mdi-bookmark</v-icon>
        </v-btn>
      </v-card-actions>
      <v-list three-line v-if="council.news.length > 0" max-width="800">
        <v-subheader>関連ニュース</v-subheader>
        <template v-for="(item, index) in council.news">
          <v-list-item :key="index" @click="externalLink(item.url)">
            <v-list-item-avatar tile size="100">
              <v-img
                :src="item.image"
              ></v-img>
            </v-list-item-avatar>
            <v-list-item-content>
              <v-list-item-title v-html="item.title"></v-list-item-title>
              <v-list-item-subtitle v-html="item.description"></v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
        </template>
      </v-list>
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
    const externalLink = (url: string) => {
      if (url) {
        window.open(url, '_blank');
      }
    };
    return {
      externalLink
    };
  },
});
</script>
