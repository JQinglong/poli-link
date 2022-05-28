<template>
  <v-card class="mx-auto">
    <v-card dark>
      {{ councilMeetingData.council.name }}
      <v-card-title class="pa-2 blue-grey darken-1">
        <h3 class="title grow">{{ councilMeetingData.name }}</h3>
        <v-tooltip bottom>
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              icon
              v-bind="attrs"
              v-on="on"
            >
              <v-icon @click="externalLink(councilMeetingData.url_minute)">mdi-file-document-edit-outline</v-icon>
            </v-btn>
          </template>
          <span>議事録</span>
        </v-tooltip>
        <v-tooltip bottom>
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              icon
              v-bind="attrs"
              v-on="on"
            >
              <v-icon @click="externalLink(councilMeetingData.url_document)">mdi-file-chart-outline</v-icon>
            </v-btn>
          </template>
          <span>資料</span>
        </v-tooltip>
        <v-btn icon>
          <v-icon @click="editItem" color="grey lighten-1"> mdi-share-variant </v-icon>
        </v-btn>
      </v-card-title>
    </v-card>
    <v-card-text class="py-0">
      <v-card-title>日時</v-card-title>{{ councilMeetingData.meeting_date }}
      <v-card-title>場所</v-card-title>{{ councilMeetingData.place }}
      <!-- <v-card-title>出席者</v-card-title> -->
      <v-card-title>議事</v-card-title>
      <meeting-speech-list :councilId="councilId" :councilMeetingId="councilMeetingId" />
      
    </v-card-text>

    <v-dialog v-model="dialogEdit" max-width="500px">
      <v-card>
        <v-card-title class="headline">この議事へのリンク</v-card-title>
        <v-text-field v-model="editedItemUrl" append-icon="mdi-link-variant" filled type="text" @click:append="copyText(editedItemUrl)" onfocus="this.select();"></v-text-field>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="closeDelete">閉じる</v-btn>
          <v-spacer></v-spacer>
        </v-card-actions>
      </v-card>
    </v-dialog>

  </v-card>
</template>

<script lang="ts">
// 議事情報表示
import { ref, toRefs, useFetch, defineComponent, reactive, useContext, useMeta } from '@nuxtjs/composition-api';
import { useCouncil, useCouncilMeeting } from '@/compositions';
import { CouncilType } from "@/types";

import CouncilMemberList from '~/components/council/CouncilMemberList.vue';
import MeetingSpeechList from '~/components/council/MeetingSpeechList.vue';


export default defineComponent({
  name: 'MeetingInfo',
  components: { CouncilMemberList, MeetingSpeechList },
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
  head: {
  },
  setup(props, { root }) {
    const { state: councilMeetingState, getCouncilMeeting } = useCouncilMeeting();
    const { route } = useContext();

    const state = reactive({
      dialogEdit: false,
      editedItemUrl: '',
    });
    const editItem = () => {
      state.editedItemUrl = `${process.env.WEB_URL}${route.value.path}`;
      state.dialogEdit = true;
    };
    const closeDelete = () => {
      state.dialogEdit = false;
      root.$nextTick(() => {
        state.editedItemUrl = '';
      });
    };
    const copyText = (text: string) => {
      console.log('copy text', text)
      if(navigator.clipboard){
          navigator.clipboard.writeText(text);
      }
    };

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

    const { title, meta } = useMeta()
    title.value = `議事[${councilMeetingState.councilMeetingData.name}]`
    meta.value = [
      {
        hid: 'og:url',
        property: 'og:url',
        content: `https://polilink-web.netlify.app/council/${props.councilId}/${props.councilMeetingId}`,
      },
    ]

    return {
      externalLink,
      ...toRefs(councilMeetingState),
      ...toRefs(state),
      editItem,
      closeDelete,
      copyText,
    };
  },
});


</script>

<style>


</style>