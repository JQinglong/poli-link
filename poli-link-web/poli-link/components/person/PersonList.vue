<template>
  <div>
    <v-card>
      <v-data-table
        :headers="headers"
        :items="people"
        :search="search"
        item-key="id" group-by="group" class="elevation-1" dense>

        <template v-slot:top>
          <v-toolbar dense dark color="teal lighten-2" class="mb-1">
            あかさたなはまやらわ
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
          </v-toolbar>
        </template>
      
        <template v-slot:[`item.actions`]="{ item }">
          <v-icon @click="$router.push(`/person/${item.id}/`)"> mdi-tooltip-account </v-icon>
        </template>
      </v-data-table>
    </v-card>
  </div>
</template>

<script lang="ts">
// 構成員リスト
import { ref, toRefs, useFetch, defineComponent, reactive } from '@nuxtjs/composition-api';
import { usePerson } from '@/compositions';

export default defineComponent({
  name: 'PersonList',
  setup() {
    const headers = [
      { text: '氏名', value: 'name' },
      { text: 'かな', value: 'name_kana' },
      { text: '', value: 'actions', sortable: false },
    ];
    const { state: personState, getPersonList } = usePerson();

    const state = reactive({
      search: '',
      people: [] as any[]
    })

    const fetchData = async (offset = 0) => {
      await getPersonList({ offset });
      // console.log('personState.personList', personState.personList)
      // 受け取ったAPIの結果を加工
      // anyを駆使しているが、本当は、画面表示用の型定義をしてコピーするなど
      for(let personItem of personState.personList) {
        let person:any
        person = personItem
        person.group = personItem.name_kana.slice(0, 1)
        state.people = [...state.people, person]
      }
    };

    const { fetchState } = useFetch(() => fetchData());

    return {
      headers,
      ...toRefs(personState),
      ...toRefs(state),
      fetchState,
    };
  },
});
</script>
