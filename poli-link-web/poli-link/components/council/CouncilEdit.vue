<template>
  <div>
    <v-card>
      <v-card-title> [{{ councilData.name }}] の管理 </v-card-title>
      {{ councilData.url }}
      <v-card-text>
        <v-container fluid>
          <v-row dense>
            <v-col cols="3">
              人物マスタ
              <!-- 人物登録 -->
              <person-add />
              <!-- 人物リスト -->
              <v-data-table
                :headers="personHeaders"
                :items="personList"
                :search="search"
                class="elevation-1" hide-default-header>
                <template v-slot:top>
                    <v-text-field
                      dense
                      v-model="search"
                      clearable
                      flat
                      solo-inverted
                      hide-details
                      prepend-inner-icon="mdi-magnify"
                      label="Search"
                    ></v-text-field>
                </template>
                <template v-slot:[`item.actions`]="{ item }">
                  <v-icon @click="handleAddMember(item)"> mdi-account-arrow-right </v-icon>
                </template>
              </v-data-table>
            </v-col>
            <v-col>
              <!-- 構成員 -->
              <council-edit-member :councilId="councilId" />
              <!-- 議事 -->
              <council-edit-meeting :council="councilData" />
            </v-col>
          </v-row>
        </v-container>
      </v-card-text>
    </v-card>
  </div>
</template>

<script lang="ts">
// 会議体情報メンテ
import { PropType } from 'vue';
import { ref, toRefs, useFetch, defineComponent, reactive } from '@nuxtjs/composition-api';
import PersonInfo from '../person/PersonInfo.vue';
import { CouncilType, CouncilMemberType, PersonType } from '@/types';
import { useCouncil, useCouncilMember, usePerson } from '@/compositions';
import PersonAdd from '../person/PersonAdd.vue';
import CouncilEditMember from './CouncilEditMember.vue';
import CouncilEditMeeting from './CouncilEditMeeting.vue';

export default defineComponent({
  name: 'CouncilEdit',
  components: { PersonInfo, PersonAdd, CouncilEditMember, CouncilEditMeeting },

  props: {
    councilId: {
      type: String,
      required: true,
    },
  },
  setup(props, { root }) {
    // console.log('props', props)
    // console.log('props.councilId', props.councilId)
    const personHeaders = [
      { text: 'name', value: 'name' },
      { text: 'name_kana', value: 'name_kana' },
      { text: 'actions', value: 'actions' },
    ];
    const headers = [
      { text: 'name', value: 'name' },
      { text: 'position', value: 'position' },
      { text: 'occupation', value: 'occupation' },
      { text: 'actions', value: 'actions' },
    ];
    const { state: councilMemberState,createState: createCouncilMemberState, getCouncilMemberList, createCouncilMember } = useCouncilMember();
    const { state: councilState, getCouncil } = useCouncil();
    const { state: personState, getPersonList } = usePerson();

    const state = reactive({
      search: '',
    })
    const handleAddMember = async(item: PersonType) => {
      createCouncilMemberState.council = councilState.councilData
      createCouncilMemberState.name = item.name
      createCouncilMemberState.person = item.id
      try {
        console.log('createCouncilMemberState', createCouncilMemberState)
        const newCouncilMember = await createCouncilMember(createCouncilMemberState) //こことformを結びつける

        if (!newCouncilMember) {
          console.log('!newCouncilMember')
          return
        }

      } catch (error) {
        console.log('error', error)
        // setError(error)
      }
    }

    const fetchData = async (offset = 0, council = '') => {
      console.log('CouncilEdit council', council)
      await getCouncil(props.councilId);
      await getCouncilMemberList({ offset: offset, council: props.councilId });
      await getPersonList({ offset });
    };

    const { fetchState } = useFetch(() => fetchData(0, props.councilId));
    return {
      ...toRefs(state),
      ...toRefs(councilMemberState),
      ...toRefs(councilState),
      ...toRefs(personState),
      personHeaders,
      headers,
      handleAddMember,
    };
  },
});
</script>