<template>
  <span v-if="bestVolunteers">
    <v-card height="650">
      <div>
        <v-data-table
                :headers="headers"
                :items="bestVolunteers"
                :items-per-page="20"
                :loading="isLoading"
                class="elevation-1"
                dense=""
                hide-default-footer
        >

              <template v-slot:item.freeze="{ item }">
              <v-icon
                      @click="onVolunteerClick(item)"
                      class="mr-2"
                      small
              >
                mdi-snowflake
              </v-icon>
           </template>
        </v-data-table>
      </div>
    </v-card>

    <v-dialog max-width="300" v-model="dialogIsVisible">
      <v-card>
        <v-card-title
                class="headline"
        >האם ברצונך להקפיא את {{ getDialogVolunteer.first_name }} {{ getDialogVolunteer.last_name }} ?</v-card-title>

        <v-card-text>בחר עד מתי להקפיא את המתנדב</v-card-text>

        <v-col cols="12">
          <v-menu
                  :close-on-content-click="false"
                  :nudge-right="40"
                  min-width="200px"
                  offset-y
                  transition="scale-transition"
                  v-model="dateInput"
          >
            <template v-slot:activator="{ on }">
              <v-text-field label="תאריך תפוגה" readonly v-model="dialogExpirationDate" v-on="on"></v-text-field>
            </template>
            <v-date-picker @input="dateInput = false" v-model="dialogExpirationDate"></v-date-picker>
          </v-menu>
        </v-col>

        <v-card-actions>
          <v-spacer></v-spacer>

          <v-btn @click="closeDialog()" color="green darken-1" text>סגור</v-btn>
          <v-btn @click="setVolunteerFreeze()" color="green darken-1" text>אישור</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </span>
</template>

<script>
  export default {
    computed: {
      bestVolunteers() {
        return this.$store.getters["match/bestVolunteers"];
      },
      isLoading() {
        return this.$store.getters["match/isLoading"];
      },
      getDialogVolunteer() {
        return this.$store.getters["hamalVolunteers/getDialogVolunteer"];
      },
      getDialogExpirationDate() {
        return this.$store.getters["hamalVolunteers/getDialogExpirationDate"];
      },
      getDialogIsVisible() {
        return this.$store.getters["hamalVolunteers/getDialogIsVisible"];
      },
      focusedMissionId() {
        return this.$store.getters["match/getFocusedMissionId"];
      },
      dialogExpirationDate: {
        get() {
          return this.getDialogExpirationDate;
        },
        set(value) {
          this.$store.commit("hamalVolunteers/setDialogExpirationDate", value);
        }
      },
      dialogIsVisible: {
        get() {
          return this.getDialogIsVisible;
        },
        set(value) {
          this.$store.commit("hamalVolunteers/setDialogIsVisible", value);
        }
      },
    },
    methods: {
      //delete
      assignVol(volunteer_id) {
        this.$store.dispatch("match/assignHelpRequestidToVol", {
          volunteer_id: volunteer_id,
        });
      },
      onVolunteerClick(volunteer) {
        this.$store.dispatch("hamalVolunteers/openNewDialog", volunteer);
      },
      closeDialog() {
        this.$store.commit("hamalVolunteers/setDialogIsVisible", false);
      },
      setVolunteerFreeze() {
        this.$store.dispatch("hamalVolunteers/setVolunteerFreeze"); // freeze the volunteer
        this.$store.dispatch("match/reqBestMatch", this.focusedMissionId); // get new list after the freeze
      },
    },
    data() {
      return {
        dateInput: false,
        headers: [
          {text: "מס' מתנדב", value: "id"},
          {text: "שם", value: "full_name"},
          {text: "עיר", value: "city"},
          {text: "טל'", value: "phone_number"},
          {text: "התניידות", value: "moving_way"},
          {text: 'הקפאה', value: 'freeze', sortable: false},
        ],
      };
    },
  };
</script>
