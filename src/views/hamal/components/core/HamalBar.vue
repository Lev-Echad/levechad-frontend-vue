<template>
  <v-app-bar app color="red" dark>
    <v-app-bar-nav-icon 
     @click="$vuetify.breakpoint.smAndDown ? setDrawer(!drawer) : $emit('input', !value)"
    ></v-app-bar-nav-icon>

    <!-- <v-icon v-if="value">
        mdi-view-quilt
      </v-icon>

      <v-icon v-else>
        mdi-dots-vertical
      </v-icon> -->
 
    
    <v-toolbar-title>
      <span class="font-weight-bold"> לב אחד </span>
      <span class="font-weight-light">חמ"ל</span>
    </v-toolbar-title>
    <v-spacer></v-spacer>
    <v-btn :to="{ name: 'Home' }" icon>
      <v-icon>mdi-home</v-icon>
    </v-btn>
  </v-app-bar>
</template>

<script>

  // Utilities
  import { mapState, mapMutations, mapActions } from 'vuex'

export default {
    props: {
      value: {
        type: Boolean,
        default: false,
      },
    },
      computed: {
      drawer(){
        return this.$store.state.hamal.drawer;
      }
    },

    methods: {
      ...mapMutations({
        setDrawer: 'hamal/SET_DRAWER',
      }),
    },
};
</script>
