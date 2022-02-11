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
    <v-card color="teal lighten-2" v-if="true">
      <v-row dense v-if="parentTree.length>0">
        <v-col>
          <v-list color="teal lighten-2">
            <v-list-item v-for="(item, i) in parentTree" :key="i">
          ┌
                {{item.parent.name}}
          <v-btn class="ml-2 mt-5" outlined rounded small @click="$router.push(`/council/${item.parent.id}/`)"> 詳細を見る </v-btn>
            </v-list-item>
          </v-list>
        </v-col>
      </v-row>
      <v-row dense v-if="childTree.length>0">
        <v-col>
          <v-list color="teal lighten-2">
            <v-list-item v-for="(item, i) in childTree" :key="i">
          └
                {{item.council.name}}
          <v-btn class="ml-2 mt-5" outlined rounded small @click="$router.push(`/council/${item.council.id}/`)"> 詳細を見る </v-btn>
            </v-list-item>
          </v-list>
        </v-col>
      </v-row>
    </v-card>
    <v-card-text class="py-0" style="white-space: pre-line;">
      {{ councilData.description }}
      <br />
      <v-alert
        border="left"
        colored-border
        color="teal"
        elevation="1"
        dense
      >構成員</v-alert>
      <council-member-list :councilId="councilId" />
      <br />
      <v-alert
        border="left"
        colored-border
        color="teal"
        elevation="1"
        dense
      >開催状況</v-alert>
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
import { ref, toRefs, useFetch, defineComponent, reactive, useContext, useMeta } from '@nuxtjs/composition-api';
import { useCouncil, useCouncilTree } from '@/compositions';
import { defaultCouncilTreeItem } from '@/compositions/util/const'
import { CouncilTreeType } from '@/types'

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
  head: {
  },
  setup(props, { root }) {
    const { route } = useContext();
    const { state: councilState, getCouncil } = useCouncil();
    const { state: councilTreeState, getCouncilTreeList } = useCouncilTree();

    const state = reactive({
      dialogEdit: false,
      editedItemUrl: '',
      childTree: [] as CouncilTreeType[],
      parentTree: [] as CouncilTreeType[],
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
      // console.log('CouncilInfo fetchData', council)
      await getCouncil(props.councilId);
      await getCouncilTreeList({ council: props.councilId });
      state.parentTree = councilTreeState.councilTreeList.filter(
        (item) => {
          return item.parent
        }
      )
      await getCouncilTreeList({ parent: props.councilId });
      state.childTree = councilTreeState.councilTreeList
    };
    const { fetchState } = useFetch(() => fetchData());

    const { title, meta } = useMeta()
    title.value = `会議体情報[${councilState.councilData.name}]`
    meta.value = [
      {
        hid: 'og:url',
        property: 'og:url',
        content: `https://polilink-web.netlify.app/council/${props.councilId}`,
      },
    ]

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