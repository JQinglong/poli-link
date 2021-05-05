<template>
<div>
  <v-card dark flat>
    <v-card-title class="pa-2 blue-grey darken-1">
      <h3 class="title grow">{{personData.name}}</h3>
      <v-btn icon>
        <v-icon>mdi-share-variant</v-icon>
      </v-btn>
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
  </v-card>
</div>
</template>

<script lang="ts">
// 個人情報表示
import { PropType } from 'vue'

import PersonCareerList from './PersonCareerList.vue'
import PersonCounscilList from './PersonCounscilList.vue'
import PersonSpeechList from './PersonSpeechList.vue'

import { ref, toRefs, useFetch, defineComponent, reactive } from '@nuxtjs/composition-api';
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
  setup(props, { root }) {
    const { state: personState, getPerson } = usePerson();

    const state = reactive({
      people: [] as any[]
    })

    const externalLink = (url: string) =>{
      if (url) {
        window.open(url, '_blank')
      }
    }


    const fetchData = async () => {
      await getPerson(props.personId)
    }
    const { fetchState } = useFetch(() => fetchData());

    return {
      externalLink,
      ...toRefs(personState),
    };
  },
});


</script>

<style>


</style>