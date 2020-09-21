<template>
    <div>
        <v-row align="center" justify="center">
            <v-col class="ma-0 my-5 pa-0" cols="12">
                <v-img
                        :src="require('../../../../assets/volunteer_generic_certificate.jpg')"
                        contain
                        max-width="750"
                        class="grey lighten-2 mx-auto"
                />
            </v-col>

        </v-row>

        <v-row align="center" justify="center">
            <v-col class="ma-0 my-5 pa-0" cols="1">
            <v-btn
                    :href="require('../../../../assets/volunteer_generic_certificate.jpg')"
                    dark
                    download
                    color="success"
            >
                הורדת התעודה
            </v-btn>
            </v-col>

        </v-row>
    </div>
</template>


