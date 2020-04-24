<template>
      <v-row class="pa-5">
     <v-col
        v-for="(statCard, index) in statCards"
        :key="index"
        cols="12"
        sm="6"
        lg="3"
      >
        <base-material-stats-card
          :color="statCard.color"
          :icon="statCard.icon"
          :title="statCard.title"
          :value="statCard.value"
          :sub-icon="statCard['sub-icon']"
          :sub-text="statCard['sub-text']"

        />
      </v-col>

    </v-row>
</template>

<script>
export default {
    data(){
    return{
      statCards:[
        {
          color: 'info',
          icon: 'mdi-alarm-light',
          title: 'משימות חדשות',
          value: '351',
          "sub-icon": '',
          "sub-text": 'asd',

        },
        {
          color: 'success',
          icon: 'mdi-check-outline',
          title: 'משימות שבוצעו',
          value: '230',
          "sub-icon": '',
          "sub-text": 'asd',
        },
        {
          color: 'orange',
          icon: 'mdi-bike',
          title: 'משימות בביצוע',
          value: '50',
          "sub-icon": '',
          "sub-text": 'asd',
        },
        {
          color: 'red',
          icon: 'mdi-alert',
          title: 'משימות פתוחות',
          value: '70',
          "sub-icon": '',
          "sub-text": 'asd',
        },
        // {
        //   color: 'info',
        //   icon: 'mdi-account',
        //   title: 'מתנדבים חדשים',
        //   value: '121',
        //   "sub-icon": 'mdi-account',
        //   "sub-text": 'asd',

        // },
      ],
    }
    }
}
</script>