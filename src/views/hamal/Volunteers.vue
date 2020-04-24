<template>
  <div>
    <VolFilter />
    <v-row align="center">
      <v-col cols="4">
        <v-card>
          <span>מציג 25 מתנדבים מתוך: </span>
          <span class="red--text">{{ volunteerPage.count }}</span>
        </v-card>
      </v-col>
      <v-col cols="4">
        <v-btn :disabled="!volunteerPage.previous" @click="changePage(volunteerPage.current-1)">עמוד קודם</v-btn>
        <v-btn :disabled="!volunteerPage.next" @click="changePage(volunteerPage.current+1)">עמוד הבא</v-btn>
      </v-col>
    </v-row>
    <VolList />
  </div>
</template>

<script>
import VolList from "./components/volunteers/List";
import VolFilter from "./components/volunteers/Filter";
export default {
  methods: {
    changePage(page_number) {

      this.$store.commit("api/setVolunteerPage",page_number)
      this.$store.dispatch("api/reqGetVolunteers");
    },
  },
  mounted() {
    this.$store.dispatch("api/reqGetVolunteers");
  },
  components: { VolList, VolFilter },
  computed: {
    volunteersList() {
      return this.$store.getters["api/getVolunteersList"];
    },
    isLoading() {
      return this.$store.getters["api/isLoading"];
    },
    volunteerPage() {
      return this.$store.getters["api/getVolunteerPage"];
    },



  },
};
</script>
