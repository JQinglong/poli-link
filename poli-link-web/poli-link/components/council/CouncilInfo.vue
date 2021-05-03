<template>
  <v-card class="mx-auto">
    <v-card dark>
      <v-card-title class="pa-2 blue-grey darken-1">
        <h3 class="title grow">{{ councilData.name }}</h3>
        <v-chip v-if="councilData.ministry">
          {{ councilData.ministry }}
        </v-chip>
        <v-btn icon>
          <v-icon @click="externalLink(councilData.url)">mdi-web</v-icon>
        </v-btn>
        <v-btn icon>
          <v-icon>mdi-bookmark</v-icon>
        </v-btn>
        <v-btn icon>
          <v-icon>mdi-share-variant</v-icon>
        </v-btn>
      </v-card-title>
    </v-card>
    <v-card-text class="py-0" style="white-space: pre-line;">
      {{ councilData.description }}
      <v-card-title>構成員</v-card-title>
      <council-member-list :councilId="councilId" />

      <v-card-title>開催状況</v-card-title>
      <council-meeting-list :councilId="councilId " />
    </v-card-text>
  </v-card>
</template>

<script lang="ts">
// 会議体情報表示
import { ref, toRefs, useFetch, defineComponent, reactive } from '@nuxtjs/composition-api';
import { useCouncil } from '@/compositions';
import { CouncilType } from '@/types';

import CouncilMeetingList from '~/components/council/CouncilMeetingList.vue';
import CouncilMemberList from '~/components/council/CouncilMemberList.vue';

export default defineComponent({
  name: 'CouncilInfo',
  components: { CouncilMemberList, CouncilMeetingList },
  props: {
    councilId: {
      type: String,
      required: true,
    },
  },
  setup(props, { root }) {
    const { state: councilState, getCouncil } = useCouncil();

    const externalLink = (url: string) => {
      if (url) {
        window.open(url, '_blank');
      }
    };

    const fetchData = async () => {
      await getCouncil(props.councilId);
    };
    const { fetchState } = useFetch(() => fetchData());

    return {
      externalLink,
      ...toRefs(councilState),
    };
  },
});
</script>

<style>
</style>