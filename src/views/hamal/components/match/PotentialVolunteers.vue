<template>
  <span v-if="bestVolunteers">
    <v-card height="650">
      <div>
        <v-data-table
          dense=""
          :headers="headers"
          :items="bestVolunteers"
          :loading="isLoading"
          :items-per-page="20"
          class="elevation-1"
          hide-default-footer
        >
          <template v-slot:item.actions="{ item }">
            <v-icon small @click="assignVol(item.id)">
              mdi-check
            </v-icon>
          </template>
        </v-data-table>
      </div>
    </v-card>
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
  },
  methods: {
    assignVol(volunteer_id) {
      this.$store.dispatch("match/assignHelpRequestidToVol", {
        volunteer_id: volunteer_id,
      });
    },
  },
  data() {
    return {
      headers: [
        { text: "מס'", value: "id" },
        { text: "שם", value: "full_name" },
        { text: "עיר", value: "city" },
        //  { text: "Calories", value: "address" },
        { text: "טל'", value: "phone_number" },
        { text: "התניידות", value: "moving_way" },
        { text: "", value: "actions" },
      ],
    };
  },
};
</script>
