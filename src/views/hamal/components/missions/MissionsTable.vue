<template>
  <div>
  
    <v-data-table
      :headers="headers"
      :items="missionList"
      :items-per-page="25"
      class="elevation-1"
      
    >
      <template  v-slot:item.status="{ item }">
        <v-chip :color="getStatusColor(item.status)" dark>{{
          item.status
        }}</v-chip>
      </template>
    </v-data-table>
  </div>
</template>

<script>
export default {
  props: ["missionList"],
  data() {
    return {
      headers: [
        { text: "סטטוס", value: "status" },
        { text: "עיר", value: "city" },
        { text: "סוג עזרה", value: "type" },
        { text: "איזור", value: "area" },
        { text: "סיבה", value: "reason" },
        { text: "שם מלא", value: "full_name" },
        { text: "מועד פתיחה", value: "timestamp" },
        { text: "Fat (g)", value: "city" },
      ],
    };
  },
  methods:{
    getStatusColor(status){
      let color = 'white'
      switch(status){
        case 'התקבלה':
          color = 'info'
          break
        case 'בטיפול':
          color = 'orange'
          break
        case 'הועבר למתנדב':
          color = 'orange'
          break
        case 'טופל':
          color = 'green'
          break
        case 'לא טופל':
          color = 'red'
          break
          
      }
      return color
    }
  }
};
</script>
