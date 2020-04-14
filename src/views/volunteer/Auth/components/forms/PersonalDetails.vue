<template>
  <div>
    <h2 class="title mb-2">פרטים אישיים</h2>
    <v-text-field  label="שם פרטי" >  </v-text-field>
    <v-text-field  label="שם משפחה" >  </v-text-field>
    <v-text-field  label="תעודת זהות" >  </v-text-field>

    <v-radio-group label="מין" row>
      <v-radio label="זכר" value="זכר"></v-radio>
      <v-radio label="נקבה" value="נקבה"></v-radio>
    </v-radio-group>

      <v-dialog
        ref="dialog"
        v-model="modal"
        :return-value.sync="date"
        persistent
        width="290px"
      >
        <template v-slot:activator="{ on }">
          <v-text-field
            v-model="date"
            label="תאריך לידה"
            readonly
            v-on="on"
          ></v-text-field>
        </template>
        <v-date-picker locale="he" v-model="date" scrollable @input="$refs.dialog.save(date)">
          <v-spacer></v-spacer>
          <v-btn text color="primary" @click="modal = false">סגירה</v-btn>
          <v-btn text color="primary" @click="$refs.dialog.save(date)">אישור</v-btn>
        </v-date-picker>
      </v-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      date: new Date().toISOString().substr(0, 10),
      modal: false,
    }
  }
}
</script>