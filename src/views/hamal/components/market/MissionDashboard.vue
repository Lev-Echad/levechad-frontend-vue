<template>
    <span>




    <v-card>
        <v-toolbar color="indigo" dark>
            <v-btn @click='$store.commit("market/toggleDialog")' dark icon left>
                <v-icon>mdi-close</v-icon>
            </v-btn>
        </v-toolbar>




        <v-container fluid >
            <v-row >
                <v-col cols="12" md="2">
                    <MissionOps />
                </v-col>
                <v-col cols="12" md="7">
                    <PotentialVolunteers />

                </v-col>
                <v-col cols="12" md="2">
                    <GMap />
                </v-col>

            </v-row>
        </v-container>
    </v-card>
         </span>
</template>

<script>
  export default {
    components: {
      MissionOps: () => import("./MissionDashboard/Mission"),
      // MatchFilter: () => import("./components/match/Filter"),
      PotentialVolunteers: () => import("./MissionDashboard/PotentialVolunteers"),
      GMap: () => import("./MissionDashboard/Map"),
    },
  }
</script>