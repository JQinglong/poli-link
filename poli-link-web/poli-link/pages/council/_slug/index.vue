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
      
      <v-timeline
        align-top
        dense
      >
        <v-timeline-item
          color="teal lighten-3"
          small
        >
          <v-row class="pt-1">
            <v-col>
              <strong>2020/7/6</strong>
            </v-col>
            <v-col>
              <strong>第1回</strong>
            </v-col>
            <v-col>
              <v-btn
                class="ma-2"
                outlined
                color="indigo"
              >
                議事
              </v-btn>
            </v-col>
          </v-row>
        </v-timeline-item>

        <v-timeline-item
          color="teal lighten-3"
          small
        >
          <v-row class="pt-1">
            <v-col cols="3">
              <strong>3-4pm</strong>
            </v-col>
            <v-col>
              <strong>Design Stand Up</strong>
              <div class="caption mb-2">
                Hangouts
              </div>
            </v-col>
          </v-row>
        </v-timeline-item>

        <v-timeline-item
          color="pink"
          small
        >
          <v-row class="pt-1">
            <v-col cols="3">
              <strong>12pm</strong>
            </v-col>
            <v-col>
              <strong>Lunch break</strong>
            </v-col>
          </v-row>
        </v-timeline-item>

        <v-timeline-item
          color="teal lighten-3"
          small
        >
          <v-row class="pt-1">
            <v-col cols="3">
              <strong>9-11am</strong>
            </v-col>
            <v-col>
              <strong>Finish Home Screen</strong>
              <div class="caption">
                Web App
              </div>
            </v-col>
          </v-row>
        </v-timeline-item>
      </v-timeline>
    </v-card-text>
  </v-card>
</template>

<script>
import CouncilMemberList from '~/components/council/CouncilMemberList.vue'
  export default {
  components: { CouncilMemberList },
    data: () => ({

    }),
  }
</script>