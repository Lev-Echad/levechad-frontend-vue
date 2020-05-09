<template>
  <v-data-table
    :headers="headers"
    :items="helpRequests"
    sort-by="id"
    class="elevation-1"
  >
      <template v-slot:item.created_date="{ item }">
      <div>{{fix_date(item.created_date)}}</div>
    </template>
    <template v-slot:top>
      <v-toolbar flat color="white">
        <v-toolbar-title>משימות</v-toolbar-title>
        <v-divider
          class="mx-4"
          inset
          vertical
        ></v-divider>
            <v-row>
      <div class="pl-6"></div>
      <v-chip class="pl-3 m-12">
        <download-excel
          :data="helpRequests"
          name = "משימות.xls"
          :fields ="excel_fields"
        >
          יצא לאקסל
        <v-icon
            small
            class="mr-2"
          >
            mdi-download
          </v-icon>
        </download-excel>
      </v-chip>
    </v-row>
        <v-spacer></v-spacer>
        <v-dialog v-model="dialog" max-width="500px">
          <v-card>
            <v-card-title>
              <span class="headline">{{ formTitle }}</span>
            </v-card-title>

            <v-card-text>
              <v-container>
                <v-row>
                      <v-col cols="12" sm="12" md="12">
                        <v-select 
                        clearable label="חובה לבחור סטטוס" 
                        v-model="editedItem.status" 
                        :items="[
                        {text: 'התקבלה', value: 'WAITING'},
                        {text: 'בטיפול חמל', value: 'IN_CARE'},
                        {text: 'הועבר למתנדב', value: 'TO_VOLUNTER'},
                        {text: 'סיום טיפול', value: 'DONE'},
                        {text: 'לא רלוונטי', value: 'NOT_DONE'},
                        ]"> 
                        </v-select>
                      </v-col>
                  <v-col cols="12" sm="12" md="12">
                    <v-text-field v-model="editedItem.helping_volunteer.id" label="מס מתנדב"></v-text-field>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col cols="12" sm="12" md="12">
                    <v-textarea v-model="editedItem.type_text" label="בקשה"></v-textarea>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col cols="12" sm="12" md="12">
                    <v-textarea v-model="editedItem.notes" label="הערה"></v-textarea>
                  </v-col>
                </v-row>
              </v-container>
            </v-card-text>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="close">ביטול</v-btn>
              <v-btn color="blue darken-1" text @click="save">שמור</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-toolbar>
    </template>
    <template v-slot:item.actions="{ item }">
      <v-icon
        small
        class="mr-2"
        @click="editItem(item)"
      >
        mdi-pencil
      </v-icon>
    </template>
    <template v-slot:no-data>
      <!-- <v-btn color="primary" @click="initialize">Reset</v-btn> -->
    </template>
  </v-data-table>
</template>

<script>
  export default {
    data: () => ({
      totalDesserts: 0,
      loading: true,
      options: {},
      dialog:null,
      headers: [
        { text: "מס'", value: "id" },
        { text: "סטטוס", value: "status" },
        { text: "שם מלא", value: "full_name" },
        { text: "טלפון", value: "phone_number" },
        { text: "עיר", value: "city[name]" },
        { text: "סוג עזרה", value: "type" },
        { text: "איזור", value: "area" },
        { text: "כתובת", value: "address" },
        { text: "סיבה", value: "reason" },
        { text: "תאריך", value: "created_date" },
        { text: 'פעולה', value: 'actions', sortable: false },


      ],
      excel_fields:{
          "מס'"  :"id" ,
          "סטטוס"  :"status" ,
          "שם מלא"  :"full_name" ,
          "טלפון"  :"phone_number" ,
          "עיר"  :"city.name" ,
          "סוג עזרה"  :"type" ,
          "איזור"  :"area" ,
          "כתובת"  :"address" ,
          "סיבה"  :"reason" ,
          "תאריך"  :"created_date" ,
          'פעולה'  :'actions',
          'בקשה'  :'type_text',
          'הערת חמל'  :'notes',

      },
      editedIndex: -1,
      editedItem: {
        id: '',
        status: 0,
        full_name: 0,
        city: 0,
        address: 0,
        reason: 0,
        created_date: 0,
        actions:0,
        helping_volunteer:{
          id:null,
          full_name:""
        }
      },
      defaultItem: {
        id: '',
        status: 0,
        full_name: 0,
        city: 0,
        address: 0,
        reason: 0,
        created_date: 0,
        actions:0,
        helping_volunteer:{
          id:null,
          full_name:""
        }
      },
    }),

    computed: {
      helpRequests() {
      return this.$store.getters["helpRequests/helpRequests"];
    },
    totalHelpRequests() {
      return this.$store.getters["helpRequests/totalHelpRequests"];
    },
    isLoading() {
      return this.$store.getters["helpRequests/isLoading"];
    },
      formTitle () {
        return 'ערוך משימה'
      },
    },

    mounted() {
    this.$store.dispatch("helpRequests/reqAreas");
    this.$store.dispatch("helpRequests/reqHelpRequests");
  },

    watch: {
      dialog (val) {
        val || this.close()
      },
    },

    // created () {
    //   this.initialize()
    // },

    methods: {
      get_helping_volunteer(v){
        console.log(v)
        if (v){
          return v.id
        }
        return ""

      },
      fix_date(date){
        let d = new Date(date).toLocaleString()
        return d
      },
      editItem (item) {
        this.editedIndex = this.helpRequests.indexOf(item)
        if(!item.helping_volunteer){
          item.helping_volunteer = {id:null,full_name:""}
        }
        this.editedItem = Object.assign({}, item)
        this.dialog = true
      },
      close () {
        this.dialog = false
        this.$nextTick(() => {
          this.editedItem = Object.assign({}, this.defaultItem)
          this.editedIndex = -1
        })
      },

      save () {
        if (this.editedIndex > -1) {
          Object.assign(this.helpRequests[this.editedIndex], this.editedItem)
          this.$store.dispatch("helpRequests/updatehelprequest",this.editedItem);
        }
        this.close()
      },
    },
  };
</script>