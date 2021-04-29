<template>
  <v-card class="mx-auto">
    <v-card dark flat>
      <v-card-title class="pa-2 blue-grey darken-1">
        <h3 class="title grow">尾身 茂</h3>
        <v-btn icon>
          <v-icon>mdi-share-variant</v-icon>
        </v-btn>
      </v-card-title>
    </v-card>

    <person-info />
  </v-card>
</template>

<script>
import PersonInfo from '~/components/person/PersonInfo.vue';
export default {
  components: { PersonInfo },
  data: () => ({}),
};
</script>