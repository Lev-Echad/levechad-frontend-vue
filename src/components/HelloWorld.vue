<template>
  <v-container>
    <v-row class="text-center">
      <v-col cols="12">
        <v-img
          :src="require('../assets/lev-echad-tranperent-logo.png')"
          class="my-3"
          contain
          height="200"
        />
      </v-col>
      <v-col cols="12">
        <v-btn color="primary" class="ma-2" :to="{name: 'Citizen'}">
        בקשת עזרה
        </v-btn>
        <v-btn  color="primary" class="ma-2" :to="{name: 'Volunteer'}">
          הרשמת מתנדב
        </v-btn>
        <v-btn color="primary" class="ma-2" :to="{name: 'Hamal'}">
          כניסת חמ"ל
        </v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: "HelloWorld",

};
</script>
