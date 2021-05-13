<template>
  <div>
    <meeting-speech-edit :councilId="councilId" :councilMeetingId="councilMeetingId" />
  </div>
</template>

<script lang="ts">
import { defineComponent, useContext } from '@nuxtjs/composition-api';
import MeetingSpeechEdit from '~/components/council/MeetingSpeechEdit.vue';
export default defineComponent({
  components: { MeetingSpeechEdit },
  setup() {
    const {  params } = useContext();
    const { meetingId, slug } = params.value;

    return {
      councilId: slug,
      councilMeetingId: meetingId,
    };
  },
});
</script>