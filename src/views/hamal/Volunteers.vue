<template>
  <div>
    <div class="loading">
      <v-text-field class="mb-0" v-if="getIsLoading" color="success" loading disabled></v-text-field>
    </div>

    <v-snackbar v-model="isSnackbarVisible">
      {{ getMessage }}
      <v-btn color="primary" text @click="closeSnackbar()">Close</v-btn>
    </v-snackbar>

    <v-dialog v-model="dialogIsVisible" max-width="300">
      <v-card>
        <v-card-title
          class="headline"
        >האם ברצונך להקפיא את {{ getDialogVolunteer.first_name }} {{ getDialogVolunteer.last_name }} ?</v-card-title>

        <v-card-text>בחר עד מתי להקפיא את המתנדב</v-card-text>

        <v-col cols="12">
          <v-menu
            v-model="dateInput"
            :close-on-content-click="false"
            :nudge-right="40"
            transition="scale-transition"
            offset-y
            min-width="200px"
          >
            <template v-slot:activator="{ on }">
              <v-text-field v-model="dialogExpirationDate" label="תאריך תפוגה" readonly v-on="on"></v-text-field>
            </template>
            <v-date-picker v-model="dialogExpirationDate" @input="dateInput = false"></v-date-picker>
          </v-menu>
        </v-col>

        <v-card-actions>
          <v-spacer></v-spacer>

          <v-btn color="green darken-1" text @click="closeDialog()">סגור</v-btn>
          <v-btn color="green darken-1" text @click="setVolunteerFreeze()">אישור</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <div class="filter-section">
      <span>סנן לפי</span>
      <v-row>
        <v-col cols="2">
          <v-text-field
            v-model="id"
            label="מס' מתנדב"
            outlined
            append-icon="mdi-account-details"
            @keyup="onFilterChange()"
            @change="onFilterChange()"
          ></v-text-field>
        </v-col>
        <v-col cols="2">
          <v-text-field
            v-model="tz_number"
            label="תעודת זהות"
            outlined
            append-icon="mdi-numeric-9-box-multiple-outline"
            @keyup="onFilterChange()"
            @change="onFilterChange()"
          ></v-text-field>
        </v-col>
        <v-col cols="2">
          <v-text-field
            v-model="phone_number"
            label="נייד"
            outlined
            append-icon="mdi-phone"
            @keyup="onFilterChange()"
            @change="onFilterChange()"
          ></v-text-field>
        </v-col>
        <v-col cols="2">
        <v-autocomplete
          v-model="city_filter"
          outlined
          :items="city_list"
          :search-input.sync="search"
          clearable
          label="עיר"
          append-icon="mdi-city"
          @keyup="onFilterChange()"
          @change="onFilterChange()"
      ></v-autocomplete>
        </v-col>
        <v-col cols="2">
          <v-text-field
            v-model="areas"
            label="חמ״ל"
            outlined
            append-icon="mdi-desktop-classic"
            @keyup="onFilterChange()"
            @change="onFilterChange()"
          ></v-text-field>
        </v-col>
        <v-col cols="2">
          <v-text-field
            v-model="organization"
            label="ארגון"
            outlined
            append-icon="mdi-home-modern"
            @keyup="onFilterChange()"
            @change="onFilterChange()"
          ></v-text-field>
        </v-col>
      </v-row>

      <div class="pagination-container">
        <span
          v-if="getShownResultsCount > 0"
        >דף מס׳ {{ getCurrentPage }}/{{ Math.ceil(getAllVolunteersCount / 30) }}</span>
        <span v-else>אין תוצאות</span>

        <span>
          <v-btn id="previous" @click="loadPreviousPage()" :disabled="!(getPreviousPage !== null)">
            <v-icon>mdi-arrow-right</v-icon>דף קודם
          </v-btn>
          <v-btn id="next" @click="loadNextPage()" :disabled="!(getNextPage !== null)">
            דף הבא
            <v-icon>mdi-arrow-left</v-icon>
          </v-btn>
        </span>
        <span
          class="text-results-count"
          v-if="30 * getCurrentPage <= getAllVolunteersCount && getAllVolunteersCount > 0"
        >מציג {{ 30 * getCurrentPage }}-{{ getShownResultsCount * (getCurrentPage - 1) + 1 }} מתוך {{ getAllVolunteersCount }} מתנדבים</span>
        <span v-else-if="getAllVolunteersCount === 0">אין נתונים להציג</span>
        <span
          v-else
        >מציג {{ getAllVolunteersCount }}-{{ 30 * (getCurrentPage - 1) + 1 }} מתוך {{ getAllVolunteersCount }} מתנדבים</span>
      </div>
    </div>
    <v-row>
            <div class="pl-3"></div>

        <v-toolbar flat color="white">
        <v-toolbar-title>מתנדבים</v-toolbar-title>
        <v-divider
          class="mx-4"
          inset
          vertical
        ></v-divider>
      <div class="pl-3"></div>
      <v-chip class="pl-3 m-12">
      <download-excel
        :data="volunteers"
        name = "מתנדבים.xls"
        :fields ="excel_fields"
      >
        יצא לאקסל
      <v-icon
          small
          class="mr-2"
        >
          mdi-download
        </v-icon>
      </download-excel>
      </v-chip>
        </v-toolbar>
    </v-row>

    <v-data-table
      :headers="headers"
      :items="volunteers"
      sort-by="tz_number"
      class="table"
      single-select>
      <template v-slot:top>
        <v-spacer></v-spacer>
        <v-dialog v-model="dialog" max-width="500px">
          <v-card>
            <v-card-title>
              <span class="headline">{{ formTitle }}</span>
            </v-card-title>
            <v-card-text>
              <v-container>
                <v-row>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field v-model="editedItem.first_name" label="שם פרטי"></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field v-model="editedItem.last_name" label="שם משפחה"></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field v-model="editedItem.phone_number" label="פלא"></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                  <v-autocomplete
                    v-model="editedItem.city.name"
                    :items="city_list"
                    :search-input.sync="search2"
                    label="עיר"
                ></v-autocomplete>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field v-model="editedItem.address" label="כתובת"></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field v-model="editedItem.email" label="מייל"></v-text-field>
                  </v-col>
                  <!-- <v-col cols="12" sm="6" md="4">
                    <v-text-field v-model="editedItem.organization" label="ארגון"></v-text-field>
                  </v-col> -->
                </v-row>
              </v-container>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="close">ביטול</v-btn>
              <v-btn color="blue darken-1" text @click="save">שמור</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
    </template>
    <template v-slot:item.actions="{ item }">
      <v-icon
        small
        class="mr-2"
        @click="editItem(item)"
      >
        mdi-pencil
      </v-icon>
    </template>
    <template v-slot:item.freeze="{ item }">
      <v-icon
        small
        class="mr-2"
        @click="onVolunteerClick(item)"
      >
        mdi-snowflake
      </v-icon>
    </template>
    <template v-slot:no-data>
      <v-btn color="primary" @click="reset()">Reset</v-btn>
    </template>
    </v-data-table>  
  </div>
  
