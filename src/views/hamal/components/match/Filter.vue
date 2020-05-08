<template>
  <div>
    <v-row  align="center">
    <v-col cols="12" sm="4" class="">
      <v-text-field
        v-model="serach_id"
        :counter="10"
        :rules="idules"
        label="חפש לפי id"
        required
      ></v-text-field>
    </v-col>

    <v-col cols="12" sm="3">
      <v-autocomplete
        v-model="serach_city"
        :items="items"
        :loading="isLoading"
        :search-input.sync="search"
        hide-no-data
        label="עיר"
        placeholder="מיין לפי עיר"
        prepend-icon="mdi-city"
        no-data-text="שדג"
        cache-items
        :error="error"
      ></v-autocomplete>
    </v-col>

    <v-col cols="12" sm="3">
      <v-select 
      clearable label="סטטוס" 
      v-model="serach_status" 
      :items="[
      'ממתין',
      'בטיפול',
      'הועבר למתנדב',
      'בוצע',
      'לא בוצע',
      ]"> 
      </v-select>
    </v-col>


      <!-- <v-col cols="12" sm="2">
        <v-chip-group v-model="selectedMissions" column multiple>
          <v-chip filter outlined>תרופות</v-chip>
          <v-chip filter outlined>סופר</v-chip>
          <v-chip filter outlined>משפחתונים</v-chip>
          <v-chip filter outlined>בדידות</v-chip>
        </v-chip-group>
      </v-col>

      <v-col cols="12" sm="2">
        <v-chip-group v-model="selectedStatuses" column multiple>
          <v-chip filter outlined>התקבלה</v-chip>
          <v-chip filter outlined>בטיפול</v-chip>
          <v-chip filter outlined>לא טופל</v-chip>
          
        </v-chip-group>
      </v-col> -->

    </v-row>
  </div>
</template>



<script>
export default {
  data: () => ({
    entries: [],
    isLoading: false,
    model: null,
    search: null,
    error: false
  }),
  computed: {
    items() {
      let resCitiesList = this.$store.getters["api/getCitiesList"];
      return resCitiesList;
    },
  },
  watch: {
    search(val) {
      if (val) {
        if (val.length > 1) {
          this.$store.dispatch("api/reqCitiesAutoComplete", val);
        }
      }
    },
  },
};
</script>

