<template>
  <span v-if="bestVolunteers">
    <v-card >
      <div>
        <v-data-table
                :headers="headers"
                :items="bestVolunteers"
                item-key="id"
                :items-per-page="20"
                :loading="isLoading"
                ref="dTable1"
                class="elevation-1 black--text "

                :single-select="true"
                hide-default-footer
                @click:row="clickVolunteer"

        >
<!--          -->
          <template v-slot:item.id="{ item }">
            <span :class="item.id === currentVolunteer.id ? 'custom-highlight-row' : ''">
              {{item.id}}
            </span>
          </template>
            <template v-slot:item.phone_number="{ item }">
            <span class="text-subtitle-2" v-text="prettyPhoneNumber(item.phone_number)">

            </span>
          </template>


              <template v-slot:item.freeze="{ item }">
                <div class="text--black">
                  <v-btn color="primary" outlined x-small @click="freeze(item, 1)" >יום</v-btn>
                  <v-btn color="primary" outlined x-small @click="freeze(item, 7)" >שבוע</v-btn>
                  <v-btn color="primary" outlined x-small @click="freeze(item, 365)">שנה</v-btn>
                  <v-btn color="primary" outlined x-small @click="onVolunteerClick(item)" >בחירת תאריך</v-btn>
                </div>


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

      <v-snackbar
              v-model="snackbar"
              timeout="5000"
      >
          המתנדב הוקפא
      <template v-slot:action="{ attrs }">
        <v-btn
                color="red"
                text
                v-bind="attrs"
                @click="unFreeze()"
        >
          ביטול הקפאה
        </v-btn>
      </template>
      </v-snackbar>
  </span>
</template>

<script>
  export default {
    mounted() {

    },
    computed: {
      bestVolunteers() {
        return this.$store.getters["market/bestVolunteers"];
      },
      isLoading() {
        return this.$store.getters["market/isLoading"];
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
      currentHelpRequest() {
        return this.$store.getters["market/currentHelpRequest"];
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
      currentVolunteer: {
        get() {
          return this.$store.getters["market/currentVolunteer"];
        },
        set(value) {
          this.$store.commit("market/currentVolunteer", value);
        }
      },
    },
    methods: {
      prettyPhoneNumber(phone_number){
        var txt2 = phone_number.slice(0, 3) + "-" + phone_number.slice(3);
        return txt2
      },

      onVolunteerClick(volunteer) {
        this.$store.dispatch("hamalVolunteers/openNewDialog", volunteer);
      },
      closeDialog() {
        this.$store.commit("hamalVolunteers/setDialogIsVisible", false);
      },
      setVolunteerFreeze() {
        // @TODO: unfreeze for custom date
        this.$store.dispatch("hamalVolunteers/setVolunteerFreeze"); // freeze the volunteer
        this.$store.dispatch("market/reqBestMatch", this.currentHelpRequest.id); // get new list after the freeze
      },

      freeze(item, days_to_freeze){
        this.$store.dispatch("market/volunteerFreeze", {
          'volunteer': item,
          'days_to_freeze': days_to_freeze
        });
        this.$store.dispatch("market/reqBestMatch", this.currentHelpRequest.id); // get new list after the freeze
        this.freezed_item = item
        this.days_to_freeze = days_to_freeze
        this.snackbar=true
      },
      unFreeze(){
        this.snackbar=false
        this.$store.dispatch("market/volunteerUnfreeze", this.freezed_item.id);

       // this.$store.dispatch("market/reqBestMatch", this.currentHelpRequest.id); // get new list after the freeze
      },
      openSnackBar(item, days_to_freeze){

      },
      clickVolunteer(item, row){

        this.currentVolunteer = item
      }
    },
    // watch:{
    //   currentVolunteer(val){
    //     this.selectedVol = val
    //   }
    // },
    data() {
      return {
        dateInput: false,
        snackbar: false,
        freezed_item: '',
        days_to_freeze: 0,
        headers: [
          {text: "מס' מתנ'", value: "id"},
          {text: "שם", value: "full_name"},
          {text: "עיר", value: "city"},
          {text: "טל'", value: "phone_number"},
          {text: "התניידות", value: "moving_way"},
          {text: 'מחיקת המתנדב למשך', value: 'freeze', sortable: false, color: 'red'},
        ],
      };
    },
  };
</script>
<style scoped>
  .custom-highlight-row {
    background: greenyellow;
  }
</style>