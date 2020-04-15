<template>
<v-container>
    <v-row>
      <v-col cols="12">
        <v-card >
          <span class="headline">קומפוננטה של פילטר</span>
        </v-card>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12" lg="12">
        <MissionsTable :missionList="missionList" />
      </v-col>
    </v-row>
    
</v-container>
</template>


<script>

export default {
  components:{
    MissionsTable: () => import("./components/missions/MissionsTable"),
  },
  computed:{
    missionList(){
      return this.$store.getters['api/getMissions']
    },

  },

}
</script>