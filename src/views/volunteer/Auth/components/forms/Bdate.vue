<template>
        <v-dialog
          ref="dialog"
          v-model="dialog"
          :return-value.sync="date_of_birth"
          persistent
          width="290px"
        >
          <template v-slot:activator="{ on }">
            <v-text-field
              v-model="date_of_birth"
              label="תאריך לידה"
              readonly
              prepend-icon="mdi-calendar-month-outline"
              v-on="on"
            ></v-text-field>
          </template>
          <v-date-picker
            locale="he"
            :max="maxDate"
            ref="picker"
            v-model="date_of_birth"
            scrollable
            @input="$refs.dialog.save(date_of_birth)"
          >
            <v-spacer></v-spacer>
            <v-btn text color="primary" @click="modal = false">סגירה</v-btn>
            <v-btn text color="primary" @click="$refs.dialog.save(date)"
              >אישור</v-btn
            >
          </v-date-picker>
        </v-dialog>
</template>


<script>
  export default {
    data: () => ({
      date_of_birth: null,
      dialog: false,
      
    }),
    watch: {
      dialog (val) {
        val && setTimeout(() => (this.$refs.picker.activePicker = 'YEAR'))
      },
      date_of_birth(val){
        if(val){
          this.$store.commit("api/setVolunteersSignUpBdateValid", true);
          this.$store.commit('api/setVolunteerSignUpField',{'date_of_birth': this.date_of_birth } )
        } else{
          this.$store.commit("api/setVolunteersSignUpBdateValid", false);
        }
      }
    },
    // methods: {
    //   save (date) {
    //     this.$refs.menu.save(date)
    //   },
    // },
    computed:{
      maxDate(){
        let date1 = new Date()
        date1.setFullYear(date1.getFullYear() -18)
        return date1.toISOString()
       // return new Date().toISOString().substr(0, 10)
     }
    }
  }
</script>