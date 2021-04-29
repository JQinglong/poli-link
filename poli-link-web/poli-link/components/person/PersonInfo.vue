<template>
<div>
  <v-card>
      <v-btn icon>
        <v-icon>mdi-wikipedia</v-icon>
      </v-btn>
      <v-btn icon>
        <v-icon>mdi-twitter</v-icon>
      </v-btn>
      <v-btn icon>
        <v-icon>mdi-facebook</v-icon>
      </v-btn>
      <v-btn icon>
        <v-icon>mdi-youtube</v-icon>
      </v-btn>

    <v-card-title>
      キャリア
    </v-card-title>
    <person-career-list />
    <v-card-title>
      参画している会議体
    </v-card-title>
    <person-counscil-list />
  </v-card>
</div>
</template>

<script>
import PersonCareerList from './PersonCareerList.vue'
import PersonCounscilList from './PersonCounscilList.vue'
export default {
  components: { PersonCareerList },

}
</script>

<style>


</style>