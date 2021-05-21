<template>
  <v-card class="mx-auto">
    <v-card dark>
      <v-card-title class="pa-2 blue-grey darken-1">
        <h3 class="title grow">{{ councilData.name }}</h3>
        <v-chip v-if="councilData.ministry">
          {{ councilData.ministry.name }}
        </v-chip>
        <v-btn icon>
          <v-icon @click="externalLink(councilData.url)">mdi-web</v-icon>
        </v-btn>
        <v-btn icon>
          <v-icon>mdi-bookmark</v-icon>
        </v-btn>
        <v-btn icon>
          <v-icon @click="editItem" color="grey lighten-1"> mdi-share-variant </v-icon>
        </v-btn>
      </v-card-title>
    </v-card>
    <v-card-text class="py-0" style="white-space: pre-line;">
      {{ councilData.description }}
      <v-card-title>構成員</v-card-title>
      <council-member-list :councilId="councilId" />

      <v-card-title>開催状況</v-card-title>
      <council-meeting-list :councilId="councilId " />
    </v-card-text>

    <v-dialog v-model="dialogEdit" max-width="500px">
      <v-card>
        <v-card-title class="headline">この会議体へのリンク</v-card-title>
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
// 会議体情報表示
import { ref, toRefs, useFetch, defineComponent, reactive, useContext } from '@nuxtjs/composition-api';
import { useCouncil } from '@/compositions';
import { CouncilType } from '@/types';

import CouncilMeetingList from '~/components/council/CouncilMeetingList.vue';
import CouncilMemberList from '~/components/council/CouncilMemberList.vue';

export default defineComponent({
  name: 'CouncilInfo',
  components: { CouncilMemberList, CouncilMeetingList },
  props: {
    councilId: {
      type: String,
      required: true,
    },
  },
  setup(props, { root }) {
    const { route } = useContext();
    const { state: councilState, getCouncil } = useCouncil();

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

    const externalLink = (url: string) => {
      if (url) {
        window.open(url, '_blank');
      }
    };

    const fetchData = async () => {
      await getCouncil(props.councilId);
    };
    const { fetchState } = useFetch(() => fetchData());

    return {
      externalLink,
      ...toRefs(councilState),
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