<template>
  <v-row dense>
    <v-col text-center cols="12">
      <v-card :color="getStatusColor(focusedMission.status)">
        סטטוס:  <strong>{{ focusedMission.status }}</strong>
      </v-card>
    </v-col>
    <v-col cols="12">
      <v-card class="primary lighten-2 text-center white--text">
        <strong>{{ focusedMission.full_name }}</strong>
      </v-card>
    </v-col>
    <v-col cols="12">
      <v-card class="primary lighten-2 text-center white--text">
        <strong><span>{{moment(focusedMission.created_date).format('DD-MM-YY, h:mm')}}</span>
</strong>
      </v-card>
    </v-col>
    <v-col cols="12">
      <v-card class="primary lighten-2  text-center white--text">
        <strong v-if="focusedMission.city">{{
          focusedMission.city.name
        }}</strong>
      </v-card>
    </v-col>
    <v-col cols="12">
      <v-card class="primary lighten-2  text-center white--text">
        <strong>{{ focusedMission.type }}</strong>
      </v-card>
    </v-col>
    <v-col cols="12">
      <v-card class="primary lighten-2  text-center white--text">
        <strong>{{ focusedMission.phone_number }}</strong>
      </v-card>
    </v-col>
    <v-col cols="12">
      <v-card class="primary lighten-2  text-center white--text">
        <strong>{{ focusedMission.address }}</strong>
      </v-card>
    </v-col>
    <v-col cols="12">
      <v-card class="primary lighten-2  text-center white--text">
        <strong>{{ focusedMission.type_text }}</strong>
      </v-card>
    </v-col>
    <v-col v-if="focusedMission.helping_volunteer" cols="12">
      <v-card class="primary lighten-2  text-center white--text">
        <strong> מס׳ מתנדב: {{ focusedMission.helping_volunteer.id }}</strong>
      </v-card>
    </v-col>
    <v-divider> </v-divider>
    <v-row>
      <v-col cols="12">
        <v-radio-group v-model="HamalHelpRequestFields.status">
          <v-radio label="התקבלה" value="WAITING"></v-radio>
          <v-radio label="בטיפול חמל" value="IN_CARE"></v-radio>
          <v-radio label="הועבר למתנדב" value="TO_VOLUNTER"></v-radio>
          <v-radio label="סיום טיפול" value="DONE"></v-radio>
          <v-radio label="לא רלוונטי" value="NOT_DONE"></v-radio>
        </v-radio-group>
        <v-text-field
          label="מס' מתנדב"
          solo
          hint="יש לעדכן סטטוס להועבר למתנדב"
          :persistent-hint="(HamalHelpRequestFields.status!='TO_VOLUNTER')"
          :disabled="HamalHelpRequestFields.status!='TO_VOLUNTER'"
          v-model="HamalHelpRequestFields.helping_volunteer"
        >
        </v-text-field>
        <v-textarea
          label='הערות חמ"ל'
          v-model="HamalHelpRequestFields.notes"
          class="py-2"
          outlined=""
          hint="חמליסט מטפל ודברים שקשורים לפניה"
        >
        </v-textarea>
      </v-col>
      <v-col cols="12">
        <v-btn  raised class="success" @click="saveChanges()">
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
        return this.$store.getters["match/focusedMissionDetails"];
      },
    },
    isLoading() {
      return this.$store.getters["match/isLoading"];
    },
    HamalHelpRequestFields() {
      return this.$store.getters["match/HamalHelpRequestFields"];
    },
  },
  mounted() {},
  methods: {
    saveChanges() {
      this.$store.dispatch("match/updateHelpRequest");
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
          color = "green";
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
