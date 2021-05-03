<template>
  <v-card class="mx-auto">
    <v-card dark>
      {{ councilData }}
      <v-card-title class="pa-2 blue-grey darken-1">
        <h3 class="title grow">新型コロナウイルス感染症対策分科会　第1回会議</h3>
        <v-btn icon>
          <v-icon>mdi-web</v-icon>
        </v-btn>
        <v-btn icon>
          <v-icon>mdi-share-variant</v-icon>
        </v-btn>
      </v-card-title>
    </v-card>
    <v-card-text class="py-0">
      <v-card-title>日時</v-card-title>
      <v-card-title>場所</v-card-title>
      <v-card-title>出席者</v-card-title>
      <council-member-list />

      <v-card-title>議事</v-card-title>

      <minute-list />
    </v-card-text>
  </v-card>
</template>

<script lang="ts">
// 議事情報表示
import { ref, toRefs, useFetch, defineComponent, reactive } from '@nuxtjs/composition-api';
import { useCouncil } from '@/compositions';
import { CouncilType } from "@/types";

import CouncilMemberList from '~/components/council/CouncilMemberList.vue';
import MinuteList from '~/components/council/MinuteList.vue';


export default defineComponent({
  name: 'MeetingInfo',
  components: { CouncilMemberList, MinuteList },
  props: {
    councilId: {
      type: String,
      required: true,
    },
  },
  setup(props, { root }) {
    const { state: councilState, getCouncil } = useCouncil();

    // const state = reactive({
    //   people: [] as any[]
    // })

    const externalLink = (url: string) =>{
      if (url) {
        window.open(url, '_blank')
      }
    }


    const fetchData = async () => {
      await getCouncil(props.councilId)
    }
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