<template>
  <v-container fluid>
    {{ dispMessage }}
    <v-data-iterator
      :items="meetingSpeechList"
      :items-per-page.sync="itemsPerPage"
      :page.sync="page"
      :sort-by="sortBy.toLowerCase()"
      :sort-desc="sortDesc"
    >
      <template v-slot:default="props">
        <v-row>
          <v-col v-for="item in props.items" :key="item.name" cols="12" sm="6" md="4" lg="4">
            <v-card>
              <v-card-text> [{{ item.council.ministry.name }}] </v-card-text>
              <v-card-title class="subheading font-weight-bold">
                {{ item.council.name }}
              </v-card-title>
              <v-card-subtitle class="subheading font-weight-bold">
                {{ item.council_meeting.meeting_date }}
                {{ item.council_meeting.name }}
              </v-card-subtitle>
              <v-card-text>
                {{ item.speaker }}
              </v-card-text>
              <v-card-text>
                {{ item.speech }}
              </v-card-text>
              <v-divider></v-divider>
              <v-icon @click="$router.push(`/council/${item.council.id}/${item.council_meeting.id}/#${item.id}`)">mdi-information</v-icon>
            </v-card>
          </v-col>
        </v-row>
      </template>
    </v-data-iterator>
  </v-container>
</template>
<script lang="ts">
// 個人発言リスト
import { reactive, computed, toRefs, useFetch, useContext, defineComponent, watch } from '@nuxtjs/composition-api';

import { useFilterSpeech } from '@/compositions';

type SearchConditionsType = {
  speech: string;
  councilIds: string[];
  personIds: string[];
  ministryIds: string[];
};

export default defineComponent({
  name: 'SpeechList',

  props: {
    // councilIds: {
    //   type: Array as () => string[],
    //   required: false,
    // },
    // councilMeetingIds: {
    //   type: Array as () => string[],
    //   required: false,
    // },
    // personIds: {
    //   type: Array as () => string[],
    //   required: false,
    // },
    // ministryIds: {
    //   type: Array as () => string[],
    //   required: false,
    // },
    searchConditions: {
      type: Object as () => SearchConditionsType,
      required: true,
    },
  },
  setup(props, { root }) {
    const { state: meetingSpeechState, getFilterSpeechList } = useFilterSpeech();

    const itemsPerPageArray = [4, 8, 12];
    const state = reactive({
      search: '',
      speech: '',
      councilIds: [''],
      personIds: [''],
      ministryIds: [''],
      filter: {},
      sortDesc: false,
      dispMessage: '',
    });
    const page = 1;
    const itemsPerPage = 60;
    const sortBy = 'name';
    const keys = ['meeting_date', 'name'];

    const fetchData = async (limit = 1000, offset = 0, speech = '', councilIds = [''], councilMeetingIds = [''], personIds = [''], ministryIds = ['']) => {
      await getFilterSpeechList({
        limit: limit,
        offset: offset,
        speech: speech,
        council: councilIds,
        council_meeting: councilMeetingIds,
        person: personIds,
        council__ministry: ministryIds,
      });
      console.log('meetingSpeechState', meetingSpeechState)
    };

    watch(props, (p, prev) => {
      
      // console.log('p', p.ministryIds);
      // console.log('prev', prev.ministryIds);
      // const councilIds = p.councilIds?.map((element) => element.id);
      // const councilMeetingIds = p.councilMeetingIds?.map((element) => element.id);
      // const personIds = p.personIds?.map((element) => element.id);
      // const ministryIds = p.ministryIds?.map((element) => element.id);

      console.log('speech', p.searchConditions.speech);
      if (p.searchConditions.speech != '' || p.searchConditions.councilIds[0] != '' || p.searchConditions.personIds[0] != '' || p.searchConditions.ministryIds[0] != '') {
        state.dispMessage = '検索結果';
        state.speech = p.searchConditions.speech
        state.councilIds = p.searchConditions.councilIds
        state.personIds = p.searchConditions.personIds
        state.ministryIds = p.searchConditions.ministryIds
        // useFetch(() => fetchData(0, props.searchConditions.councilIds, [], props.searchConditions.personIds, props.searchConditions.ministryIds));
        fetchData(1000, 0, state.speech, state.councilIds, [], state.personIds, state.ministryIds)
      } else {
        state.dispMessage = '条件指定なし';
      }


    });

    // // propsはそのまま使えない　idだけの配列にしないと
    // // const personIds = []
    // // props.councilIds?.forEach(element => personIds.push(element.id))
    // const councilIds = props.councilIds?.map((element) => element.id);
    // const councilMeetingIds = props.councilMeetingIds?.map((element) => element.id);
    // const personIds = props.personIds?.map((element) => element.id);
    // const ministryIds = props.ministryIds?.map((element) => element.id);
    // console.log('councilIds', props.searchConditions.councilIds);
    // console.log('personIds', props.searchConditions.personIds);
    // console.log('ministryIds', props.searchConditions.ministryIds);

    if (state.speech != '' || state.councilIds[0] != '' || state.personIds[0] != '' || state.ministryIds[0] != '') {
      state.dispMessage = '[検索結果]';
      const { fetchState } = useFetch(() => fetchData(0, 1000, state.speech, state.councilIds, [], state.personIds, state.ministryIds));
    } else {
      state.dispMessage = '条件指定なし';
    }

    return {
      itemsPerPageArray,
      ...toRefs(state),
      page,
      itemsPerPage,
      sortBy,
      keys,
      ...toRefs(meetingSpeechState),
    };
  },
});
</script>