<template>
  <v-app dark>
    <v-main>
      <v-container fluid>
        <nuxt />
      </v-container>
    </v-main>

    <v-footer color="red lighten-1" padless>
      <v-row justify="center" no-gutters>
        <v-btn
          v-for="link in links"
          :key="link.name"
          color="white"
          text
          rounded
          class="my-2"
          :to="link.to"
        >
          {{ link.name }}
        </v-btn>
        <v-col class="red lighten-2 py-4 text-center white--text" cols="12">
          {{ new Date().getFullYear() }} — <strong>JQ</strong>
          <v-btn icon>
            <v-icon @click="externalLink('https://github.com/JQinglong/poli-link')">mdi-github</v-icon>
          </v-btn>
        </v-col>
      </v-row>
    </v-footer>
  </v-app>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import firebase from "~/plugins/firebase.config";

export default {
  data() {
    return {
      title: "Vuetify.js",
      links: [
        { name: "Home", to: "/" },
        { name: "About Us", to: "/about" },
        { name: "利用規約", to: "/terms" },
      ],
    };
  },
  methods: {
    externalLink (url) {
      window.open(url, '_blank')
    }
  }

};
</script>
