<template>
  <div>

    <v-form v-model="valid">
      <v-text-field
        label="שם מלא"
        prepend-icon="mdi-account"
        v-model="formFields.full_name"
        required
        :rules="nameRules"
      ></v-text-field>

      <v-text-field
        label="טלפון"
        prepend-icon="mdi-phone"
        v-model="formFields.phone_number"
        required
        type="number"
        :rules="nameRules"
      ></v-text-field>

      <City />

      <v-text-field
        v-model="formFields.address"
        prepend-icon="mdi-home-group"
        label="רחוב"
        required
        :rules="nameRules"
      >
      </v-text-field>
      <!-- <v-text-field
          v-model="house_number"
          prepend-icon="mdi-home-floor-1"
          label="מספר בניין"
        >
        </v-text-field> -->

      <div class="ma-4">
        <h4>איזה סיוע נדרש?</h4>
        <v-radio-group required :rules="nameRules" v-model="formFields.type">
          <v-radio
            v-for="(helpType, index) in helpTypes"
            :key="index"
            :label="helpType.display_name"
            :value="helpType.value"
          ></v-radio>
        </v-radio-group>
      </div>

      <div class="ma-4">
        <h4>סיבת הבקשה</h4>
        <v-radio-group
          required
          :rules="nameRules"
          v-model="formFields.request_reason"
        >
          <v-radio
            v-for="(requestReason, index) in requestReasons"
            :key="index"
            :label="requestReason.display_name"
            :value="requestReason.value"
          ></v-radio>
        </v-radio-group>
      </div>

      <div class="ma-4">
        <v-textarea
          append-icon="mdi-comment"
          class="mx-2"
          outlined
          label="הערות"
          v-model="formFields.type_text"
          rows="5"
                  required
        :rules="nameRules"
        ></v-textarea>
      </div>

        <div  class="red--text" v-if="!formIsValid">{{errorMsg}}</div>
      <v-btn
        :disabled="!formIsValid"
        color="success"
        class="mr-4"
        @click="onSubmit()"
      >
        שלח
      </v-btn>
    </v-form>
  </div>
</template>

<script>
export default {
  computed: {
    formFields: {
      get() {
        return this.$store.getters["api/getHelpRequestFormFields"];
      },
      set() {},
    },
    helpTypes() {
      return this.$store.getters["getHelpTypes"];
    },
    requestReasons() {
      return this.$store.getters["getRequestReasons"];
    },

    formIsValid() {
      return this.valid && this.$store.getters["api/getHelpRequestCityValid"];
    },
  },

  methods:{
    onSubmit(){
      if(!this.formIsValid){
        
      }else{
        this.$store.dispatch("api/reqCreateHelpRequest")
        this.$router.push({ name: 'FinishRequestForm' })
      }
    }
  },

  components: {
    City: () => import("./City"),
  },

  data() {
    return {
      valid: false,
      errorMsg: "נא למלא את כל השדות",
      nameRules: [(v) => !!v || "שדה חובה"],
    };
  },
};
</script>
