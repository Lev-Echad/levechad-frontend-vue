<template>
  <div v-if="mission">
    
    <v-list dense="">
      <v-list-item 
      v-for="(data, index) in mission" 
      :key="index"
      >
      <v-list-item-content>
         <v-list-item-title v-text="data"></v-list-item-title>
      </v-list-item-content>
      </v-list-item>
    </v-list>
    <!-- <v-card>
      <v-row> </v-row>
    </v-card> -->
  </div>
</template>

<script>
export default {
  props: ["mission"],
    computed:{

    fousedMission(){
      return this.$store.state.hamal.fousedMission
    }
    }
};
</script>
