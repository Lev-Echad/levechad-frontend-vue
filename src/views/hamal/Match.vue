<template>
  <span>
    <v-container fluid="">
      <v-row></v-row>
      <v-row>
        <v-col cols="12">
          <v-card>
            <!-- <MatchFilter /> -->
          </v-card>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" lg="5">
          <Map />
        </v-col>
        <v-col cols="12" lg="5">
          <PotentialVolunteers />
        </v-col>
          
        <v-col cols="2">
          <v-card class="px-3" >

             <MissionOps />
          </v-card>
        </v-col>
      </v-row>
    </v-container>
    <h1 v-if="isLoading">טוען</h1>
    <!-- <v-footer padless="" absolute="" inset>
      <MissionCard />
    </v-footer> -->
  </span>
</template>

<script>
export default {
  components: {
    PotentialVolunteers: () => import("./components/match/PotentialVolunteers"),
    MissionOps: () => import("./components/match/Mission"),
    MatchFilter: () => import("./components/match/Filter"),
    Map: () => import("./components/Map"),
    MissionCard: () => import("./components/missions/MissionCard"),
  },
  computed: {
    // missionList(){
    //   return this.$store.getters['api/getMissions']
    // },
    isLoading() {
      return this.$store.getters["match/isLoading"];
    },
  },
  mounted() {
    //this.$store.commit('hamal/SET_DRAWER', false)
    this.$store.dispatch("match/reqGetOpenHelpRequests");
  },
};
</script>
