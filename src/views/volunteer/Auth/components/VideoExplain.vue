
<template>
    <v-playback 
    :poster="poster"
    :url="require('../../../../assets/volunteer-explain.mp4')" ></v-playback>
</template>
 
<script>
export default {
    data(){
        return {
            url: 'volunteer-explain.mp4',
            poster: "https://www.howitworksdaily.com/wp-content/uploads/2017/12/HIWyoutubelogo-1-e1512142850786.png"
        }
    }
};
</script>

