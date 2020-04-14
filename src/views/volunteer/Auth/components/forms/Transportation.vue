<template>
  <div>
    <v-checkbox
      v-for="(tranType, index) in tranTypes"
      :key="index"
      v-model="selected"
      :label="tranType"
      :value="tranType"
    ></v-checkbox>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tranTypes: ["רכב", "קטנוע / אופנוע", 'תחב"צ', "רגלי"],
      selected: []
    };
  },
  props: ["step"],
  watch: {
    selected(val) {
      let flag = true;
      if (val.length == 0) {
        flag = false;
      }
      let payload = {
        ...this.step
      };
      payload.isValid = flag;
      this.$store.dispatch("volunteerSignup/setStetValidation", payload);
    }
  }
};
</script>
