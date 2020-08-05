<template>
  <v-app>
    <v-app-bar
      app
      color="primary"
      dark>
      <div class="d-flex align-center">
        <h1 class="text-h6">Roll for LASERS & FEELINGS</h1>
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
        <v-card>
          <v-card-title>What the what?</v-card-title>
          <v-card-text>
            <p>Want to play the popular one-page RPG <a href="http://www.onesevendesign.com/laserfeelings/" target="_blank">Lasers & Feelings</a> but don't have any dice to roll?</p>
            <p>This app has got your back!</p>
          </v-card-text>
          <v-card-actions>
            <v-btn text @click="dialog = false">Ok, let me roll!</v-btn>
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
    background: lighten(#8BC4FE, 21%);
  }
  .theme--light.v-icon {
    color: rgba(0,8,37,0.74);
  }
  .theme--light.v-card > .v-card__text, 
  .theme--light.v-card .v-card__subtitle {
    color: rgba(0,8,37,0.8);
  }
  .theme--light.v-sheet--outlined {
    border-color: rgba(0,8,37,0.2);
  }

  .results .mixed {
    color: darken(#fab864, 15%);
  }
  .results .win {
    color: #01a8a5;
  }
  .results .failure {
    color: #d4396f;
  }
</style>