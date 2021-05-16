<template>
  <v-card>
    <v-card-text>
      <v-form lazy-validation>
        <v-text-field label="名前" dense outlined clearable v-model="form.name"> </v-text-field>
        <v-text-field label="URL" dense outlined clearable v-model="form.url"> </v-text-field>
                <v-textarea
          v-model="form.description"
          label="説明など"
          auto-grow
          outlined
          rows="3"
          row-height="25"
          shaped
        ></v-textarea>
        <ministry-select v-model="form.ministry" @change="selectMinistry" />
        
        <v-btn color="primary" @click="handleCreateCouncil">新規会議体登録</v-btn>
      </v-form>
    </v-card-text>
  </v-card>
</template>

<script lang="ts">
import { Data, defineComponent, reactive, ref, toRef, toRefs, useFetch, onMounted } from '@nuxtjs/composition-api';
import { useCouncil } from '@/compositions';
import { MinistryType } from '@/types';
import MinistrySelect from '../ministry/MinistrySelect.vue';


export default defineComponent({
  components: { MinistrySelect },
  name: 'CouncilAdd',
  setup(_, { root }) {

    const { state: councilState, createState: createCouncilState, createCouncil, getCouncilList } = useCouncil();

    const selectMinistry = async(item: MinistryType) => {
      console.log('selectMinistry item.id', item.id)
      createCouncilState.ministry = item
    }

    const handleCreateCouncil = async () => {
      try {
        const newCouncil = await createCouncil(createCouncilState); 

        if (!newCouncil) {
          return;
        }
      } catch (error) {
        console.log('error', error);
      }
    };

    return {
      form: createCouncilState,
      handleCreateCouncil,
      selectMinistry,
    };
  },
});
</script>

<style>
</style>