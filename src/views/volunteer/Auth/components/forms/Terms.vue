<template>
  <div class=" text-center">
        <h2  @click="submitForm()"  class="subtitle-2 mb-2">
      מגוון הפעולות הנדרשות משתנה בהתאם לצרכים אולם רוב הבקשות לסיוע הן מהתחומים
      הבאים:
    </h2>
    <p class="subtitle-2 font-weight-bold">
      פעילות במשפחתונים לילדים לעובדים חיוניים
    </p>
    <p class="subtitle-2 font-weight-bold">
      סיוע למבודדים ואנשים שלא יכולים לעזוב את ביתם
    </p>
    <p class="subtitle-2 font-weight-bold">סיוע לחקלאים</p>
    <span></span>
    <span></span>
    <v-divider></v-divider>
    <div class="pa-1 text-center red white--text ">
      <h2 color="white" class="subtitle-1 mb-2">
        לקראת ובהלך ההתנדבות אנחנו מבקשים להישמע לנהלים שפורסמו ע"י משרד
        הבריאות, עליכם לקרוא אותם בעיון:
      </h2>
      <p class="subtitle-1 font-weight-bold">ההנחיות חלות על כולם!</p>
      <p class="subtitle-2 font-weight-bold">
        יש לשטוף ידיים לפני ואחרי כל התנדבות.
      </p>
      <p class="subtitle-2 font-weight-bold">
        יש לשמור על מרחק של 2 מטרים לפחות מכל אדם (להשתדל ולהקפיד מאד על כך
        במקומות שיש בהם לא מעט אנשים כגון סופרמרקט ומשפחתונים).
      </p>

    </div>
      <v-divider></v-divider>

    <div class="mt-3 ">
      <p class="subtitle-1 font-weight-bold">
        העברה של כסף/ מצרכים תיעשה באופן הבא:
      </p>
      <p>
        על המתנדב להשאיר את המשלוח מחוץ לבית מבקש הסיוע, על סף הדלת. לדפוק על
        הדלת ולציין שפרק את המשלוח מטעם "לב אחד"
      </p>
      <p>
        לאחר מכן, על המתנדב לשמור על מרחק של 2 מטרים מחוץ לדלת. אם מבקש הסיוע
        רוצה להעביר דבר-מה, עליו להשאיר אותו מחוץ לדלת, כאשר המתנדב מרוחק ממנה 2
        מטרים לפחות. כאמור, להקפיד על שטיפת ידיים לפני ואחרי כל משלו
      </p>
    </div>

    <v-divider></v-divider>

    <div class="my-3 ">
      <p class="subtitle-1 font-weight-bold red--text">
        כל מעשה קטן, הוא למעשה מעשה גדול של חסד שבאמצעותו נצליח כחברה לעבור את
        המשבר, כי כולנו לב אחד.
      </p>
      <v-avatar color="primary">
        <v-icon dark>mdi-heart</v-icon>
      </v-avatar>
    </div>

    <v-divider></v-divider>

    <div class="my-3 text-right">
      <v-checkbox
        v-for="term in this.terms"
        :key="term.id"
        v-model="term.val"
        :label="term.title"
        @change="checkForm()"
      >
      </v-checkbox>
    </div>
  </div>
</template>

<script>
export default {
  props: ["step"],


  data()  {
    return {
      terms: [
        {
          id: 1,
          val: false,
          title: 'אני מאשר/ת כי לא חזרתי מחו"ל ב-14 הימים האחרונים'
        },
        {
          id: 2,
          val: false,
          title:
            "אני מאשר/ת כי חשתי בטוב ב-14 הימים האחרונים - ללא תסמינים של שיעול, חום, צינון, כאב גרון וכיוצא בזה"
        },
        {
          id: 3,
          val: false,
          title:
            "לא הייתי בבידוד ב-14 הימים האחרונים ולא שהיתי באותו הבית עם מישהו שנדרש בידוד"
        },
        {
          id: 4,
          val: false,
          title:
            "אני מאשר/ת כי עברתי על המסלולים המעודכנים ביותר של החולים המאומתים, ולא באתי במגע עם אף אחד מהם"
        },
        {
          id: 5,
          val: false,
          title: "אני מאשר שאני מעל גיל 16"
        }
      ]
    };
  },
  methods:{
    checkForm(){
        let flag = true;
        for (let term of this.terms) {
          if (!term.val) {
            console.log("asd")
        //    console.log(term)
            flag = false;
          }
        }
        let payload = {
          ...this.step
        }
        payload.isValid = flag
        this.$store.dispatch("volunteerSignup/setStetValidation", payload);
      },

    submitForm(){
      console.log("BOO")
      this.$store.dispatch("api/createVolunteer")
    }
  },
  //   watch: {
  //   'terms.val': {
  //     deep: true,
  //     handler() {
  //       let flag = true;
  //       console.log("asd");
  //       for (term in terms) {
  //         if (!term.val) {
  //           flag = false;
  //         }
  //       }
  //       this.aggreeToTerms = flag;
  //     }
  //   }
  // },
};
</script>
