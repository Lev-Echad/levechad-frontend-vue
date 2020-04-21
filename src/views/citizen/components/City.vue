<template>
  <div>
    <v-autocomplete
      v-model="model"
      :items="items"
      :loading="isLoading"
      :search-input.sync="search"
      hide-no-data
      label="עיר"
      placeholder="הקליד/י בשביל לחפש"
      prepend-icon="mdi-city"
      no-data-text="אין מידע"
      cache-items
      :error="error"
    ></v-autocomplete>
  </div>
</template>

<script>
export default {
  data: () => ({
    entries: [],
    isLoading: false,
    model: null,
    search: null,
    error: false,
  }),
  computed: {
    items() {
      let resCitiesList = this.$store.getters["api/getCitiesList"];
      return resCitiesList;
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
    model(val) {
      if (val) {
        this.error = false;
        this.$store.commit("api/setHelpRequestCityValid", true);
        this.$store.commit("api/setHelpRequestFormField", { city: this.model });
      }
      if (!val) {
        this.error = true;
        this.$store.commit("api/setHelpRequestCityValid", false);
        this.$store.commit("api/setHelpRequestFormField", { city: "" });
      }
    },
  },
};
</script>
