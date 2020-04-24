<template>

  <div class="text-center">
    <v-row>

    <v-col cols="12" sm="6">
    <v-card class="pa-4">
    <h2>ברוכים השבים</h2>
    <h4>על מנת להוציא תעודה בתוקף, הקלידו את הפרטים הבאים:</h4>
    <v-form>
        <v-text-field
          v-model="tz_number"
          prepend-icon="mdi-numeric-9-box-multiple-outline"
          label="תעודת זהות"
          required
        >
        </v-text-field>
        <v-text-field
          v-model="full_name"
          prepend-icon="mdi-account"
          label="שם מלא"
          required
        >
        </v-text-field>

        <v-btn tile  >אישור</v-btn>
    </v-form>
    </v-card>
    </v-col>
    </v-row>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tz_number: '',
      full_name: ''
    }
  }
}
</script>