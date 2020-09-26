<template>
  <div>
    <v-form color="blue" ref="form" v-model="valid">
      <h2 class="title mb-2">פרטים אישיים</h2>
      <div>
        <v-text-field
          v-model="first_name"
          prepend-icon="mdi-account"
          label="שם פרטי"
          required
          :rules="nameRules"
        >
        </v-text-field>
        <v-text-field
          v-model="last_name"
          prepend-icon="mdi-account"
          label="שם משפחה"
          required
          :rules="nameRules"
        >
        </v-text-field>
        <v-text-field
          v-model="tz_number"
          prepend-icon="mdi-numeric-9-box-multiple-outline"
          label="תעודת זהות"
          required
          :rules="tzRules"
        >
        </v-text-field>

        <v-radio-group
          v-model="gender"
          prepend-icon="mdi-gender-male-female"
          label="מין"
          :rules="nameRules"
          row
        >
          <v-radio label="זכר" value="MALE"></v-radio>
          <v-radio label="נקבה" value="FEMALE"></v-radio>
          <v-radio label="אחר" value="OTHER"></v-radio>
        </v-radio-group>
      </div>

      <Bdate />

      <h2 class="title mb-2">כתובת</h2>
      <div>
        <City />
        <v-text-field
          v-model="street"
          prepend-icon="mdi-home-group"
          label="רחוב"
          required
          :rules="nameRules"
        >
        </v-text-field>
        <v-text-field
          v-model="house_number"
          prepend-icon="mdi-home-floor-1"
          label="מספר בית"
        >
        </v-text-field>
      </div>

      <h2 class="title mb-2">פרטי יצירת קשר</h2>
      <div>
        <v-text-field
          v-model="email"
          prepend-icon="mdi-email"
          label="כתובת אימייל"
          :rules="emailRules"
          required
        ></v-text-field>
        <v-text-field
          v-model="phone_number"
          prepend-icon="mdi-phone"
          label="מספר טלפון"
          type="number"
          required
          :rules="nameRules"
        ></v-text-field>
      </div>

      <h2 class="title mb-2">בחר סוגי התנדבות</h2>
      <div>
        <v-chip-group v-model="wanted_assignments" column multiple>
          <v-chip value="FOOD" filter outlined>חלוקת מזון</v-chip>
          <v-chip value="MEDICINES" filter outlined>משלוח תרופות</v-chip>
          <v-chip value="STAFF" filter outlined>סיוע לעובדים חיוניים</v-chip>
          <v-chip value="TRANSPORTATION" filter outlined>הסעות</v-chip>
          <v-chip value="TELEPHONE SUPPORT" filter outlined
            >תמיכה טלפונית</v-chip
          >
          <v-chip value="CHILD_CARE" filter outlined>עזרה במשפחתונים</v-chip>
          <v-chip value="OTHER" filter outlined>אחר</v-chip>
        </v-chip-group>

        <p class="subtitle mt-2">כמה שעות בשבוע תוכל להקדיש לביצוע משימות?</p>
        <p class="grey--color caption my-0 ">משך ממוצע של משימה הוא שעה וחצי</p>
        <v-radio-group
          required
          :rules="nameRules"
          v-model="week_assignments_capacity"
        >
          <v-radio label="עד שעה" value="1"></v-radio>
          <v-radio label="1-3 שעות" value="3"></v-radio>
          <v-radio label="3-5 שעות" value="5"></v-radio>
          <v-radio label="5-10 שעות" value="7"></v-radio>
          <v-radio label="כמה שצריך" value="10"></v-radio>
        </v-radio-group>
      </div>

      <h2 class="title mb-2">בחר דרכי התניידות</h2>
      <div>
        <v-radio-group required :rules="nameRules" v-model="moving_way">
          <v-radio label="רגלית" value="FOOT"></v-radio>
          <v-radio label="מכונית" value="CAR"></v-radio>
          <v-radio label="אופניים" value="BIKE"></v-radio>
          <v-radio label="קטנוע" value="SCOOTER"></v-radio>
          <v-radio label="תחבורה ציבורית" value="PUBL"></v-radio>
        </v-radio-group>
      </div>

      <h2 class="title mb-2">שפות</h2>
      <div>
        <v-checkbox
          class="py-0 my-0"
          v-model="languages"
          label="עברית"
          value="עברית"
        ></v-checkbox>
        <v-checkbox
          class="py-0 my-0"
          v-model="languages"
          label="אנגלית"
          value="אנגלית"
        ></v-checkbox>
        <v-checkbox
          class="py-0 my-0"
          v-model="languages"
          label="ערבית"
          value="ערבית"
        ></v-checkbox>
      </div>
    </v-form>
    <p v-if="!formValid" class="red--text">חובה למלא את כל השדות</p>
    <v-btn :disabled="!formValid" @click="onSubmit()">הרשמה</v-btn>
    <v-progress-circular
      indeterminate
      color="red"
      v-if="isLoading"
    ></v-progress-circular>
    <h4 class="red--text" v-if="createVolunteerFailed">תעודת הזהות מופיעה במערכת. פנה לחמ"ל במידה ולא נרשמת בעבר</h4>
  </div>
