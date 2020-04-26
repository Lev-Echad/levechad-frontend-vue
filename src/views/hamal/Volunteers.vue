<template>
  <div>
    <div class="loading">
      <v-text-field class="mb-0" v-if="getIsLoading" color="success" loading disabled></v-text-field>
    </div>

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
        <tr v-for="item in getVolunteers" :key="item.name">
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
      this.$store.dispatch("loadFirstPage");
    }
  },
  methods: {
    onFilterChange: _.debounce(function() {
      this.$store.dispatch("loadFilteredVolunteers");
    }, 600),
    loadNextPage() {
      this.$store.dispatch("loadNextPage");
    },
    loadPreviousPage() {
      this.$store.dispatch("loadPreviousPage");
    }
  },
  computed: {
    ...mapGetters([
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
      "getPreviousPage"
    ]),
    tz_number: {
      get() {
        return this.getFilterTz;
      },
      set(value) {
        this.$store.commit("setFilterTz", value);
      }
    },
    phone_number: {
      get() {
        return this.getFilterPhone;
      },
      set(value) {
        this.$store.commit("setFilterPhone", value);
      }
    },
    city: {
      get() {
        return this.getFilterCity;
      },
      set(value) {
        this.$store.commit("setFilterCity", value);
      }
    },
    areas: {
      get() {
        return this.getFilterAreas;
      },
      set(value) {
        this.$store.commit("setFilterAreas", value);
      }
    },
    organization: {
      get() {
        return this.getFilterOrganization;
      },
      set(value) {
        this.$store.commit("setFilterOrganization", value);
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

.pagination-container {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}

#next {
  margin-right: 12px;
}
</style>
