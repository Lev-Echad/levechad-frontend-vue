<template>
      <v-container align-center >
    <h1>טופס בקשת עזרה</h1>
    <v-row justify="center">
      <v-col cols="12" sm="6">
        <HelpForm /> 
      </v-col>
    </v-row>

    </v-container>
</template>

<script>
import HelpForm from './components/HelpRequestForm.vue'
export default {
  components:{
    HelpForm
  }
}
</script>