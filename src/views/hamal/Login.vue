<template>
  <v-app id="inspire">
    <v-content>
      <v-container
        class="fill-height"
        fluid
      >
        <v-row
          align="center"
          justify="center"
        >
      <h2 class="text-center red--text" v-if="wrongCred">שם משתמש או סיסמה לא נכונים. נסה שוב</h2>
              <!-- <v-col cols="12">
        <v-img
          :src="require('../../assets/hamal-logo.png')"
          contain
          height="100"
        />
      </v-col> -->
          <v-col
            cols="12"
            sm="8"
            md="4"
          >
            <v-card class="elevation-12">
              <v-toolbar
                color="primary"
                dark
                flat
              >
                <v-toolbar-title>התחברות למערכת חמל</v-toolbar-title>
                <v-spacer />

              </v-toolbar>
              <v-card-text>
                <v-form v-on:submit.prevent="loginUser">
                  <v-text-field
                    label="שם משתמש"
                    name="login"
                    prepend-icon="mdi-account"
                    type="text"
                     v-model="username"
                  />

                  <v-text-field
                    id="password"
                    label="סיסמה"
                    name="password"
                    prepend-icon="mdi-lock"
                    type="password"
                    v-model="password"
                  />
                </v-form>
              </v-card-text>
              <v-card-actions>
                <v-spacer />
                <v-btn  @click="loginUser()" color="primary">כניסה</v-btn>
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
  export default {
    name: 'login',

    data () {
      return {
        username: '',
        password: '',
        wrongCred: false // activates appropriate message if set to true
      }
    },
    methods: {
      loginUser () { // call loginUSer action
        console.log("Asd")
        this.$store.dispatch('loginUser', {
        
          username: this.username,
          password: this.password
        })
            .then(() => {
              this.wrongCred = false
              this.$router.push({ name: 'Hamal' })
            })
          .catch(err => {
            console.log(err)
            this.wrongCred = true // if the credentials were wrong set wrongCred to true
          })
        }
      }
  }
</script>

