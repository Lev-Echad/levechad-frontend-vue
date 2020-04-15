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
      style="width: 800px; height: 700px"
    >
      <GmapMarker
        v-for="mission in missionList"
        :key="mission.id"
        :animation="2"
        :clickable="true"
        @click="toggleInfoWindow(mission)"
        icon="https://cdn2.iconfinder.com/data/icons/happy-valentines-day-3/64/valentine_heart_love_pin_map_pointer_location-32.png"
        :position="{
          lat: mission.lat,
          lng: mission.lng,
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
  props: ["missionList"],
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
      this.$store.commit("hamal/setFocusedMission", marker);
      this.infoWindowPos = { lat: marker.lat, lng: marker.lng };
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
  },
};
</script>
