<template>
  <v-app>
    <HamalBar  v-if="isLoggedIn" />
    <HamalDrawer  v-if="isLoggedIn" />
    <HamalView  v-if="isLoggedIn" />
  </v-app>
</template>

<script>


export default {
  components: {
   HamalBar: () => import("./components/core/HamalBar"),
   HamalView: () => import("./components/core/HamalView"),
   HamalDrawer: () => import("./components/core/HamalDrawer"),

  },
  computed: {
    isLoggedIn() {
      return this.$store.getters.loggedIn;
    },
  },
  watch: {
    isLoggedIn(state) {
      if (!this.$store.getters.loggedIn) {
        this.$router.push({ name: "Login" });
      }
    },
  },
  beforeCreate() {
    if (!this.$store.getters.loggedIn) {
      this.$router.push({ name: "Login" });
    } 
  },

  created(){
    this.$store.dispatch('getGoogleAPIkey')
  }
};
</script>
