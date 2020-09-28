<template>
    <div>


        <GmapMap ref="mapRef"
                 :center="{
                        lat: currentMission.location_latitude,
                         lng: currentMission.location_longitude,
                  }"
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
                 style="width: 300px; height: 550px"
        >
            <GmapMarker
                    v-for="mission in mapPoints"
                    :key="mission.id"
                    :animation="2"
                    :clickable="true"
                    @click="focusVolunteer(mission)"
                    :icon="getStatusIcon(mission.status)"
                    :position="{
          lat: mission.location_latitude,
          lng: mission.location_longitude,
        }"
            />


            <GmapMarker
                    :animation="2"
                    :clickable="true"
                    :icon="getMissionIcon(currentMission.status)"
                    :position="{
                      lat: currentMission.location_latitude,
                      lng: currentMission.location_longitude,
                     }"
            />

            <GmapMarker
                    :animation="1"
                    :clickable="true"
                    v-if="currentVolunteer"
                    :icon="getCurrentVolunteerIcon(currentMission.status)"
                    :position="{
                      lat: currentVolunteer.location_latitude,
                      lng: currentVolunteer.location_longitude,
                     }"
            />
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
        isLoading: false,


      };
    },
    methods: {
      focusVolunteer: function(marker, idx) {
        this.$store.commit("market/currentVolunteer", marker)

      },
      getStatusIcon(status) {
        let icon = "blue_marker.png";
        return require("../../../../../assets/" + icon);
      },
      getMissionIcon(status) {
        let icon = "red_marker.png";
        return require("../../../../../assets/" + icon);
      },
      getCurrentVolunteerIcon(status) {
        let icon = "green_marker.png";
        return require("../../../../../assets/" + icon);
      },
    },

    computed: {

      mapPoints(){
        return  this.$store.getters["market/bestVolunteers"]
      },
      currentMission(){
        return  this.$store.getters["market/currentHelpRequest"]
      },
      currentVolunteer(){
        return  this.$store.getters["market/currentVolunteer"]
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
