<template>
  <v-container fluid class="fill-height text-center">
    <v-row align="center" justify="center">
      <v-card width="750" class="text-center">
        <v-col cols="12">
          <h4>חדש בלב אחד?</h4>
          <v-btn class="primary" tile :to="{ name: 'Signup' }">לחץ להצטרפות</v-btn>
        </v-col>

        <v-col cols="12">
          <h4>מתנדב רשום?</h4>
          <!-- <v-btn  class="success" tile :to="{ name: 'VolunteerLogin' }"
          >לחץ כאן להוצאת תג מתנדב בתוקף</v-btn>-->
          <v-btn
            class="success"
            tile
            @click="navigateToFindCertificate()"
          >לחץ כאן להוצאת תג מתנדב בתוקף</v-btn>
        </v-col>
      </v-card>
    </v-row>
    <v-row align="center" justify="center">
      <v-col class="ma-0 pa-0" cols="12">
        <v-img
          :src="require('../../assets/volunteer1.jpg')"
          contain
          max-width="750"
          class="grey lighten-2 mx-auto"
        />
      </v-col>
    </v-row>
    <!-- <v-row  align="center" justify="center">
                  <v-col
              v-for="n in 9"
              :key="n"
              
              class="d-flex child-flex"
              cols="4">
                 <v-img
                  
                   max-width="200"
                  :src="`https://picsum.photos/500/300?image=${n * 5 + 10}`"
                  :lazy-src="`https://picsum.photos/10/6?image=${n * 5 + 10}`"
                  aspect-ratio="1"
                  class="grey lighten-2 mx-auto"
                >
                 </v-img>
                  </v-col>
    </v-row>-->
  </v-container>
</template>

<script>
export default {
  methods: {
    navigateToFindCertificate() {
      window.open("http://live.levechad.org/client/find_certificate");
    }
  }
};
</script>