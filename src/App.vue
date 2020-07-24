<template>
  <router-view> </router-view>
</template>

<script>

import store from "./store";

export default {
  name: 'App',
  beforeCreate() {
    store.dispatch('checkToken')
  },
  components: {
  },

  data: () => ({
    //
  }),
};
</script>
