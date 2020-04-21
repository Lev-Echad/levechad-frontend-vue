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
import OneForm from "./Form"
import Terms from "./components/forms/Terms"

export default {
  components:{
     OneForm, Terms
  },
  data(){
    return{

      isAcceptTerms: false
    }
  },
  methods:{
    acceptedTerms(){
    this.$vuetify.goTo(this.$refs.OneForm)
    this.isAcceptTerms = true
    }

  },
  mounted(){
    this.$vuetify.goTo(this.$refs.Terms)
  }
  
}
</script>