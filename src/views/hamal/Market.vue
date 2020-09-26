<template>
  <span>
    <v-container fluid >
      <v-row></v-row>
      <v-row dense>
        <v-col cols="12">
          <v-card>
            <h4>ניתן להקליק על משימה כדי לצפות במתנדבים פוטנציאלים ולבצע שידוכים</h4>
            <p class="ma-0">אם יש תקלה בתצוגה, יש להיכנס ולצאת מחלונית המשימה</p>
            <p>אם עדיין לא עובד, רעננו את הדף</p>
          </v-card>
        </v-col>
      </v-row>
      <v-row dense>
        <v-col cols="12" lg="12">
          <MissiosTable/>
              <v-dialog fullscreen hide-overlay transition="dialog-bottom-transition" v-model="dialog">
                <MissionDashboard />
              </v-dialog>
        </v-col>

      </v-row>
    </v-container>
    <h1 v-if="isLoading">טוען </h1>
    <!-- <v-footer padless="" absolute="" inset>
      <MissionCard />
    </v-footer> -->
  </span>
</template>

<script>
  export default {
    data() {
      return {
      }
    },
    watch: {
      search(val) {
        if (val) {
          if (val.length > 1) {
            this.$store.dispatch("api/reqCitiesAutoComplete", val);
          }
        }
        console.log(this.$store.getters["match/getMapPointsFilterByCity"](val));
      },
    },
    components: {
      MissionDashboard: () => import("./components/market/MissionDashboard"),
      // MatchFilter: () => import("./components/match/Filter"),
      MissiosTable: () => import("./components/market/MissiosTable"),
    },
    computed: {

      isLoading() {
        return this.$store.getters["market/isLoading"];
      },
      dialog() {
        return this.$store.getters["market/dialog"];
      },
    },
    mounted() {
      this.$store.dispatch("market/reqOpenHelpRequests");
    },
  };
</script>
