<template>
  <div>
    <v-data-table
      :headers="headers"
      :items="helpRequests"
      :options.sync="options"
      :server-items-length="totalHelpRequests"
      :loading="isLoading"
      class="elevation-1"
    ></v-data-table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      totalDesserts: 0,
      desserts: [],
      loading: true,
      options: {},
      headers: [
        { text: "מס'", value: "id" },
        { text: "סטטוס", value: "status" },
        { text: "שם מלא", value: "full_name" },
        { text: "סוג", value: "status" },
        { text: "עיר", value: "city[name]" },
        { text: "סוג עזרה", value: "type" },
        { text: "איזור", value: "area" },
        { text: "כתובת", value: "address" },
        { text: "סיבה", value: "reason" },
        { text: "תאריך", value: "created_date" },
        //   { text: "מועד פתיחה", value: "timestamp" },
        //   { text: "Fat (g)", value: "city" },
      ],
    };
  },
  computed: {
    helpRequests() {
      return this.$store.getters["helpRequests/helpRequests"];
    },
    totalHelpRequests() {
      return this.$store.getters["helpRequests/totalHelpRequests"];
    },
    isLoading() {
      return this.$store.getters["helpRequests/isLoading"];
    },
  },
  // watch: {
  //   options: {
  //     handler () {
  //       this.getDataFromApi()
  //         .then(data => {
  //           this.desserts = data.items
  //           this.totalDesserts = data.total
  //         })
  //     },
  //     deep: true,
  //   },
  // },
  mounted() {
    this.$store.dispatch("helpRequests/reqHelpRequests");
  },
};
</script>
