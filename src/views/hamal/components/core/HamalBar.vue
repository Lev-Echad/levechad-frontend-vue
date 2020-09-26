<template>
  <v-app-bar app color="red" dark>
    <!--        <v-app-bar-nav-icon-->
    <!--                @click="$vuetify.breakpoint.smAndDown ? setDrawer(!drawer) : $emit('input', !value)"-->
    <!--        ></v-app-bar-nav-icon>-->

    <!-- <v-icon v-if="value">
        mdi-view-quilt
      </v-icon>

      <v-icon v-else>
        mdi-dots-vertical
      </v-icon> -->


    <v-toolbar-title>
      <span class="font-weight-bold"> לב אחד </span>
      <span class="font-weight-light">חמ"ל</span>
    </v-toolbar-title>

    <span v-if="!$vuetify.breakpoint.smAndDown">
            <v-btn
                    :color="item.color"
                    :key="item.title"
                    :to="{ name: `${item.to}` }"
                    class="ma-1"

                    v-for="item in items"
            >
              <v-icon left v-text="item.icon"></v-icon>
              <span v-text="item.title"></span>
          </v-btn>
      </span>
    <span v-else>
      <v-menu
              left
              bottom
      >
        <template v-slot:activator="{ on, attrs }">
          <v-btn
                  icon
                  v-bind="attrs"
                  v-on="on"
          >
            <v-icon>mdi-arrow-down-drop-circle-outline</v-icon>
          </v-btn>
        </template>

    <v-list dense>
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
      </v-menu>
    </span>
    <v-spacer></v-spacer>

    <v-btn @click="logout()" icon>
      <v-icon>mdi-logout</v-icon>
    </v-btn>
  </v-app-bar>
</template>

<script>

  // Utilities
  import {mapState, mapMutations, mapActions} from 'vuex'

  export default {
    data() {
      return {
        value: false,
        items: [
          {title: "ביצוע שידוכים", icon: "mdi-handshake", to: "HamalMatch", color: "success"},
          {title: "משימות פתוחות ואיתור מתנדבים", icon: "mdi-handshake", to: "HamalMarket", color: "success"},
          {title: "צפייה במשימות", icon: "mdi-bell-ring", to: "HamalMissions", color: "orange"},
          {title: "משימה חדשה", icon: "mdi-bell-plus", to: "Citizen", color: "orange"},
          {title: "מתנדבים", icon: "mdi-account", to: "HamalVolunteers", color: "info"},
          {title: "מתנדב חדש", icon: "mdi-account-plus", to: "Volunteer", color: "info"},
          {title: "ניתור ובקרה", icon: "mdi-chart-line", to: "Hamal", color: "primary"},
          // { title: "תצוגת מפה", icon: "mdi-map", to: "HamalMissions" },
          // { title: "פרויקטים", icon: "mdi-alarm-light", to: "HamalMissions" },
          // { title: "הודעות ועדכונים", icon: "mdi-message", to: "HamalMissions" },
        ],
      }
    },
    computed: {
      // drawer() {
      //     return this.$store.state.hamal.drawer;
      // }
    },

    methods: {
      // setDrawer(value) {
      //     this.$store.commit('hamal/SET_DRAWER', value)
      // }
      logout() {
        console.log("click")
        this.$store.dispatch('logoutUser')
        this.$router.push({name: 'Login'})
      }
    },
  };
</script>
