<template>
  <v-row dense>
    <v-col  text-center cols="12">
      <v-card class="text-center white--text" :color="getStatusColor(focusedMission.status)">
          <p class="ma-0"> משימה מספר {{ focusedMission.id }}  </p>
          <strong>{{ focusedMission.status }}</strong>
      </v-card>
    </v-col>
    <v-col cols="12">

      <v-card class="indigo lighten-2 text-center white--text">
        <strong>{{ focusedMission.full_name }}</strong>
      </v-card>
    </v-col>
    <v-col cols="12">
      <v-card class="indigo lighten-2 text-center white--text">
        <strong><span>{{moment(focusedMission.created_date).format('DD-MM-YY, h:mm')}}</span>
</strong>
      </v-card>
    </v-col>
    <v-col cols="12">
      <v-card class="indigo lighten-2  text-center white--text">
        <strong v-if="focusedMission.city">עיר: {{
          focusedMission.city.name
        }}</strong>
      </v-card>
    </v-col>
    <v-col cols="12">
      <v-card class="indigo lighten-2  text-center white--text">
        <strong>סוג: {{ focusedMission.type }}</strong>
      </v-card>
    </v-col>
    <v-col cols="12">
      <v-card class="indigo lighten-2  text-center white--text">
        {{ focusedMission.phone_number }}
      </v-card>
    </v-col>
    <v-col cols="12">
      <v-card class="indigo lighten-2  text-center white--text">
        <p  class="ma-0 pa-0">כתובת: {{ focusedMission.address }}</p>
      </v-card>
    </v-col>
    <v-col cols="12">
      <v-card class="indigo lighten-2  text-center white--text">
          <p class="ma-0 pa-0">פירוט בקשה</p>
          {{ focusedMission.type_text }}
      </v-card>
    </v-col>
    <v-col v-if="focusedMission.helping_volunteer" cols="12">

      <v-card class="info lighten-2  text-center white--text">
          <p  class="ma-0 pa-0"> מס׳ מתנדב: {{ focusedMission.helping_volunteer.id }}</p>
          <p  class="ma-0 pa-0" v-text="focusedMission.helping_volunteer.full_name"></p>
          <p  class="ma-0 pa-0" v-text="focusedMission.helping_volunteer.phone_number"></p>
      </v-card>
    </v-col>
    <v-divider> </v-divider>
    <v-row>
      <v-col cols="12">
        <v-radio-group v-model="HamalHelpRequestFields.status">
          <v-radio label="התקבלה" value="WAITING"></v-radio>
          <v-radio color="orange" label="בטיפול חמל" value="IN_CARE"></v-radio>
          <v-radio color="green" label="הועבר למתנדב" value="TO_VOLUNTER"></v-radio>
          <v-radio color="info" label="סיום טיפול" value="DONE"></v-radio>
          <v-radio color="info" label="לא רלוונטי" value="NOT_DONE"></v-radio>
        </v-radio-group>
        <v-text-field
          label="מס' מתנדב"
          outlined=""
          hint="יש לעדכן סטטוס להועבר למתנדב"
          :persistent-hint="(HamalHelpRequestFields.status!='TO_VOLUNTER')"
          v-show="HamalHelpRequestFields.status=='TO_VOLUNTER'"
          v-model="HamalHelpRequestFields.helping_volunteer"
        >
        </v-text-field>
        <v-textarea
          label='הערות חמ"ל'
          v-model="HamalHelpRequestFields.notes"
          class="py-2"
          outlined=""
          hint="דברים שקשורים לפניה"
        >
        </v-textarea>
        <v-text-field
        outlined=""
        v-model="HamalHelpRequestFields.status_updater"
        label="חמליסט מטפל"
        >
        </v-text-field>
      </v-col>
      <v-col cols="12">
          <p v-show="!HamalHelpRequestFields.helping_volunteer && (HamalHelpRequestFields.status=='TO_VOLUNTER')" class="primary--text">יש לעדכן מספר מתנדב לפני שמירה!</p>
        <v-btn

                :disabled="!HamalHelpRequestFields.helping_volunteer && (HamalHelpRequestFields.status=='TO_VOLUNTER')"
                raised class="success" @click="saveChanges()">
          שמירה
        </v-btn>
      </v-col>
      <v-col cols="12"> </v-col>
      <v-col cols="12"> </v-col>
    </v-row>
  </v-row>
</template>

<script>

export default {

  computed: {
    focusedMission: {
      get() {
        return this.$store.getters["market/currentHelpRequest"];
      },
    },
      helpingVolunteerDetails(){
       return this.focusedMission.helping_volunteer
      },
    isLoading() {
      return this.$store.getters["match/isLoading"];
    },
    HamalHelpRequestFields() {
      return this.$store.getters["market/HamalHelpRequestFields"];
    },

  },

  mounted(){
  // this.$store.commit("market/currentHelpRequestHamalFields", this.focusedMission)
    // if(this.focusedMission.helping_volunteer){
    //     this.$store.dispatch("hamalVolunteers/reqVolunteerDetailsById", this.focusedMission.helping_volunteer.id)
    // }
  },
  methods: {

    saveChanges() {
      this.$store.dispatch("market/updateHelpRequest");
    },
    getStatusColor(status) {
      let color = "white";
      switch (status) {
        case "התקבלה":
          color = "red";
          break;
        case "בטיפול":
          color = "orange";
          break;
        case "הועבר למתנדב":
          color = "green";
          break;
        case "טופל":
          color = "info";
          break;
        case "לא טופל":
          color = "red";
          break;
      }
      return color;
    },
  },
};
</script>
