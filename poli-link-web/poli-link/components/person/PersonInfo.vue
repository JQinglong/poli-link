<template>
<div>
  <v-card dark flat>
    <v-card-title class="pa-2 blue-grey darken-1">
      <h3 class="title grow">{{personData.name}}</h3>
      <v-icon @click="editItem" color="grey lighten-1"> mdi-share-variant </v-icon>
    </v-card-title>
  </v-card>
  <v-card>
      <v-btn icon>
        <v-icon @click="externalLink(personData.url_official)">mdi-web</v-icon>
      </v-btn>
      <v-btn icon>
        <v-icon @click="externalLink(personData.url_wikipedia)">mdi-wikipedia</v-icon>
      </v-btn>
      <v-btn icon>
        <v-icon @click="externalLink(personData.url_twitter)">mdi-twitter</v-icon>
      </v-btn>
      <v-btn icon>
        <v-icon @click="externalLink(personData.url_facebook)">mdi-facebook</v-icon>
      </v-btn>
      <v-btn icon>
        <v-icon @click="externalLink(personData.url_youtube)">mdi-youtube</v-icon>
      </v-btn>


      <v-expansion-panels>
        <v-expansion-panel>
          <v-expansion-panel-header>
            キャリア
          </v-expansion-panel-header>
          <v-expansion-panel-content style="white-space: pre-line;">
            <!-- <person-career-list :personId="personData.id" /> -->
            {{personData.career_summary}}
          </v-expansion-panel-content>
        </v-expansion-panel>
        <v-expansion-panel>
          <v-expansion-panel-header>
            参画している会議体
          </v-expansion-panel-header>
          <v-expansion-panel-content>
            <person-counscil-list :personId="personId" />
          </v-expansion-panel-content>
        </v-expansion-panel>
      </v-expansion-panels>
  
    <v-card-title>
      発言集
    </v-card-title>
    <person-speech-list :personId="personId" />

    <v-dialog v-model="dialogEdit" max-width="500px">
      <v-card>
        <v-card-title class="headline">この人物へのリンク</v-card-title>
        <v-text-field v-model="editedItemUrl" append-icon="mdi-link-variant" filled type="text" @click:append="copyText(editedItemUrl)" onfocus="this.select();"></v-text-field>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="closeDelete">閉じる</v-btn>
          <v-spacer></v-spacer>
        </v-card-actions>
      </v-card>
    </v-dialog>

  </v-card>
</div>
</template>

<script lang="ts">
// 個人情報表示
import { PropType } from 'vue'

import PersonCareerList from './PersonCareerList.vue'
import PersonCounscilList from './PersonCounscilList.vue'
import PersonSpeechList from './PersonSpeechList.vue'

import { ref, toRefs, useFetch, defineComponent, reactive, useContext, useMeta } from '@nuxtjs/composition-api';
import { usePerson } from '@/compositions';
import { PersonType } from "@/types";

export default defineComponent({
  name: 'PersonInfo',
  components: { PersonCareerList, PersonCounscilList, PersonSpeechList },
  props: {
    personId: {
      type: String,
      required: true,
    },
  },
  head: {
  },
  setup(props, { root }) {
    const { state: personState, getPerson } = usePerson();
    const { route } = useContext();

    const state = reactive({
      people: [] as any[],
      dialogEdit: false,
      editedItemUrl: '',
    })

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


    const fetchData = async () => {
      await getPerson(props.personId)
    }
    const { fetchState } = useFetch(() => fetchData());

    const { title, meta } = useMeta()
    title.value = `個人情報[${personState.personData.name}]`
    meta.value = [
      {
        hid: 'og:url',
        property: 'og:url',
        content: `https://polilink-web.netlify.app/person/${props.personId}`,
      },
    ]

    return {
      externalLink,
      ...toRefs(personState),
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