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
// 議事一覧
import { ref, toRefs, useFetch, defineComponent, reactive } from '@nuxtjs/composition-api';
import PersonInfo from '../person/PersonInfo.vue';
import { CouncilMeetingType } from '@/types';
import { useCouncilMeeting } from '@/compositions';

export default defineComponent({
  name: 'CouncilMeetingList',
  components: { PersonInfo },
  props: {
    councilId: {
      type: String,
      required: true,
    },
  },
  setup(props, { root }) {
    const { state: councilMeetingState, getCouncilMeetingList } = useCouncilMeeting();
    const defaultItem: CouncilMeetingType = {
      id: '',
      name: '',
      place: '',
      order: 0,
      meeting_date: new Date(),
      url_minute: '',
      url_document: '',
      council: '',
    };
    const fetchData = async (offset = 0, council = '') => {
      // console.log('fetchData_council', council);
      await getCouncilMeetingList({ offset: offset, council: council });
      // console.log('councilMeetingState', councilMeetingState);
    };

    const { fetchState } = useFetch(() => fetchData(0, props.councilId));
    return {
      ...toRefs(councilMeetingState),
      // dispItem,
      // close,
    };
  },
});
</script>