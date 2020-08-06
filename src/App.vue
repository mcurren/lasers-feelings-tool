<template>
  <v-app>
    <v-app-bar
      app
      color="primary"
      flat
      dark>
      <div class="d-flex align-center">
        <h1 class="text-h6"><span class="hide-xs">Roll 4 </span>LASERS & FEELINGS</h1>
      </div>

      <v-spacer></v-spacer>

      <v-dialog v-model="dialog" scrollable max-width="300px">
        <template v-slot:activator="{ on, attrs }">
          <v-btn 
            fab
            small
            color="error"
            elevation="1"
            v-bind="attrs"
            v-on="on">
            <v-icon>mdi-head-question-outline</v-icon>
          </v-btn>
        </template>
        <v-card
          shaped>
          <v-card-title>What the what?</v-card-title>
          <v-card-text>
            <p>Want to play the popular one-page RPG <a href="http://www.onesevendesign.com/laserfeelings/" target="_blank">Lasers & Feelings</a> but don't have any dice to roll?</p>
            <p>This app has got your back!</p>
          </v-card-text>
          <v-card-actions>
            <v-btn text color="success" @click="dialog = false">Ok, let me roll!</v-btn>
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

<style lang="scss">
  .theme--light > .v-application--wrap {
    background: lighten(#fab864, 28%);
    background: linear-gradient(0deg, rgba(90,16,120,0.9) 10%, rgba(177,59,191,0.9) 45%, rgba(250,184,100,0.9) 100%);
  }
  .theme--light.v-icon {
    color: rgba(0,8,37,0.74);
  }
  .theme--light.v-card > .v-card__text, 
  .theme--light.v-card .v-card__subtitle {
    color: rgba(0,8,37,0.8);
  }
  .theme--light.v-sheet--outlined {
    border-color: rgba(0,8,37,0.28);
  }

  .results {
    .mixed {
      color: darken(#fab864, 15%);
    }
    .win {
      color: #01a8a5;
    }
    .failure {
      color: #d4396f;
    }
    em, strong {
      white-space: nowrap;
    }
  }

  .hide-xs {
    @media (max-width: 459px) {
      display: none;
    }
  }
</style>