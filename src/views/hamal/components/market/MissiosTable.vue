<template>
    <v-card
            class="mx-auto"
            height="80%"
    >
        <v-card-title class="white--text orange darken-4">
            לחצו על משימה לצפייה במתנדבים פוטנציאלים
            <v-spacer></v-spacer>
            <v-text-field
                    append-icon="mdi-magnify"
                    hide-details
                    label="חיפוש משימה"
                    single-line
                    solo
                    v-model="search"
            ></v-text-field>
        </v-card-title>

        <v-data-table
                :disable-pagination="true"
                :headers="headers"
                :items="open_missions"
                :loading="isLoading"
                :sort-by="['created_date']"
                sort-desc
                :search="search"
                fixed-header
                class="text-subtitle-2"
                hide-default-footer
                @click:row="selectMission"
        >

            <template v-slot:item.created_date="{ item }">
                <span class="text--caption">{{moment(item.created_date).format('DD/MM, h:mm')}}</span>
            </template>
            <template v-slot:item.status="{ item }">
                <v-chip v-text="item.status" :color="getStatusColor(item.status)"></v-chip>

            </template>
            <template v-slot:item.helping_volunteer="{ item }">
                        <span v-if="item.helping_volunteer">
                        <p class="text--caption ma-0">{{item.helping_volunteer.id}}</p>
                        <p class="text--caption ma-0">{{item.helping_volunteer.full_name}}</p>
                        <p class="text--caption ma-0">{{item.helping_volunteer.phone_number}}</p>
                        </span>

            </template>

            <template v-slot:item.actions="{ item }">
                <v-icon
                        small
                        class="mr-2"
                        @click="selectMission(item)"
                >
                    mdi-pencil
                </v-icon>

            </template>
        </v-data-table>


    </v-card>
</template>

<script>
  export default {
    data() {
      return {
        open_missions: this.$store.getters["market/getOpenHelpRequests"],
        search: '',
        headers: [
          {text: 'מספר', value: 'id'},
          {text: 'תאריך', value: 'created_date'},
          {text: 'סטטוס', value: 'status'},
          {text: 'עזרה', value: 'type'},
          {text: 'עיר', value: 'city.name'},
          {text: 'שם', value: 'full_name'},
          {text: 'טלפון', value: 'phone_number'},
          {text: 'מתנדב', value: 'helping_volunteer'},
          {text: 'פירוט', value: 'type_text'},
          {text: 'חמליסט', value: 'status_updater'},
          {text: 'הערות חמל', value: 'notes'},
          { text: 'איתור מתנדבים', value: 'actions', sortable: false },

        ],
      }
    },
    computed: {
      isLoading() {
        return this.$store.getters["market/isLoading"];
      },

    },


    methods: {
      selectMission(item) {
        this.$store.commit("market/currentHelpRequest", item);
        this.$store.dispatch("market/reqBestMatch", item.id);
        this.$store.dispatch("market/getHelpRequestGeo", item.id);
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
  }
</script>
