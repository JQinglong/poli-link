<template>
  <v-card
    class="mx-auto"
  >
    <v-card
      dark
    >

      <v-card-title class="pa-2 blue-grey darken-1">
        <h3 class="title grow">
          新型コロナウイルス感染症対策分科会
        </h3>
      <v-btn icon>
        <v-icon>mdi-web</v-icon>
      </v-btn>
      <v-btn icon>
        <v-icon>mdi-bookmark</v-icon>
      </v-btn>
      <v-btn icon>
        <v-icon>mdi-share-variant</v-icon>
      </v-btn>
      </v-card-title>
    </v-card>
    <v-card-text class="py-0">
      <v-card-title>構成員</v-card-title>
      <council-member-list />

      <v-card-title>開催状況</v-card-title>
      <council-meeeting-list />
      

    </v-card-text>
  </v-card>
</template>

<script>
import CouncilMeeetingList from '~/components/council/CouncilMeeetingList.vue'
import CouncilMemberList from '~/components/council/CouncilMemberList.vue'
  export default {
  components: { CouncilMemberList, CouncilMeeetingList },
    data: () => ({

    }),
  }
</script>