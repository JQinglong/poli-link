<template>
  <div>
    <v-timeline align-top dense>
      <v-timeline-item v-for="(item, i) in councilMeetingList" :key="i" color="teal lighten-3" small>
        <v-row class="pt-1">
          <v-col>
            <strong>{{ item.meeting_date }}</strong>

            <strong>{{ item.name }}</strong>
            <v-btn class="ma-2" outlined color="indigo" @click="$router.push(`/council/${item.council.id}/${item.id}/`)"> 議事 </v-btn>
          </v-col>
        </v-row>
      </v-timeline-item>
    </v-timeline>
  </div>
</template>

<script lang="ts">
// 議事一覧（年月）
import { ref, toRefs, useFetch, defineComponent, reactive } from '@nuxtjs/composition-api';
import PersonInfo from '../person/PersonInfo.vue';
import { useCouncilMeeting } from '@/compositions';

export default defineComponent({
  name: 'CouncilMeetingListYM',
  components: { PersonInfo },
  props: {
    councilId: {
      type: String,
      required: false,
    },
  },
  setup(props, { root }) {
    const { state: councilMeetingState, getCouncilMeetingList } = useCouncilMeeting();

    const fetchData = async (offset = 0) => {
      // console.log('CouncilMeetingList fetchData_council', council);
      await getCouncilMeetingList({ offset: offset, limit: 10, ordering: '-meeting_date' });

      // console.log('councilMeetingState', councilMeetingState);
    };

    const { fetchState } = useFetch(() => fetchData(0));
    return {
      ...toRefs(councilMeetingState),
      // dispItem,
      // close,
    };
  },
});
</script>