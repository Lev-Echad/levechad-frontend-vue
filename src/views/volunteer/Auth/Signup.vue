<template>
  <v-container>
    <v-row align="center" justify="center">
      <v-col cols="12" sm="8">

       
        <Terms ref="Terms" v-on:acceptTerms="acceptedTerms()" v-if="!isAcceptTerms" />
        <OneForm ref="OneForm"  v-show="isAcceptTerms" />
      </v-col>
    </v-row>

  </v-container>
</template>


<script>
window.location.href = 'https://forms.monday.com/forms/55e180ed56b58dd4244c3d0c1b9104ff?r=use1';
// import OneForm from "./Form"
// import Terms from "./components/forms/Terms"

// export default {
//   components:{
//      OneForm, Terms
//   },
//   data(){
//     return{

//       isAcceptTerms: false
//     }
//   },
//   methods:{
//     acceptedTerms(){
//     this.$vuetify.goTo(this.$refs.OneForm)
//     this.isAcceptTerms = true
//     }

//   },
//   mounted(){
//     this.$vuetify.goTo(this.$refs.Terms)
//   }
  
// }
</script>