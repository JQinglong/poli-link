<template>
  <div>
    <v-card>
      <v-card-title> [{{ councilData.name }}] の管理 </v-card-title>
      <v-card-text>
        <v-container fluid>
          <v-row dense>
            <v-col cols="3">
              人物
              <person-add />
              <v-data-table :headers="personHeaders" :items="personList" class="elevation-1" hide-default-header hide-default-footer>
                <template v-slot:[`item.actions`]="{ item }">
                  <v-icon @click="$router.push(`/person/${item.id}/`)"> mdi-account-arrow-right </v-icon>
                </template>
              </v-data-table>
            </v-col>
            <v-col>
              構成員
              <v-data-table :headers="headers" :items="councilMemberList" class="elevation-1" hide-default-header hide-default-footer>
                <template v-slot:[`item.position`]="{ item }">
                  <v-chip v-if="item.position" dark>
                    {{ item.position }}
                  </v-chip>
                </template>

                <template v-slot:[`item.actions`]="{ item }">
                  <!-- <v-icon color="grey lighten-1" @click="dispItem(item)">mdi-information</v-icon> -->
                  <v-icon v-if="item.person" @click="$router.push(`/person/${item.person}/`)"> mdi-tooltip-account </v-icon>
                </template>
              </v-data-table>
            </v-col>
          </v-row>
        </v-container>
      </v-card-text>
    </v-card>
  </div>
</template>

<script lang="ts">
// 構成員メンテ
import { PropType } from 'vue';
import { ref, toRefs, useFetch, defineComponent, reactive } from '@nuxtjs/composition-api';
import PersonInfo from '../person/PersonInfo.vue';
import { CouncilMemberType } from '@/types';
import { useCouncil, useCouncilMember, usePerson } from '@/compositions';
import PersonAdd from '../person/PersonAdd.vue';

export default defineComponent({
  name: 'CouncilMemberList',
  components: { PersonInfo, PersonAdd },

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
      { text: 'actions', value: 'actions' },
    ];
    const headers = [
      { text: 'name', value: 'name' },
      { text: 'position', value: 'position' },
      { text: 'occupation', value: 'occupation' },
      { text: 'actions', value: 'actions' },
    ];
    const { state: councilMemberState, getCouncilMemberList } = useCouncilMember();
    const { state: councilState, getCouncil } = useCouncil();
    const { state: personState, getPersonList } = usePerson();

    const defaultItem: CouncilMemberType = {
      id: '',
      name: '',
      occupation: '',
      position: '',
      council: '',
      person: '',
    };

    const fetchData = async (offset = 0, council = '') => {
      // console.log('council', council)
      await getCouncil(props.councilId);
      await getCouncilMemberList({ offset: offset, council: council });
      await getPersonList({ offset });
    };

    const { fetchState } = useFetch(() => fetchData(0, props.councilId));
    return {
      ...toRefs(councilMemberState),
      ...toRefs(councilState),
      ...toRefs(personState),
      personHeaders,
      headers,
      // dispItem,
      // close,
    };
  },
});
</script>