</template>

<!-- <Terms  /> -->
<!-- <PersonalDetails />
    <Address />
    <Contact />
    <MissionTypes />
    <Language />
    <Transportation /> -->

<script>
import City from "./components/forms/City";
import Bdate from "./components/forms/Bdate";
import { mapState, mapActions } from "vuex";

export default {

  methods: {
    onSubmit() {
      if (this.formValid) {
        let formData = {
          first_name: this.first_name,
          last_name: this.last_name,
          tz_number: this.tz_number,
          //date_of_birth: this.date_of_birth,
          gender: this.gender,
          //   city: this.city,
          address: this.street + " " + this.house_number,
          moving_way: this.moving_way,
          week_assignments_capacity: this.week_assignments_capacity,
          wanted_assignments: this.wanted_assignments,
          email: this.email,
          phone_number: this.phone_number,
          languages: this.languages,
        };
        this.$store.commit("api/setVolunteerSignUpField", formData);
        this.$store.dispatch("api/reqCreateVolunteer");
      }
    },
  },
  data() {
    return {
      valid: true,
      first_name: null,
      last_name: null,
      tz_number: null,
      date_of_birth: new Date().toISOString().substr(0, 10),
      gender: null,
      city: null,
      address: null,
      moving_way: null,
      week_assignments_capacity: null,
      wanted_assignments: [],
      email: null,

      phone_number: null,
      languages: [],

      street: null,
      house_number: null,

      nameRules: [(v) => !!v || "שדה חובה"],
      emailRules: [
        (v) => !!v || "אימייל נדרש",
        (v) =>
          /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
            v
          ) || "כתובת האימייל לא תקינה",
      ],
      tzRules: [
        (value) => !!value || "תעודת זהות נדרשת",
        (value) => {
          var tot = 0;
          var tz = new String(value);
          if (tz.length < 9) {
            for (let i = 0; i < 9 - tz.length; i++) {
              tz = "0" + tz;
            }
          }
          for (let i = 0; i < tz.length - 1; i++) {
            let x = ((i % 2) + 1) * tz.charAt(i);
            if (x > 9) {
              x = x.toString();
              x = parseInt(x.charAt(0)) + parseInt(x.charAt(1));
            }
            tot += x;
          }

          if ((tot + parseInt(tz.charAt(8))) % 10 == 0) {
            return true;
          } else {
            return "תעודת זהות לא תקינה";
          }
        },
      ],
    };
  },
  components: {
    City,
    Bdate,
  },

  computed: {
    citiesList() {
      return this.$store.getters["api/getCitiesList"];
    },
    bDateValid() {
      return this.$store.getters["api/getVolunteersSignUpBdateValid"];
    },
    cityValid() {
      return this.$store.getters["api/getVolunteersSignUpCityValid"];
    },
    formValid() {
      return (
        this.valid && this.cityValid && this.bDateValid && this.languagesValid
      );
    },
    serverLanguges(){
      return this.$store.getters["api/getLanguages"];
    },
    createVolunteerFailed() {
      return this.$store.getters["api/getCreateVolunteerFailed"];
    },
    isLoading() {
      return this.$store.getters["api/getIsLoading"];
    },
    languagesValid() {
      let array = this.languages;
      if (array === undefined || array.length == 0) {
        return false;
      } else {
        return true;
      }
    },
  },
};
</script>

<style>
.v-application .primary--text {
  color: #4caf50 !important;
  caret-color: #4caf50 !important;
}
</style>
