<template>
  <v-container>
    <v-row align="center" justify="center">
      <v-col cols="12" sm="8">
        <RegisterFlow />
      </v-col>
    </v-row>

  </v-container>
</template>


<script>
import RegisterFlow from "./components/RegisterFlow"

export default {
  components:{
    RegisterFlow
  }
}
</script>