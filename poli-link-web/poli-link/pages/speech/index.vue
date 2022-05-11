<template>
  <div>
    <v-card dark>
      <v-card-title class="pa-2 blue-grey darken-1">
        <h3 class="title grow">議事検索</h3>
      </v-card-title>
      <v-expansion-panels>
        <v-expansion-panel>
          <v-expansion-panel-header> 検索条件 </v-expansion-panel-header>
          <v-expansion-panel-content style="white-space: pre-line">
            <v-card dense color="teal lighten-2" class="mb-1">
              <v-card-text>
                <v-text-field dense v-model="searchAll" clearable flat solo-inverted hide-details label="全体検索"></v-text-field>
                <v-row dense>
                  <v-col cols="3">
                    <!-- 人物リスト -->
                    <v-data-table
                      :headers="personHeaders"
                      :items="personList"
                      :search="searchPerson"
                      v-model="selectedPerson"
                      show-select
                      class="elevation-1"
                      hide-default-header
                    >
                      <template v-slot:top>
                        <v-text-field
                          dense
                          v-model="searchPerson"
                          clearable
                          flat
                          solo-inverted
                          hide-details
                          prepend-inner-icon="mdi-magnify"
                          label="構成員の名前・かなで絞り込み"
                        ></v-text-field>
                      </template>
                    </v-data-table>
                  </v-col>
                  <v-col cols="2">
                    <!-- 省庁リスト -->
                    <v-data-table
                      :headers="headers"
                      :items="ministryList"
                      :search="searchMinistry"
                      v-model="selectedMinistry"
                      show-select
                      class="elevation-1"
                      hide-default-header
                    >
                      <template v-slot:top>
                        <v-text-field
                          dense
                          v-model="searchMinistry"
                          clearable
                          flat
                          solo-inverted
                          hide-details
                          prepend-inner-icon="mdi-magnify"
                          label="省庁名で絞り込み"
                        ></v-text-field>
                      </template>
                    </v-data-table>
                  </v-col>
                  <v-col>
                    <!-- 会義体リスト -->
                    <v-data-table
                      :headers="headers"
                      :items="councilList"
                      :search="searchCouncil"
                      v-model="selectedCouncil"
                      show-select
                      class="elevation-1"
                      hide-default-header
                    >
                      <template v-slot:top>
                        <v-text-field
                          dense
                          v-model="searchCouncil"
                          clearable
                          flat
                          solo-inverted
                          hide-details
                          prepend-inner-icon="mdi-magnify"
                          label="会義体名で絞り込み"
                        ></v-text-field>
                      </template>
                      <template v-slot:[`item.actions`]="{ item }">
                        <v-icon @click="handleAddMember(item)"> mdi-account-arrow-right </v-icon>
                      </template>
                    </v-data-table>
                  </v-col>
                  <!-- <v-col> -->
                    <!-- 議事リスト -->
                    <!-- <v-data-table
                      :headers="headers"
                      :items="councilList"
                      :search="searchMeeting"
                      v-model="selectedMeeting"
                      show-select
                      class="elevation-1"
                      hide-default-header
                    >
                      <template v-slot:top>
                        <v-text-field
                          dense
                          v-model="searchMeeting"
                          clearable
                          flat
                          solo-inverted
                          hide-details
                          prepend-inner-icon="mdi-magnify"
                          label="議事名で絞り込み"
                        ></v-text-field>
                      </template>
                      <template v-slot:[`item.actions`]="{ item }">
                        <v-icon @click="handleAddMember(item)"> mdi-account-arrow-right </v-icon>
                      </template>
                    </v-data-table>
                  </v-col> -->
                </v-row>

                <v-btn color="primary" @click="handleSearch">検索</v-btn>
              </v-card-text>
            </v-card>
          </v-expansion-panel-content>
        </v-expansion-panel>
      </v-expansion-panels>

    <speech-list />


    </v-card>
  </div>
</template>

<script lang="ts">
import { reactive, toRefs, defineComponent } from '@nuxtjs/composition-api';
import { useMinistry, useCouncil, usePerson } from '@/compositions';
import SpeechList from '~/components/speech/SpeechList.vue'

type Item = {
  id: string;
  name: string;
  name_e: string;
  abbreviation: string;
  url: string;
};

export default defineComponent({
  components: { SpeechList },
  setup() {
    const { state: ministryState, getMinistryList } = useMinistry();
    const { state: councilState, getCouncilList } = useCouncil();
    const { state: personState, getPersonList } = usePerson();
    const state = reactive({
      searchAll: '',
      searchPerson: '',
      searchMinistry: '',
      searchCouncil: '',
      searchMeeting: '',
      selectedPerson: [],
      selectedMinistry: [],
      selectedCouncil: [],
      selectedMeeting: [],
    });
    const personHeaders = [
      { text: 'name', value: 'name' },
      { text: 'name_kana', value: 'name_kana' },
    ];
    const headers = [
      { text: 'name', value: 'name' },
      { text: 'name_kana', value: 'name_kana' },
    ];

    const handleSearch = async () => {
      try {
        console.log('selectedPerson', state.selectedPerson);
        console.log('selectedMinistry', state.selectedMinistry.length);
        // console.log('error', error);
      } catch (error) {
        console.log('error', error);
      }
    };

    return {
      ...toRefs(state),
      ...toRefs(ministryState),
      ...toRefs(councilState),
      ...toRefs(personState),
      personHeaders,
      headers,
      handleSearch,
    };
  },
});
</script>
