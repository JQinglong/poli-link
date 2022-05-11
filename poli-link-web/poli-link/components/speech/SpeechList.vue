<template>
  <v-container fluid>
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
              <v-card-text>
                [{{ item.council.ministry.name }}]
              </v-card-text>
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
import { reactive, computed, toRefs, useFetch, useContext, defineComponent } from '@nuxtjs/composition-api';

import { useMeetingSpeech } from '@/compositions';

export default defineComponent({
  name: 'SpeechList',

  props: {
  },
  setup(props, { root }) {
    const { state: meetingSpeechState, getMeetingSpeechList } = useMeetingSpeech();

    const itemsPerPageArray = [4, 8, 12];
    const state = reactive({
      search: '',
      filter: {},
      sortDesc: false,
      words: [
        { name: "発言", value: "100" },
        { name: "Wordcloud", value: "20" },
        { name: "議事録", value: "30" },
        { name: "政府会議体", value: "40" },
      ],
    });
    const page = 1;
    const itemsPerPage = 60;
    const sortBy = 'name';
    const keys = [ 'meeting_date', 'name'];

    const fetchData = async (offset = 0, personId = '') => {
      console.log('personId', personId);
      await getMeetingSpeechList({ offset: offset, person: personId });

    };

    const { fetchState } = useFetch(() => fetchData(0, props.personId));

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