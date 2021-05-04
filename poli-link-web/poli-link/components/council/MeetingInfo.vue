<template>
  <v-card class="mx-auto">
    <v-card dark>
      {{ councilMeetingData.council.name }}
      <v-card-title class="pa-2 blue-grey darken-1">
        <h3 class="title grow">{{ councilMeetingData.name }}</h3>
        <v-btn icon>
          <v-icon @click="externalLink(councilMeetingData.url_minute)">mdi-file-document-edit-outline</v-icon>
        </v-btn>
        <v-btn icon>
          <v-icon @click="externalLink(councilMeetingData.url_document)">mdi-file-chart-outline</v-icon>
        </v-btn>
        <v-btn icon>
          <v-icon>mdi-share-variant</v-icon>
        </v-btn>
      </v-card-title>
    </v-card>
    <v-card-text class="py-0">
      <v-card-title>日時</v-card-title>{{ councilMeetingData.meeting_date }}
      <v-card-title>場所</v-card-title>{{ councilMeetingData.place }}
      <!-- <v-card-title>出席者</v-card-title> -->
      <v-card-title>議事</v-card-title>
      <meeting-speeche-list :councilId="councilId" :councilMeetingId="councilMeetingId" />
      
    </v-card-text>
  </v-card>
</template>

<script lang="ts">
// 議事情報表示
import { ref, toRefs, useFetch, defineComponent, reactive } from '@nuxtjs/composition-api';
import { useCouncil, useCouncilMeeting } from '@/compositions';
import { CouncilType } from "@/types";

import CouncilMemberList from '~/components/council/CouncilMemberList.vue';
import MeetingSpeecheList from '~/components/council/MeetingSpeecheList.vue';


export default defineComponent({
  name: 'MeetingInfo',
  components: { CouncilMemberList, MeetingSpeecheList },
  props: {
    councilId: {
      type: String,
      required: true,
    },
    councilMeetingId: {
      type: String,
      required: true,
    },
  },
  setup(props, { root }) {
    const { state: councilMeetingState, getCouncilMeeting } = useCouncilMeeting();

    // const state = reactive({
    //   people: [] as any[]
    // })

    const externalLink = (url: string) =>{
      if (url) {
        window.open(url, '_blank')
      }
    }

    console.log('MeetingInfo props', props);

    const fetchData = async () => {
      await getCouncilMeeting(props.councilMeetingId)
    }
    const { fetchState } = useFetch(() => fetchData());

    return {
      externalLink,
      ...toRefs(councilMeetingState),
    };
  },
});


</script>

<style>


</style>