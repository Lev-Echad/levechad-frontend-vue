<template>
 <v-app>
    <HamalBar />
    <HamalDrawer  />
    <HamalView />
  </v-app>
</template>


<script>
import HamalBar from "./components/core/HamalBar"
import HamalDrawer from "./components/core/HamalDrawer"
import HamalView from "./components/core/HamalView"

export default {
  components:{
    HamalBar,HamalView,HamalDrawer
  },

}
</script>