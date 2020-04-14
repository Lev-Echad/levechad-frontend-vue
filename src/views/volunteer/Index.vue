<template>
 <v-app>
    <VolunteerBar />
    <VolunteerView />
  </v-app>
</template>


<script>
import VolunteerBar from "./components/core/AppBar"
import VolunteerView from "./components/core/View"

export default {
  components:{
    VolunteerBar,VolunteerView
  },

}
</script>