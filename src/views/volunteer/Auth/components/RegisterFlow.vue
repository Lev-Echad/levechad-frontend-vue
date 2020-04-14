<template>
  <div>
    <v-stepper alt-labels v-model="currentStep">
      <v-stepper-header>
        <span v-for="step in steps" :key="step.stepNo">
          <v-stepper-step
            editable
            :complete="currentStep > step.StepNo"
            :step="step.stepNo"
          >
            {{ step.stepTitle }}
          </v-stepper-step>
          <v-divider></v-divider>
        </span>
      </v-stepper-header>

      <v-stepper-items>
        <v-stepper-content 
        v-for="step in steps"
        :key="step.stepNo"
        :step="step.stepNo"
        >
          <v-card class="mb-12" color="grey lighten-5">
            <component v-bind:step="step" :is="step.stepComponent"> </component>
          </v-card>
          <v-btn :disabled="!step.isValid" color="primary" @click="nextStep()"
>המשך</v-btn
          >
        </v-stepper-content>

        <!-- <v-stepper-content step="1">
          <v-card class="mb-12" color="grey lighten-5">
            <Terms :v-bind:aggreeToTerms="aggreeToTerms" />
          </v-card>
          <v-btn :disabled="!aggreeToTerms" color="primary" @click="nextStep()"
            >המשך</v-btn
          >
        </v-stepper-content>

        <v-stepper-content step="2">
          <v-card class="mb-12" color="grey lighten-5">
            <Address />
          </v-card>
          <v-btn color="primary" @click="nextStep()">המשך</v-btn>
        </v-stepper-content>

        <v-stepper-content step="3">
          <v-card class="mb-12" color="grey lighten-5">
            <MissionTypes />
          </v-card>

          <v-btn color="primary" @click="submitForm()">
            סיום
          </v-btn>
        </v-stepper-content> -->

      </v-stepper-items>
    </v-stepper>
  </div>
</template>

<script>
import Address from "./forms/Address";
import MissionTypes from "./forms/MissionTypes";
import PersonalDetails from "./forms/PersonalDetails";
import Terms from "./forms/Terms";
import Transportation from "./forms/Transportation";
import Contact from "./forms/Contact";
import PhoneVarification from "./forms/PhoneVarification";
import { mapState, mapActions } from "vuex";

export default {
  components: {
    Address,
    MissionTypes,
    PersonalDetails,
    Terms,
    Transportation,
    Contact,
    PhoneVarification
  },
  computed: {
    ...mapState({
      currentStep: state => state.volunteerSignup.currentStep,
      steps: state => state.volunteerSignup.steps
    })
  },
  methods: {
    nextStep() {
      this.$store.dispatch("volunteerSignup/increaseStep");
    },
    submitForm() {
      console.log("finish!");
    }
  },
  data() {
    return {
      //   e1: 1,
      aggreeToTerms: true
    };
  }
};
</script>
