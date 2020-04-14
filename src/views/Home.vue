<template>
  <v-app>
    <v-app-bar app color="primary" dark>
    <v-toolbar-title>
      <span class="font-weight-bold"> לב אחד </span>
      <span class="font-weight-light">דף הבית</span>
    </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn :to="{ name: 'Home' }" icon>
        <v-icon>mdi-home</v-icon>
      </v-btn>
    </v-app-bar>
    <v-content>
      <v-container>
        <helloWorld />
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
import helloWorld from "@/components/HelloWorld";
export default {
  components: {
    helloWorld
  }
};
</script>
