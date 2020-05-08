<template>
  <div>
    <v-text-field label="מספר משימה" v-model="filters.id"></v-text-field>
    <v-select label="עמוד" v-model="filters.page" :items="pages"> </v-select>
    <v-select 
      clearable label="סטטוס" 
      v-model="filters.status" 
      :items="[
      {text: 'התקבלה', value: 'WAITING'},
      {text: 'בטיפול חמל', value: 'IN_CARE'},
      {text: 'הועבר למתנדב', value: 'TO_VOLUNTER'},
      {text: 'סיום טיפול', value: 'DONE'},
      {text: 'לא רלוונטי', value: 'NOT_DONE'},
      ]"> 
    </v-select>
    <v-text-field  clearable label="טלפון" v-model="filters.phone_number"> </v-text-field >
    <v-btn @click="search()">חפש</v-btn>
    תוצאות: 
    {{totalHelpRequests}}
  </div>
</template>

<script>
export default {
  computed: {
    filters() {
      return this.$store.getters["helpRequests/filters"];
    },
    areas() {
      return this.$store.getters["helpRequests/areas"];
    },
    totalHelpRequests() {
      return this.$store.getters["helpRequests/totalHelpRequests"];
    },
    pages() {
      var arr = [];
      if(this.totalHelpRequests<=1){
        arr[0] =1
        return arr
      }
      for (var i = 1; i <= Math.round(this.totalHelpRequests / 10 ) ; i++) {
        arr.push(i);
      }
      return arr;
    },
  },
  methods: {
    search() {
      this.$store.dispatch("helpRequests/reqHelpRequests");
    },
  },
};
</script>
