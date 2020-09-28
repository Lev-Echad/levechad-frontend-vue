<template>
    <v-card>

        <v-card :color="getStatusColor(focusedMission.status)" class="text-center white--text">
            <p class="ma-0"> משימה מספר {{ focusedMission.id }} </p>
            <strong>{{ focusedMission.status }}</strong>
        </v-card>
        <v-list class="pa-0" color="grey lighten-4" dense subheader>

            <v-subheader class="black--text">פרטי הבקשה</v-subheader>

            <v-list-item class="px-1">
                <v-list-item-icon>
                    <v-icon>mdi-calendar-clock</v-icon>
                </v-list-item-icon>
                <v-list-item-content class="caption">{{moment(focusedMission.created_date).format('DD/MM/YY, hh:mm')}}</v-list-item-content>
            </v-list-item>
            <v-list-item class="px-1">
                <v-list-item-icon>
                    <v-icon>mdi-account</v-icon>
                </v-list-item-icon>
                <v-list-item-content>{{focusedMission.full_name}}</v-list-item-content>
            </v-list-item>
            <v-list-item class="px-1">
                <v-list-item-icon>
                    <v-icon>mdi-phone</v-icon>
                </v-list-item-icon>
                <v-list-item-content>{{focusedMission.phone_number}}</v-list-item-content>
            </v-list-item>
            <v-list-item class="px-1" v-if="focusedMission.city">
                <v-list-item-icon>
                    <v-icon>mdi-city</v-icon>
                </v-list-item-icon>
                <v-list-item-content>{{focusedMission.city.name}}</v-list-item-content>
            </v-list-item>

            <v-list-item class="px-1">
                <v-list-item-icon>
                    <v-icon>mdi-home</v-icon>
                </v-list-item-icon>
                <v-list-item-content>{{focusedMission.address}}</v-list-item-content>
            </v-list-item>

            <v-list-item class="px-1">
                <v-list-item-icon>
                    <v-icon>mdi-hand</v-icon>
                </v-list-item-icon>
                <v-list-item-content>{{focusedMission.type}}</v-list-item-content>
            </v-list-item>
        </v-list>


        <v-col class="pa-0 ma-0" cols="12">
            <v-card class="ma-0 elevation-0 caption" color="grey lighten-4">
                {{ focusedMission.type_text }}
            </v-card>
        </v-col>
        <v-divider></v-divider>
        <v-list class="caption" color="light-green" dense subheader v-if="focusedMission.helping_volunteer">
            <v-subheader class="black--text">פרטי מתנדב שהוקצה</v-subheader>
            <v-list-item class="px-1">
                <v-list-item-icon>
                    <v-icon>mdi-card-account-details-outline</v-icon>
                </v-list-item-icon>
                <v-list-item-content>מס' מתנדב: {{ focusedMission.helping_volunteer.id}}</v-list-item-content>
            </v-list-item>
            <v-list-item class="px-1">
                <v-list-item-icon>
                    <v-icon>mdi-account-check</v-icon>
                </v-list-item-icon>
                <v-list-item-content>{{focusedMission.helping_volunteer.full_name}}</v-list-item-content>
            </v-list-item>
            <v-list-item class="px-1">
                <v-list-item-icon>
                    <v-icon>mdi-phone</v-icon>
                </v-list-item-icon>
                <v-list-item-content>{{focusedMission.helping_volunteer.phone_number}}</v-list-item-content>
            </v-list-item>
        </v-list>

        <v-divider></v-divider>

        <v-row class="my-0 mx-0">
            <v-list class="py-0 my-0" dense subheader>
                <v-subheader class="black--text py-0">עדכון משימה</v-subheader>
            </v-list>
            <v-col class="py-0" cols="12">
                <v-select color="indigo" :items="status_items" label="סטטוס" v-model="HamalHelpRequestFields.status"></v-select>

                <v-text-field
                        label="מס' מתנדב"
                        outlined=""
                        color="indigo"
                        v-model="HamalHelpRequestFields.helping_volunteer"
                        v-show="HamalHelpRequestFields.status=='TO_VOLUNTER'"
                >
                </v-text-field>
                <v-textarea
                        class="pt-2"
                        hint="דברים שקשורים לפניה"
                        label='הערות חמ"ל'
                        outlined=""
                        color="indigo"
                        v-model="HamalHelpRequestFields.notes"
                >
                </v-textarea>
                <v-text-field
                        label="חמליסט מטפל"
                        outlined=""
                        color="indigo"
                        v-model="HamalHelpRequestFields.status_updater"
                >
                </v-text-field>
            </v-col>
            <v-col cols="12">
                <p class="primary--text"
                   v-show="!HamalHelpRequestFields.helping_volunteer && (HamalHelpRequestFields.status=='TO_VOLUNTER')">
                    יש לעדכן מספר מתנדב לפני שמירה!</p>
                <v-btn

                        :disabled="!HamalHelpRequestFields.helping_volunteer && (HamalHelpRequestFields.status=='TO_VOLUNTER')"
                        @click="saveChanges()" class="success" raised>
                    שמירה
                </v-btn>
            </v-col>
        </v-row>

    </v-card>

</template>

<script>

  export default {
    data() {
      return {
        status_items: [
          {
            value: "WAITING",
            text: "התקבלה",
          },
          {
            value: "IN_CARE",
            text: "בטיפול חמל",
          },
          {
            value: "TO_VOLUNTER",
            text: "הועבר למתנדב",
          },
          {
            value: "DONE",
            text: "בוצעה",
          },
          {
            value: "NOT_DONE",
            text: "לא רלוונטית",
          }
        ]
      }
    },
    computed: {
      focusedMission: {
        get() {
          return this.$store.getters["market/currentHelpRequest"];
        },
      },
      helpingVolunteerDetails() {
        return this.focusedMission.helping_volunteer
      },
      isLoading() {
        return this.$store.getters["match/isLoading"];
      },
      HamalHelpRequestFields() {
        return this.$store.getters["market/HamalHelpRequestFields"];
      },

    },

    mounted() {
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