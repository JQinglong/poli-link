<template>
  <div>
    <v-card>
      <v-card-title class="headline">Login</v-card-title>
      <v-card-text>
        <firebase-auth/>
      </v-card-text>
    </v-card>
  </div>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api';

import FirebaseAuth from "~/components/firebase/FirebaseAuth.vue";

export default defineComponent({
  components: { FirebaseAuth },

});
</script>

<style>

</style>