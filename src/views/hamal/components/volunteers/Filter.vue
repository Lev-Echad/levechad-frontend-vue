<template>
  <div>
      <v-row class="px-5">
          <v-col cols="1"><v-text-field label="id" v-model="filters.id"> </v-text-field> </v-col>
          <v-col cols="2"><v-text-field label="תעודת זהות" v-model="filters.tz_number"> </v-text-field></v-col>
          <v-col cols="1"><v-text-field label="שם פרטי" v-model="filters.first_name"> </v-text-field></v-col>
          <v-col cols="2"><v-text-field label="שם משפחה" v-model="filters.last_name"> </v-text-field></v-col>
          <v-col cols="2"><v-text-field label="עיר" v-model="filters.city"> </v-text-field></v-col>
          <v-col cols="2"><v-text-field label="טלפון" v-model="filters.phone_number"> </v-text-field></v-col>
      </v-row>
      <v-row class="px-4">
        <v-col cols="3">

        <v-btn dark tile color="red" @click="doIt">חיפוש</v-btn>
        </v-col>
      </v-row>
  </div>
</template>

<script>
export default {
  computed: {
    filters: {
      get() {
        return this.$store.getters["api/getVolunteerFilter"];
      },
      set(val) {
        this.$store.commit("api/setVolunteerFilter", val);
      },
    },
  },

  methods:{
    doIt(){
      this.$store.commit("api/setVolunteerPage",1)
      this.$store.dispatch("api/reqGetVolunteers");
    }
  }

};
</script>
