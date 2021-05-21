<template>
  <div>
    <v-card>
      <v-card-title> データメンテナンス </v-card-title>
      <v-card-text>
        <v-btn class="ma-2" outlined color="indigo" @click="$router.push('/admin/council/')"> 会議体 </v-btn>
        <v-btn class="ma-2" outlined color="indigo" @click="$router.push('/admin/person/')"> 人物 </v-btn>
      </v-card-text></v-card
    >
  </div>
</template>

<script>
export default {};
</script>

<style>
</style>