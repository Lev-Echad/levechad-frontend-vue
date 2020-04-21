<template>
  <div>
    <div v-if="!isLoading">
      <v-simple-table>
        <template v-slot:default>
          <thead>
            <tr>
              <th>id</th>
              <th>שם פרטי</th>
              <th>שם משפחה</th>
              <th>תז</th>
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
              <th>תאריך יצירה</th>
              <th>כמות פעמים</th>
              <th>שפות</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in volunteersList" :key="item.name">
              <td>{{ item.id }}</td>
              <td>{{ item.first_name }}</td>
              <td>{{ item.last_name }}</td>
              <td>{{ item.tz_number }}</td>
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
              <td>{{ (item.wanted_assignments).toString()  }}</td>
              <td>{{ item.email }}</td>
              <td>{{ item.score }}</td>
              <td>{{ item.created_date }}</td>
              <td>{{ item.times_volunteered }}</td>
              <td>{{ (item.languages).toString() }}</td>
            </tr>
          </tbody>
        </template>
      </v-simple-table>
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    volunteersList() {
      return this.$store.getters["api/getVolunteersList"];
    },
    isLoading() {
      return this.$store.getters["api/isLoading"];
    },
  },
};
</script>
