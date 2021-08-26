<template>
  <v-row justify="center" align="start">
    <v-col cols="12" sm="6" md="8">
      <council-list-hot />
    </v-col>
    <v-col cols="6" md="4">
      <v-card>
        <v-alert
          border="left"
          colored-border
          color="teal"
          elevation="1"
          dense
        >
          最新情報
        </v-alert>
        <CouncilMeetingListYM />
      </v-card>
      <br>
      <v-card>
        <v-alert
          border="left"
          colored-border
          color="teal"
          elevation="1"
          dense
        >
          開発者からのお知らせ
        </v-alert>
        <v-img
          height="250"
          src="https://cdn.vuetifyjs.com/images/cards/cooking.png"
        />
        <v-card-title class="headline">
          Welcome to the Vuetify + Nuxt.js template
        </v-card-title>
      </v-card>
    </v-col>
  </v-row>
</template>
