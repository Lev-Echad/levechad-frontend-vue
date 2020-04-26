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
        <v-col cols="3">
          <v-text-field
            v-model="tz_number"
            label="תעודת זהות"
            outlined
            append-icon="mdi-account-details"
            @keyup="onFilterChange()"
          ></v-text-field>
        </v-col>
        <v-col cols="3">
          <v-text-field
            v-model="phone_number"
            label="טלפון"
            outlined
            append-icon="mdi-phone"
            @keyup="onFilterChange()"
          ></v-text-field>
        </v-col>
        <v-col cols="2">
          <v-text-field
            v-model="city"
            label="עיר"
            outlined
            append-icon="mdi-city"
            @keyup="onFilterChange()"
          ></v-text-field>
        </v-col>
        <v-col cols="2">
          <v-text-field
            v-model="areas"
            label="חמ״ל"
            outlined
            append-icon="mdi-desktop-classic"
            @keyup="onFilterChange()"
          ></v-text-field>
        </v-col>
        <v-col cols="2">
          <v-text-field
            v-model="organization"
            label="ארגון"
            outlined
            append-icon="mdi-home-modern"
            @keyup="onFilterChange()"
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

    <v-simple-table class="table" height="80vh">
      <thead>
        <tr>
          <th>תעודת זהות</th>
          <th>שם פרטי</th>
          <th>שם משפחה</th>
          <th>טלפון</th>
          <th>תאריך לידה</th>
          <th>גיל</th>
          <th>מין</th>
          <th>עיר</th>
          <th>כתובת</th>
          <th>חמל</th>
          <th>ארגון</th>
          <th>התניידות</th>
          <th>משימות בשבוע</th>
          <th>משימות</th>
          <th>אימייל</th>
          <th>ציון</th>
          <th>כמות פעמים</th>
          <th>שפות</th>
        </tr>
      </thead>
      <tbody>
        <tr
          class="table-row"
          v-for="item in getVolunteers"
          :key="item.name"
          @click="onVolunteerClick(item)"
        >
          <td>{{ item.tz_number }}</td>
          <td>{{ item.first_name }}</td>
          <td>{{ item.last_name }}</td>
          <td>{{ item.phone_number }}</td>
          <td>{{ item.date_of_birth }}</td>
          <td>{{ item.age }}</td>
          <td>{{ item.gender }}</td>
          <td>{{ item.city.name }}</td>
          <td>{{ item.address }}</td>
          <td>{{ item.areas }}</td>
          <td>{{ item.organization }}</td>
          <td>{{ item.moving_way }}</td>
          <td>{{ item.week_assignments_capacity }}</td>
          <td>{{ (item.wanted_assignments).toString() }}</td>
          <td>{{ item.email }}</td>
          <td>{{ item.score }}</td>
          <td>{{ item.times_volunteered }}</td>
          <td>{{ (item.languages).toString() }}</td>
        </tr>
      </tbody>
    </v-simple-table>
  </div>
</template>

<script>
import { mapActions, mapGetters, mapState, mapMutations } from "vuex";
import { log } from "util";
import _ from "lodash";

export default {
  mounted() {
    if (
      this.getFilterTz === "" &&
      this.getFilterPhone === "" &&
      this.getFilterCity === "" &&
      this.getFilterAreas === "" &&
      this.getFilterOrganization === ""
    ) {
      this.$store.dispatch("hamalVolunteers/loadFirstPage");
    }
  },
  data: () => ({
    date: new Date().toISOString().substr(0, 10),
    dateInput: false
  }),
  methods: {
    onFilterChange: _.debounce(function() {
      this.$store.dispatch("hamalVolunteers/loadFilteredVolunteers");
    }, 600),
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
    }
  },
  computed: {
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
    city: {
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
  }
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
