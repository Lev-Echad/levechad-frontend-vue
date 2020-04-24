<template>
  <v-row class="pa-5">
    <v-col cols="12" lg="4">
      <base-material-chart-card
        :data="dataCompletedTasksChart.data"
        :options="dataCompletedTasksChart.options"
        color="info"
        type="Line"
      >

        <h3 class="card-title font-weight-light mt-2 ml-2">
          זמני עומס
        </h3>

        <p class="d-inline-flex font-weight-light ml-2 mt-1">
          משימות חדשות שנכנסו למאגר
        </p>

        <template v-slot:actions>
          <v-icon class="mr-1" small>
            mdi-clock-outline
          </v-icon>
          <span class="caption grey--text font-weight-light"
            >מעודכן להיום בשעה 16:00</span
          >
        </template>
      </base-material-chart-card>
   
    </v-col>
    
    <v-col cols="12" lg="8">

    <base-material-card
      inline
      icon="mdi-map-marker-radius"
      title='נתוני חמ"לים'
      class="px-5 py-3 display-1 font-weight-light"
    >
      <v-simple-table class="overline" >
        <template v-slot:default>
          <thead>
            <tr>
              <th class="text-center">חמל</th>
              <th class="text-center">משימות פתוחות</th>
              <th class="text-center">משימות בביצוע</th>
              <th class="text-center">משימות סגורות</th>
              <th class="text-center">משימות חדשות</th>
              <th class="text-center">מתנדבים חדשים</th>
              <th class="text-center">סה"כ מתנדבים</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in hamalsStats" :key="item.name">
              <td class="text-center ">{{ item.name }}</td>
              <td class="text-center red--text">{{ item.openMissions }}</td>
              <td class="text-center orange--text">{{ item.closedMissions }}</td>
              <td class="text-center green--text">{{ item.closedMissions }}</td>
              <td class="text-center blue--text">{{ item.newMissons }}</td>
              <td class="text-center">{{ item.newVolunteers }}</td>
              <td class="text-center">{{ item.totalVolunteers }}</td>
            </tr>
          </tbody>
        </template>

  </v-simple-table>
    </base-material-card>
    </v-col>

    <v-col class="my-5" cols="12" lg="12 ">
        <base-material-card
          id="coloured-line"
          color="warning"
          icon="mdi-chart-timeline-variant"
          class="px-4 py-3"
        >
          <template v-slot:after-heading>
            <div class="display-1 font-weight-light mt-2">
              משימות
              <span class="subtitle-1 red--text">נפתחו</span>
              <span class="subtitle-1"> | </span>
              <span class="subtitle-1 green--text">בוצעו</span>
            </div>
          </template>

          <chartist
            :data="multipleLine.data"
            :options="multipleLine.options"
            type="Line"
            style="max-height: 150px;"
            class="mt-3"
            id="foo"
          />
        </base-material-card>
    </v-col>
  </v-row>
</template>

<script>
export default {
  data() {
    return {

      dataCompletedTasksChart: {
        data: {
          labels: ["08:00", "10:00", "12:00", "14:00", "16:00", "18:00"],
          series: [[10, 18, 65 , 30, 25, 30]]
        },
        options: {
          lineSmooth: this.$chartist.Interpolation.cardinal({
            tension: 0
          }),
          low: 0,
          high: 75, // creative tim: we recommend you to set the high sa the biggest value + something for a better look
          chartPadding: {
            top: 0,
            right: 0,
            bottom: 0,
            left: 0
          }
        }
      },
        multipleLine: {
          data: {
            labels: ["'06", "'07", "'08", "'09", "'10", "'11", "'12", "'13", "'14", "'15"],
            series: [
              [275, 500, 290, 55, 700, 700, 500, 750, 630, 900, 930],
              [575, 600, 490, 75, 300, 400, 700, 450, 130, 200, 330],
            ],
          },
          options: {
            low: 0,
            showArea: true,
            high: 1000, // creative tim: we recommend you to set the high sa the biggest value + something for a better look
            chartPadding: {
              top: 0,
              right: 0,
              bottom: 0,
              left: 0,
            },
          },
        },

      hamalsStats:[
        {
          name: 'דרום',
          openMissions: '423',
          closedMissions: '31',
          newMissons: '423',
          totalVolunteers: '534',
          newVolunteers: '534',
        },
        {
          name: 'מרכז',
          openMissions: '43',
          closedMissions: '875',
          newMissons: '5245',
          totalVolunteers: '653',
          newVolunteers: '13',
        },
        {
          name: 'צפון',
          openMissions: '524',
          closedMissions: '635',
          newMissons: '534',
          totalVolunteers: '5215',
          newVolunteers: '237',
        },
        {
          name: 'תל אביב',
          openMissions: '6246',
          closedMissions: '358',
          newMissons: '526',
          totalVolunteers: '753',
          newVolunteers: '6254',
        },
      ]
    }
  }
};
</script>

<style >
#foo .ct-series-a .ct-line {
  /* Set the colour of this series line */
  stroke: #4caf50 ;
}
#foo .ct-series-a .ct-point {
  /* Set the colour of this series line */
  stroke: #4caf50 ;
}

#foo .ct-series-a .ct-area {
  /* Set the colour of this series line */
  fill: #4caf50 ;
}
</style>