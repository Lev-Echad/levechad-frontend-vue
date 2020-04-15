<template>
  <div>
    <v-row  align="center">
      <v-col cols="12" sm="4" class="">
        <v-btn-toggle v-model="selectedHamal" tile color="red " group>
          <v-btn value="דרום">
            דרום
          </v-btn>

          <v-btn value="מרכז">
            מרכז
          </v-btn>

          <v-btn value="תל אביב">
            תל אביב
          </v-btn>

          <v-btn value="צפון">
            צפון
          </v-btn>
        </v-btn-toggle>
      </v-col>

      <v-col cols="12" sm="3">
        <v-select
          v-model="selectedCities"
          :items="cities"
          label="ערים"
          multiple
          chips
          hint="ערים להצגה"
          persistent-hint
        >
          <template v-slot:selection="{ item, index }">
            <v-chip v-if="index === 0">
              <span>{{ item }}</span>
            </v-chip>
            <span v-if="index === 1" class="grey--text caption"
              >(+{{ selectedCities.length - 1 }} נוספות)</span
            >
          </template>
        </v-select>
      </v-col>

      <v-col cols="12" sm="2">
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
      </v-col>
    </v-row>
  </div>
</template>

<script>
export default {
  data() {
    return {
      selectedCities: null,
      selectedStatuses: null,
      selectedMissions: null,
      selectedHamal: null,
      cities: ["ירושלים", "תל אביב", "חיפה", "אשקלון", "אשדוד", "באר שבע"],
    };
  },
};
</script>
