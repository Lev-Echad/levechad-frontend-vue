<template>
  <div>
    <GmapMap
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
    //  MissionCard: () => import("./components/missions/MissionCard"),
  },
  data() {
    return {
      infoWindowPos: null,
      infoWinOpen: false,
      currentMidx: null,

      infoOptions: {
        content: "",
        //optional: offset infowindow so it visually sits nicely on top of our marker
        pixelOffset: {
          width: 0,
          height: -35,
        },
      },
    };
  },
  methods: {
    toggleInfoWindow: function(marker, idx) {
      //this.$store.commit("match/focusedMissionId", marker.id);
      console.log(marker.id);
      // this.$store.dispatch("match/reqBestMatch", marker.id);
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

  computed: {
    FocusedMission: {
      get() {
        return this.$store.state.api.fousedMission;
      },
      set(marker) {
        // toggleInfoWindow(marker, marker.id)
        //  this.$store.commit("hamal/setFocusedMission", marker);
      },
    },
    mapPoints() {
      return this.$store.getters["match/getMapPoints"];
    },
  },
};
</script>
