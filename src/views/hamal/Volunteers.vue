<template>
  <div>
    <h1 @click="getVol()">מתנדבים</h1>
  </div>
</template>


<script>
export default {
  methods:{
    getVol(){
      this.$store.dispatch('api/getVolunteers')
    }
  }
}
</script>