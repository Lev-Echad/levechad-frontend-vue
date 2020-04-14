<template>
<div>
<GmapMap
  :center="{lat:32, lng:35}"
  :zoom="9"
  map-type-id="terrain"
   :options="{
   zoomControl: false,
   mapTypeControl: false,
   scaleControl: false,
   streetViewControl: false,
   rotateControl: false,
   fullscreenControl: false,
   disableDefaultUi: false
 }"
  style="width: 500px; height: 300px"
>
      <GmapMarker
        :animation="2"
        icon="https://cdn2.iconfinder.com/data/icons/happy-valentines-day-3/64/valentine_heart_love_pin_map_pointer_location-32.png"
        v-if="this.location.geometry"
        :position="{
          lat: this.location.geometry.lat,
          lng: this.location.geometry.lng,
        }"
        />
</GmapMap>


</div>

</template>

<script>
export default {
  props: ['location'],
  data() {
    return{
      place: null
    }
  }
}
</script>