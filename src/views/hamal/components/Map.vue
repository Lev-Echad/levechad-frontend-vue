<template>
  <div>
        <v-row  align="center">

    <v-col cols="12" sm="2" class="">
      <v-text-field
        v-model="serach_id"
        :counter="10"
        :search-input.sync="serach_id"
        label="id"
        required
      ></v-text-field>
    </v-col>
      <v-col cols="12" sm="3" class="">
      <v-text-field
        v-model="serach_phone"
        :counter="10"
        :search-input.sync="serach_phone"
        label= "טלפון"
        required
      ></v-text-field>
    </v-col>
    <v-col cols="12" sm="3">
      <v-autocomplete
        v-model="serach_city"
        :items="items"
        :loading="isLoading"
        :search-input.sync="search"
        hide-no-data
        label="עיר"
        placeholder="סנן לפי עיר"
        prepend-icon="mdi-city"
        no-data-text=""
        cache-items
        clearable
      ></v-autocomplete>
    </v-col>
    <v-col cols="12" sm="3">
      <v-select 
      clearable label="סטטוס" 
      v-model="serach_status" 
      :search-input.sync="serach_status"
      :items="[
      'התקבלה',
      'בטיפול',
      'הועבר למתנדב',
      ]"> 
      </v-select>
    </v-col>
            <v-btn  @click="refresh()" color="secondary" fab x-small dark>
              <v-icon>mdi-refresh</v-icon>
            </v-btn>
    </v-row>

    <GmapMap ref="mapRef"
      :center="{ lat: 32, lng: 35 }"
      :zoom="9"
      map-type-id="terrain"
      :options="{
        zoomControl: false,
        mapTypeControl: false,
        scaleControl: false,
        streetViewControl: false,
        rotateControl: false,
        fullscreenControl: false,
        disableDefaultUi: false,
      }"
      :styles="{
        default: null,
        hide: [
          {
            featureType: 'poi.business',
            stylers: [{ visibility: 'off' }],
          },
          {
            featureType: 'transit',
            elementType: 'labels.icon',
            stylers: [{ visibility: 'off' }],
          },
        ],
      }"
      style="width: 800px; height: 550px"
    >
      <GmapMarker
        v-for="mission in mapPoints"
        :key="mission.id"
        :animation="2"
        :clickable="true"
        @click="toggleInfoWindow(mission)"
        :icon="getStatusIcon(mission.status)"
        :position="{
          lat: mission.location_latitude,
          lng: mission.location_longitude,
        }"
      />

      <gmap-info-window
        :options="infoOptions"
        :position="infoWindowPos"
        :opened="infoWinOpen"
        @closeclick="infoWinOpen = false"
      >
      </gmap-info-window>
    </GmapMap>
  </div>
</template>

<script>

export default {
  components: {
  },
  data() {
    return {
      infoWindowPos: null,
      infoWinOpen: false,
      currentMidx: null,
      search:null,
      serach_id:"",
      serach_phone:"",
      serach_city:"",
      serach_status:"",
      isLoading: false,
      mapPoints : this.$store.getters["match/getMapPoints"],
      infoOptions: {
        content: "",
        pixelOffset: {
          width: 0,
          height: -35,
        },
      },
    };
  },
  methods: {
    refresh(){
      this.mapPoints =this.$store.getters["match/getMapPoints"];
    },
    toggleInfoWindow: function(marker, idx) {
      console.log(marker.id);
      this.$store.dispatch("match/reqFocusedMissionDetails", marker.id);
      this.infoWindowPos = {
        lat: marker.location_latitude,
        lng: marker.location_longitude,
      };
      let contentInfo = "<p> mission id </p><p>" + marker.id + "</p>";
      this.infoOptions.content = contentInfo;

      //check if its the same marker that was selected if yes toggle
      if (this.currentMidx == marker.id) {
        this.infoWinOpen = !this.infoWinOpen;
      }
      //if different marker set infowindow to open and reset current marker index
      else {
        this.infoWinOpen = true;
        this.currentMidx = marker.id;
      }
    },
    getStatusIcon(status) {
      let icon = "red_marker.png";

      switch (status) {
        case "התקבלה":
          icon = "red_marker.png";
          break;
        case "בטיפול":
          icon = "orange_marker.png";
          break;
        case "הועבר למתנדב":
          icon = "green_marker.png";
          break;
      }
      return require("../../../assets/" + icon);
    },
  },
  watch: {
    search(val) {
      if (val) {
        if (val.length > 1) {
          this.$store.dispatch("api/reqCitiesAutoComplete", val);
        }
        if(val.length == 0){
          this.refresh()
        } else{
          this.mapPoints = this.$store.getters["match/getMapPointsFilterByCity"](val);
        }
      }else{
          this.refresh()
        }
    },
    serach_id(val) {
      if(val.length == 0){
        this.refresh()
      }else{
        this.mapPoints = this.$store.getters["match/getHelpRequestById"](val);
        this.$store.dispatch("match/reqFocusedMissionDetails", val);

      }
    },
    serach_phone(val) {
      if(val.length == 0){
        this.refresh()
      }else{
        this.mapPoints = this.$store.getters["match/getHelpRequestByPhone"](val);
      }
    },
    serach_status(val) {
      if(val){
        this.mapPoints = this.$store.getters["match/getMapPointsFilterByStatus"](val);
      }else{
        this.refresh()
      }
    }
  },
  computed: {
    items() {
      let resCitiesList = this.$store.getters["api/getCitiesList"];
      return resCitiesList;
    },
    FocusedMission: {
      get() {
        return this.$store.state.api.fousedMission;
      },
      set(marker) {
        // toggleInfoWindow(marker, marker.id)
        //  this.$store.commit("hamal/setFocusedMission", marker);
      },
    },

  },
};
</script>
