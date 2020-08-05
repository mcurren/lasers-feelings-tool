<template>
  <v-app>
    <v-app-bar
      app
      color="primary"
      dark
    >
      <div class="d-flex align-center">
        <h1 class="text-h6">Roll for LASERS & FEELINGS</h1>
      </div>

      <v-spacer></v-spacer>

      <v-dialog v-model="dialog" scrollable max-width="300px">
        <template v-slot:activator="{ on, attrs }">
          <v-btn 
            fab
            small
            elevation="1"
            color="light-blue"
            v-bind="attrs"
            v-on="on">
            <v-icon dark>mdi-head-question-outline</v-icon>
          </v-btn>
        </template>
        <v-card>
          <v-card-title>What the what?</v-card-title>
          <v-card-text>
            <p>Want to play the popular one-page RPG <a href="http://www.onesevendesign.com/laserfeelings/" target="_blank">Lasers & Feelings</a> but don't have any dice to roll?</p>
            <p>This app has got your back!</p>
          </v-card-text>
          <v-card-actions>
            <v-btn color="blue darken-1" text @click="dialog = false">Ok, let me roll!</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-app-bar>

    <v-main>
      <HelloWorld/>
    </v-main>
  </v-app>
</template>

<script>
import HelloWorld from './components/HelloWorld';

export default {
  name: 'App',
  components: {
    HelloWorld,
  },
  data: () => ({
    dialog: false,
  }),
};
</script>
