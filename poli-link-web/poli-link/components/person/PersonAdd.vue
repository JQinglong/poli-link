<template>
  <v-card>
    <v-card-text>
      <v-form lazy-validation>
        <v-text-field label="名前" dense outlined clearable v-model="form.name"> </v-text-field>
        <v-text-field label="かな" dense outlined clearable v-model="form.name_kana"> </v-text-field>
        <v-btn color="primary" @click="handleCreatePerson">新規人物登録</v-btn>
      </v-form>
    </v-card-text>
  </v-card>
</template>

<script lang="ts">
import { PropType } from 'vue';
import { Data, defineComponent, reactive, ref, toRef, toRefs, useFetch, onMounted } from '@nuxtjs/composition-api';
import { usePerson } from '@/compositions';

import { PersonType } from '@/types';

export default defineComponent({
  name: 'PersonAdd',
  setup(_, { root }) {
    const defaultItem: PersonType = {
      id: '',
      name: '',
      name_kana: '',
      name_e: '',
      url_official: '',
      url_wikipedia: '',
      url_twitter: '',
      url_facebook: '',
      url_youtube: '',
      career_summary: '',
    };

    const { state: councilState, createState: createPersonState, createPerson, getPersonList } = usePerson();

    const handleCreatePerson = async () => {
      try {
        console.log('createPersonState', createPersonState);
        const newPerson = await createPerson(createPersonState); //こことformを結びつける

        if (!newPerson) {
          return;
        }
      } catch (error) {
        console.log('error', error);
      }
    };

    const fetchData = async (offset = 0) => {
      await getPersonList({ offset });
      console.log('fetchData');
    };

    const { fetchState } = useFetch(() => fetchData());
    // console.log('fetchState', fetchState)

    return {
      fetchState,
      fetchData,
      ...toRefs(councilState),
      form: createPersonState,
      handleCreatePerson,
    };
  },
});
</script>

<style>
</style>