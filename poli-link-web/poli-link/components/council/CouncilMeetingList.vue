<template>
<div>
        <v-timeline
        align-top
        dense
      >
        <v-timeline-item
          v-for="(item, i) in councilMeetingList"
          :key="i"
          color="teal lighten-3"
          small
        >
          <v-row class="pt-1">
            <v-col>
              <strong>2020/7/6</strong>

              <strong>{{ item.name }}</strong>
              <v-btn
                class="ma-2"
                outlined
                color="indigo"
                @click="$router.push(`/council/111/1234/`)"
              >
                議事
              </v-btn>
            </v-col>
          </v-row>
        </v-timeline-item>

      </v-timeline>
</div>
</template>

<script lang="ts">
  // 会議一覧
import { ref, toRefs, useFetch, defineComponent, reactive } from '@nuxtjs/composition-api';
import PersonInfo from '../person/PersonInfo.vue';
import { CouncilMeetingType } from '@/types'
import { useCouncilMeeting} from '@/compositions';

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

    const defaultItem:CouncilMeetingType = {
        id: '',
        name: '',
        place: '',
        order: 0,
        meeting_date: new Date(),
        council: '',
      }
    const state = reactive({
      dialog: false,
      editedItem: defaultItem,
    })

    const fetchData = async (offset = 0, council = '') => {
      console.log('council', council)
      await getCouncilMeetingList({ offset: offset, council: council  });
    };

    const { fetchState } = useFetch(() => fetchData(0, props.councilId));
    return {
      ...toRefs(state),
      ...toRefs(councilMeetingState),
      // dispItem,
      // close,
    };
  },
});
</script>