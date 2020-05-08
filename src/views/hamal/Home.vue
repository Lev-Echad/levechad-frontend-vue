<template>
  <v-container>
    <div >

    <base-v-component
    
      heading="ברוכים הבאים למערכת השליטה והבקרה של לב אחד"
    />
    </div>
    <!-- <stat-cards  />
    <stat-charts  /> -->
  <iframe
    src="https://metabase.levechad.org/public/dashboard/60939c2a-4506-4462-b7c1-4bba80b53f65"
    frameborder="0"
    width="100%"
    height="600px"
    allowtransparency
></iframe>
    

  </v-container>
</template>

<script>
import statCards from "./components/StatCards"
import statCharts from "./components/StatCharts"
export default {
  components:{
    statCards, statCharts
  },

}
  

</script>