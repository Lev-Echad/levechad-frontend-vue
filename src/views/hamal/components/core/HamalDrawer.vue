<!--this file is not in use, we changed navigation to app bar-->
<template>
  <v-navigation-drawer v-model="drawer" class="red" dark app right>
    <v-list>
      <v-list-item
        v-for="item in items"
        :key="item.title"
        link
        :to="{ name: `${item.to}` }"
      >
        <v-list-item-icon>
          <v-icon>{{ item.icon }}</v-icon>
        </v-list-item-icon>

        <v-list-item-content>
          <v-list-item-title>{{ item.title }}</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list>

    <template v-slot:append>
      <div class="pa-2">
        <v-btn @click="logout()" block>התנתקות</v-btn>
      </div>
    </template>
  </v-navigation-drawer>
</template>

<script>
import { mapState, mapActions } from "vuex";

export default {
  data() {
    return {
      items: [
        { title: "דף הבית", icon: "mdi-home", to: "Hamal" },
        { title: "ביצוע שידוכים", icon: "mdi-handshake", to: "HamalMatch" },
        { title: "מתנדבים", icon: "mdi-account", to: "HamalVolunteers" },
        { title: "משימות", icon: "mdi-alarm-light", to: "HamalMissions" },
        // { title: "תצוגת מפה", icon: "mdi-map", to: "HamalMissions" },
        // { title: "פרויקטים", icon: "mdi-alarm-light", to: "HamalMissions" },
        // { title: "הודעות ועדכונים", icon: "mdi-message", to: "HamalMissions" },
      ],
    };
  },
  methods:{
    logout(){
      this.$store.dispatch('logoutUser')
      this.$router.push({ name: 'Login' })
    }
  },
  computed: {
    drawer: {
      get() {
        return this.$store.state.hamal.drawer;
      },
      set(val) {
        this.$store.commit("hamal/SET_DRAWER", val);
      },
    },
  },
};
</script>
