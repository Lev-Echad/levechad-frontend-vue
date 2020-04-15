<template>
<v-container>
    <v-row>
      <v-col cols="12">
        <v-card >
          <MatchFilter />
          <!-- <MissionCard v-bind:mission="fousedMission" /> -->
        </v-card>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12" lg="6">
        <PotentialVolunteers :missionList="missionList" />
      </v-col>
      <v-col cols="12" lg="6">
        <Map :missionList="missionList" />
      </v-col>
    </v-row>
    
</v-container>
</template>


<script>

export default {
  components:{
    PotentialVolunteers: () => import("./components/match/PotentialVolunteers"),
    MatchFilter: () => import("./components/match/Filter"),
    Map: () => import("./components/Map"),
    MissionCard: () => import("./components/missions/MissionCard"),
  },
  computed:{
    missionList(){
      return this.$store.getters['api/getMissions']
    },
    fousedMission(){
      return this.$store.state.hamal.fousedMission
    }
  },

}
</script>