</template>

<script>
import { mapActions, mapGetters, mapState, mapMutations } from "vuex";
import { log } from "util";
import _ from "lodash";

export default {
  mounted() {
    this.$store.dispatch("hamalVolunteers/loadFirstPage");
  },
   data: () => ({
     dialog: false,
      loading: true,
      options: {},
      dateInput: false,
      search:null,
      search2:null,
      headers: [
        { text: 'עריכה', value: 'actions', sortable: false },
        { text: 'הקפאה', value: 'freeze', sortable: false },
        { text: "מס' מתנדב'", value: "id" },
        { text: "תעודת זהות'", value: "tz_number" },
        { text: "שם פרטי", value: "first_name" },
        { text: "שם משפחה", value: "last_name" },
        { text: "טלפון", value: "phone_number" },
        { text: "תאריך לידה", value: "date_of_birth" },
        { text: "גיל", value: "age" },
        { text: "מין", value: "gender" },
        { text: "עיר", value: "city[name]" },
        { text: "כתובת", value: "address" },
        { text: "חמל", value: "areas" },
        { text: 'ארגון', value: 'organization'},
        { text: 'התניידות', value: 'moving_way'},
        { text: 'משימות בשבוע', value: 'week_assignments_capacity'},
        { text: 'משימות ', value: 'wanted_assignments'},
        { text: 'אימייל', value: 'email'},
        { text: 'ציון', value: 'score'},
        { text: 'כמות פעמים', value: 'times_volunteered'},
        { text: 'שפות', value: 'languages'},
      ],
      excel_fields: {
        "תעודת זהות":"tz_number",
        "אימייל":"email",
        " שם פרטי":"first_name",
        " שם משפחה":"last_name",
        " טלפון":"phone_number",
        " תאריך לידה":"date_of_birth",
        " מין":"gender",
        " עיר":"city.name",
        " כתובת":"address",
        " חמל":"areas",
        " ארגון":"organization",
        " התניידות":"moving_way",
        " משימות בשבוע":"week_assignments_capacity",
        " משימות":"times_volunteered",
        " שפות":"languages",
      },
      editedIndex: -1,
      editedItem: {
        tz_number: '',
        first_name: 0,
        last_name: 0,
        phone_number: 0,
        city: 0,
        address: 0,
        reason: 0,
        created_date: 0,
        actions:0
      },
      defaultItem: {
        tz_number: '',
        first_name: 0,
        last_name: 0,
        phone_number: 0,
        city: 0,
        address: 0,
        reason: 0,
        created_date: 0,
        actions:0
      },
    }),
  methods: {
    reset(){
      this.$store.dispatch("hamalVolunteers/loadFirstPage");
    },
    onFilterChange: _.debounce(function() {
      this.$store.dispatch("hamalVolunteers/loadFilteredVolunteers");
    }, 100),
    onVolunteerClick(volunteer) {
      this.$store.dispatch("hamalVolunteers/openNewDialog", volunteer);
    },
    closeDialog() {
      this.$store.commit("hamalVolunteers/setDialogIsVisible", false);
    },
    closeSnackbar() {
      this.$store.commit("hamalVolunteers/setIsSnackbarVisible", false);
    },
    setVolunteerFreeze() {
      this.$store.dispatch("hamalVolunteers/setVolunteerFreeze");
    },
    loadNextPage() {
      this.$store.dispatch("hamalVolunteers/loadNextPage");
    },
    loadPreviousPage() {
      this.$store.dispatch("hamalVolunteers/loadPreviousPage");
    },
    editItem (item) {
      this.editedIndex = this.volunteers.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.dialog = true
    },
    close () {
      this.dialog = false
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
      })
    },

    save () {
      if (this.editedIndex > -1) {
        Object.assign(this.volunteers[this.editedIndex], this.editedItem)
        this.$store.dispatch("hamalVolunteers/updatevolunteer",this.editedItem)
      }
      this.close()
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
    search2(val) {
      if (val) {
        if (val.length > 1) {
          this.$store.dispatch("api/reqCitiesAutoComplete", val);
        }
      }
    },
    dialog (val) {
        val || this.close()
      },
    },
  computed: {
    city_list() {
      let resCitiesList = this.$store.getters["api/getCitiesList"];
      return resCitiesList;
    },
    volunteers(){
        return this.$store.getters["hamalVolunteers/getVolunteers"];

    },
    formTitle () {
        return 'ערוך מתנדב'
    },
    ...mapGetters("hamalVolunteers", [
      "getVolunteers",
      "getAllVolunteersCount",
      "getShownResultsCount",
      "getIsLoading",
      "getFilterTz",
      "getFilterPhone",
      "getFilterCity",
      "getFilterAreas",
      "getFilterOrganization",
      "getFilterId",
      "getCurrentPage",
      "getNextPage",
      "getPreviousPage",
      "getDialogIsVisible",
      "getDialogVolunteer",
      "getDialogExpirationDate",
      "getMessage",
      "getIsSnackbarVisible"
    ]),
    tz_number: {
      get() {
        return this.getFilterTz;
      },
      set(value) {
        this.$store.commit("hamalVolunteers/setFilterTz", value);
      }
    },
    phone_number: {
      get() {
        return this.getFilterPhone;
      },
      set(value) {
        this.$store.commit("hamalVolunteers/setFilterPhone", value);
      }
    },
    city_filter: {
      get() {
        return this.getFilterCity;
      },
      set(value) {
        this.$store.commit("hamalVolunteers/setFilterCity", value);
      }
    },
    areas: {
      get() {
        return this.getFilterAreas;
      },
      set(value) {
        this.$store.commit("hamalVolunteers/setFilterAreas", value);
      }
    },
    organization: {
      get() {
        return this.getFilterOrganization;
      },
      set(value) {
        this.$store.commit("hamalVolunteers/setFilterOrganization", value);
      }
    },
    id: {
      get() {
        return this.getFilterId;
      },
      set(value) {
        this.$store.commit("hamalVolunteers/setFilterId", value);
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
    dialogExpirationDate: {
      get() {
        return this.getDialogExpirationDate;
      },
      set(value) {
        this.$store.commit("hamalVolunteers/setDialogExpirationDate", value);
      }
    },
    message: {
      get() {
        return this.getMessage;
      },
      set(value) {
        this.$store.commit("hamalVolunteers/setDialogMessage", value);
      }
    },
    isSnackbarVisible: {
      get() {
        return this.getIsSnackbarVisible;
      },
      set(value) {
        this.$store.commit("hamalVolunteers/setIsSnackbarVisible", value);
      }
    }
  },
};
</script>

<style scoped>
.filter-section {
  margin: 0 14px;
}

.loading {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  height: 40px;
}

.table {
  border: 1px solid lightgray;
  margin: 14px;
}

.table-row {
  cursor: pointer;
}

.pagination-container {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}

#next {
  margin-right: 12px;
}
</style>
