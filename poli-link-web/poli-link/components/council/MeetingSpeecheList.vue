<template>
  <v-card class="mx-auto">
    <v-list two-line>
      <template v-for="(item, index) in meetingSpeechList">
        <v-list-item :key="item.title">
          <v-list-item-avatar>
            <v-icon v-if="item.person" @click="$router.push(`/person/${item.person}/`)"> mdi-tooltip-account </v-icon>
          </v-list-item-avatar>

          <v-list-item-content>
            <v-list-item-title v-text="item.speaker"></v-list-item-title>

            <v-list-item-subtitle class="text--primary" v-text="item.speech"></v-list-item-subtitle>

            <v-list-item-subtitle v-text="item.description"></v-list-item-subtitle>
          </v-list-item-content>

          <v-list-item-action>
            <v-list-item-action-text v-text="item.action"></v-list-item-action-text>

            <v-icon color="grey lighten-1"> mdi-share-variant </v-icon>
          </v-list-item-action>
        </v-list-item>

        <v-divider v-if="index < meetingSpeechList.length - 1" :key="index"></v-divider>
      </template>
    </v-list>
  </v-card>
</template>
<script lang="ts">
// 発言リスト
import { ref, toRefs, useFetch, defineComponent, reactive } from '@nuxtjs/composition-api';
import PersonInfo from '../person/PersonInfo.vue';
import { MeetingSpeechType } from '@/types';
import { useMeetingSpeech } from '@/compositions';

export default defineComponent({
  name: 'MeetingSpeecheList',
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
    const { state: meetingSpeechState, getMeetingSpeechList } = useMeetingSpeech();
    const defaultItem: MeetingSpeechType = {
      id: '',
      council: '',
      council_meeting: '',
      order: 0,
      speaker: '',
      person: '',
      speech: '',
      description: '',
    };
    const fetchData = async (offset = 0, council = '') => {
      // console.log('fetchData_council', council);
      await getMeetingSpeechList({ offset: offset, council: council });
      // console.log('councilMeetingState', councilMeetingState);
    };

    const { fetchState } = useFetch(() => fetchData(0, props.councilId));
    return {
      ...toRefs(meetingSpeechState),
      // dispItem,
      // close,
    };
  },
});
</script>
