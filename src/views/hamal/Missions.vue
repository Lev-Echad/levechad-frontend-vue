<template>
<v-container>
    <v-row>
      <h1 @click="bringData()">asdads</h1>
      <v-col cols="12">
        <v-card >
          <MissionsFilter />
                  </v-card>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12" lg="12">
        <MissionsTable  />
      </v-col>
    </v-row>
    
</v-container>
</template>


<script>

export default {
  components:{
    MissionsTable: () => import("./components/missions/nTable"),
    MissionsFilter: () => import("./components/missions/Filter"),
  },

  methods:{
    bringData(){
      this.$store.dispatch('api/reqGetMissions')

    }
  }

}
</script>