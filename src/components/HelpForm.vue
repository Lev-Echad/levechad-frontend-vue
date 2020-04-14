<template>
  <div>
    <v-row justify="center">
      <!-- <gmap-autocomplete class="introInput" >
                    <template v-slot:input="slotProps">
                        <v-text-field outlined
                                      prepend-inner-icon="place"
                                      placeholder="Location Of Event"
                                      ref="input"
                                      v-model = "testAddress"
                                      v-on:listeners="slotProps.listeners"
                                      v-on:attrs="slotProps.attrs">
                        </v-text-field>
                    </template>
        </gmap-autocomplete> -->
      <v-col cols="12">
        <v-text-field
          v-model="help.firstName"
          label="שם פרטי"
          required
        ></v-text-field>
      </v-col>

      <v-col cols="12">
        <v-text-field
          v-model="help.lastName"
          label="שם משפחה"
          required
        ></v-text-field>
      </v-col>

      <v-col cols="12">
        <v-text-field
          v-model="help.phoneNumber"
          label="מספר טלפון"
          required
        ></v-text-field>
      </v-col>

      <!-- <v-col cols="12">
        <gmap-autocomplete  @place_changed="setPlace" :value="this.longPlace">
        </gmap-autocomplete>
      </v-col> -->

      <v-col cols="12">
        <v-radio-group v-model="help.helpType">
          <v-radio label="משלוח מהסופר" value="משלוח מהסופר"></v-radio>
          <v-radio label="תרופות" value="תרופות"></v-radio>
          <v-radio label="צהרונים" value="צהרונים"></v-radio>
        </v-radio-group>
      </v-col>

      <v-col cols="12">
        <v-text-field
          v-model="help.address.city"
          label="עיר"
          v-on="this.makePlace()"
          required
        ></v-text-field>
      </v-col>

      <v-col cols="12">
        <v-text-field
          v-model="help.address.street"
          label="רחוב"
          v-on="this.makePlace()"
          required
        ></v-text-field>
      </v-col>

      <v-col cols="12">
        <v-text-field
          v-model="help.address.houseNumber"
          label="מספר בית"
          v-on="this.makePlace()"
          required
        ></v-text-field>
      </v-col>

<v-col cols="12">
  <v-btn @click="reqPlaceData">הצג על המפה</v-btn>
</v-col>
      <v-col cols="12">
        <v-text-field
          v-model="help.comments"
          label="הערות"
          required
        ></v-text-field>
      </v-col>


    </v-row>
    <v-row justify="center">
      <v-col cols="12">
        <Map v-bind:location="help.location" />
      </v-col>
    </v-row>
  </div>
</template>

<script>
import Map from "@/components/Map.vue";
import axios from "axios"
export default {
  components: {
    Map
  },
  data() {
    return {
      help: {
        firstName: null,
        lastName: null,
        phoneNumber: null,
        location: {
          geometry: null
        },
        address: {
          city: "",
          street: "",
          houseNumber: ""
        },
        language: null,
        helpType: null,
        comments: null,
        timestamp: null,
        googleMapsData: null
      },
      longPlace: null
    };
  },
  methods: {
    setPlace(place) {
      console.log("asddd");
      this.help.location.geometry = place.geometry.location;
    },

    submitForm(){

    },

    reqPlaceData(){
      axios
      .get('https://maps.googleapis.com/maps/api/geocode/json?address='+this.longPlace+'&key=AIzaSyAtVc9cEOVOM2QzuP1rKB106kIjPusA19E')
      .then(response => {
        let geoData = response.data.results[0]
        console.log(geoData)
        this.setPlace(geoData)
      })
    },
    makePlace(){
      this.longPlace = this.help.address.city
      + ' '
      + this.help.address.street
      + ' '
      + this.help.address.houseNumber
    }
  }
};
</script>
