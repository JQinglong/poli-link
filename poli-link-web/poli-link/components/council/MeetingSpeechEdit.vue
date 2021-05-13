<template>
  <v-card class="mx-auto">
    <v-card-title>
      {{ councilMeetingData.council.name }}
    </v-card-title>
    <v-card-subtitle>
      {{ councilMeetingData.name }}
    </v-card-subtitle>
    <v-card-text>
      <!-- 議事発言登録 -->
      <meeting-speech-add :council="councilMeetingData.council" :councilMeeting="councilMeetingData" />

      <v-list two-line>
        <template v-for="(item, index) in meetingSpeechList">
          <v-list-item :key="item.title">
            <v-list-item-avatar>
              <v-icon v-if="item.person" @click="$router.push(`/person/${item.person}/`)"> mdi-tooltip-account </v-icon>
            </v-list-item-avatar>

            <v-list-item-content>
              <v-list-item-title v-text="item.speaker"></v-list-item-title>

              <v-list-item style="white-space: pre-line" v-text="item.speech"></v-list-item>

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
    </v-card-text>
  </v-card>
</template>
<script lang="ts">
// 発言リスト
import { ref, toRefs, useFetch, defineComponent, reactive } from '@nuxtjs/composition-api';
import { useCouncilMeeting, useMeetingSpeech } from '@/compositions';
import MeetingSpeechAdd from './MeetingSpeechAdd.vue';

export default defineComponent({
  components: { MeetingSpeechAdd },
  name: 'MeetingSpeechEdit',
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
    const { state: meetingSpeechState,　getMeetingSpeechList } = useMeetingSpeech();

    const fetchData = async (offset = 0, councilMeetingId = '') => {
      await getCouncilMeeting(props.councilMeetingId);
      await getMeetingSpeechList({ offset: offset, council_meeting: councilMeetingId });
      // console.log('councilMeetingState', councilMeetingState);
    };

    // console.log('props.councilId', props.councilMeetingId);
    const { fetchState } = useFetch(() => fetchData(0, props.councilMeetingId));
    return {
      ...toRefs(councilMeetingState),
      ...toRefs(meetingSpeechState),
      // dispItem,
      // close,
    };
  },
});
</script>
