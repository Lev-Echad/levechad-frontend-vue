<template>
  <v-content>
    <v-container class="fill-height" fluid>
      <v-row align="center" justify="center">
        <v-col cols="12" sm="8" md="4">
          <v-card class="elevation-8 pa-2">
            <v-row class="text-center" align="center" justify="center">
              <v-col cols="12">
                <h2 class="green--text">ברוך הבא למשפחת לב אחד!</h2>
              </v-col>
              <v-col cols="12">
                <v-avatar color="primary">
                  <v-icon dark>mdi-heart</v-icon>
                </v-avatar>
              </v-col>
              <v-col cols="12">
                <h4>
                  הצטרפותך נקלטה במערכת ואנו נחבר אותך למשימות
                </h4>
              </v-col>

              <v-col cols="12">
                  <div>
                    <v-alert
                      :value="alert"
                      dark
                      color="red"
                      border="top"
                      icon="mdi-card"
                      transition="scale-transition"
                    >
                      <h4>שים לב! לפני כל יציאה להתנדבות עליך להוציא תעודת מתנדב</h4>
                    </v-alert>
                  </div>
              </v-col>
              <v-col class="mx-1" cols="12">
                <v-btn
                  :to="{ name: 'VolunteerCard' }"
                  dark
                  color="success"
                >
                הוצאת תעודה
                </v-btn>
              </v-col>
            </v-row>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </v-content>
</template>

<script>
export default {
  data(){
    return {
      alert: false
    }
  },
  mounted(){
    setTimeout(this.alert=true , 3000);
  }
}
</script>