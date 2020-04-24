<template>
  <v-row dense >
    <v-col cols="2">
      <v-card class="primary lighten-2 text-center white--text">
        <strong>{{ fousedMission.full_name }}</strong>
      </v-card>
    </v-col>
    <v-col cols="2">
      <v-card class="primary lighten-2  text-center white--text">
        <strong v-if="fousedMission.city">{{ fousedMission.city.name }}</strong>
      </v-card>
    </v-col>
    <v-col cols="2">
      <v-card class="primary lighten-2  text-center white--text">
        <strong>{{ fousedMission.type }}</strong>
      </v-card>
    </v-col>
    <v-col cols="2">
      <v-card class="primary lighten-2  text-center white--text">
        <strong>{{ fousedMission.phone_number }}</strong>
      </v-card>
    </v-col>
    <v-col cols="2">
      <v-card class="primary lighten-2  text-center white--text">
        <strong>{{ fousedMission.address }}</strong>
      </v-card>
    </v-col>
    <v-col cols="2">
      <v-card class="primary lighten-2  text-center white--text">
        <strong>{{ fousedMission.notes }}</strong>
      </v-card>
    </v-col>
    <v-col class="primary lighten-2  text-center white--text" cols="12">
     <v-row>

    
      <v-col cols="4">
        <v-card>
          סטטוס: <strong>{{ fousedMission.status }}</strong>
        </v-card>
      </v-col>
      <v-col cols="4">
        <v-btn>asd</v-btn>
      </v-col>
       </v-row>
    </v-col>
  </v-row>
</template>

<script>
export default {
  computed: {
    fousedMission() {
      return this.$store.getters['match/focusedMissionDetails'];
    },
        isLoading() {
      return this.$store.getters["match/isLoading"];
    },
  },
};
</script>
