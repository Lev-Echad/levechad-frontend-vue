<template>
  <v-container>
    <base-v-component
      heading="ברוכים הבאים למערכת השליטה והבקרה של לב אחד"
    />

    <stat-cards />
    <stat-charts />
    

  </v-container>
</template>

<script>
import statCards from "./components/StatCards"
import statCharts from "./components/StatCharts"
export default {
  components:{
    statCards, statCharts
  }
}
  

</script>