<template>
  <div>
    <!-- 議事情報 -->
    <meeting-info :councilId="councilId" :councilMeetingId="councilMeetingId" />
  </div>
</template>

<script lang="ts">
import { defineComponent, useContext } from '@nuxtjs/composition-api';

import MeetingInfo from '~/components/council/MeetingInfo.vue';

export default defineComponent({
  components: { MeetingInfo },
  setup() {
    const {  params } = useContext();
    const { meetingId, slug } = params.value;
    // console.log('slug', slug) // slug がcouncilId
    console.log('params.value', params.value)

    return {
      councilId: slug,
      councilMeetingId: meetingId,
    };
  },
});
</script>