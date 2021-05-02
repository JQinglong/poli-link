<template>
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

    <!-- <template v-slot:top>
      <v-dialog v-model="dialog" max-width="500px">
        <v-card>
          <v-card-title>
            <span class="headline">{{editedItem.name}}</span>
            <v-spacer></v-spacer>
            <v-icon @click="$router.push(`/person/3/`)"> mdi-tooltip-account </v-icon>
          </v-card-title>

          <person-info :personId="editedItem.person" />

          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn @click="close"> 閉じる </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </template> -->
  </v-data-table>
</template>

<script lang="ts">
// 個人キャリアリスト
import { PropType } from 'vue';
import { ref, toRefs, useFetch, defineComponent, reactive } from '@nuxtjs/composition-api';
import PersonInfo from '../person/PersonInfo.vue';
import { CouncilMemberType } from '@/types'
import { useCouncilMember } from '@/compositions';

export default defineComponent({
  name: 'CouncilMemberList',
  components: { PersonInfo },

  props: {
    councilId: {
      type: String,
      required: true,
    },
  },
  setup(props, { root }) {
    console.log('props.councilId', props.councilId)
    const headers = [
      { text: 'name', value: 'name' },
      { text: 'position', value: 'position' },
      { text: 'occupation', value: 'occupation' },
      { text: 'actions', value: 'actions' },
    ]
    const { state: councilMemberState, getCouncilMemberList } = useCouncilMember();

    const defaultItem:CouncilMemberType = {
        id: '',
        name: '',
        occupation: '',
        position: '',
        council: '',
        person: '',
      }
    const state = reactive({
      dialog: false,
      editedItem: defaultItem,
    })
    // 順次クリックに対応できていないので一旦保留
    // const dispItem = (item: CouncilMemberType) =>{
    //   console.log(item)
    //   if (item.person) {
    //     state.editedItem = item
    //     state.dialog = true
    //   }
    // }
    // const close = () =>{
    //   state.dialog = false
    //   root.$nextTick(() => {
    //     state.editedItem = Object.assign({}, defaultItem)
    //   })
    // }

    const fetchData = async (offset = 0) => {
      await getCouncilMemberList({ offset });
    };

    const { fetchState } = useFetch(() => fetchData());
    return {
      ...toRefs(state),
      ...toRefs(councilMemberState),
      headers,
      // dispItem,
      // close,
    };
  },
});
</script>