<template>
  <v-app>
    <v-app-bar
      app
      color="primary"
      flat
      dark>
      <div class="d-flex align-center">
        <h1 class="text-h6"><span class="hide-xs">Roll For</span> LASERS & FEELINGS</h1>
      </div>

      <v-spacer></v-spacer>

      <v-dialog 
        v-model="dialog" 
        scrollable 
        max-width="500px">
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
          tile>
          <v-card-title>What the what?</v-card-title>
          <v-divider></v-divider>
          <v-card-text>
            <p style="margin-top:1rem;">Want to play the popular one-page RPG <strong><a href="http://www.onesevendesign.com/laserfeelings/" target="_blank">Lasers & Feelings</a></strong> but don't have any dice to roll? This app has got your back!</p>
            <p>If you have no idea what Lasers & Feelings is check out the above link to get in the know!</p>
            <p>Having trouble using this app? See below:</p>
            <v-expansion-panels
              flat
              tile>
              <v-expansion-panel>
                <v-expansion-panel-header>The Roll</v-expansion-panel-header>
                <v-expansion-panel-content>
                  <p><strong>Step 1</strong> - Set your character's Lasers/Feelings number by dragging the slider or clicking on the <span style="white-space: nowrap;">feelings (<v-icon small color="error">mdi-heart</v-icon>)</span> or <span style="white-space: nowrap;">lasers (<v-icon small color="success">mdi-brain</v-icon>)</span> buttons on either side of the slider.</p>
                  <p><strong>Step 2</strong> - Select if you're using Lasers or Feelings for the action you are rolling for.</p>
                  <p><strong>Step 3</strong> - Select the number of dice you are rolling for this action. This is probably determined by a discussion with the GM based on the situation.</p>
                  <p><strong>Step 4</strong> - Click the <em>ROLL</em> button to see the outcome of your rolls.</p>
                </v-expansion-panel-content>
              </v-expansion-panel>
              <v-expansion-panel>
                <v-expansion-panel-header>The Outcome</v-expansion-panel-header>
                <v-expansion-panel-content>
                  <p>At the top of the outcome you should see dice icons showing the actual rolls you got.<p>
                  <p>Below the dice icons is some flavor text that explains what the outcome your rolls mean as per the basic rules of the game.</p>
                  <p>Click the <em>NEW ROLL</em> button when you need to make your next roll in the game.</p>
                </v-expansion-panel-content>
              </v-expansion-panel>
            </v-expansion-panels>
          </v-card-text>
          <v-divider></v-divider>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn text color="primary" @click="dialog = false">Ok, let's roll!</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-app-bar>

    <v-main>
      <Main/>
    </v-main>

    <v-footer
      dark
      app
      flat
      color="transparent">
      <div class="footer-links">
        <a href="https://github.com/mcurren/lasers-feelings-tool" target="_blank">github</a>
        <a href="http://onesevendesign.com/lasers_and_feelings_rpg.pdf" target="_blank">l&f rules</a>
      </div>
    </v-footer>
  </v-app>
</template>

<script>
import Main from './components/Main';

export default {
  name: 'App',
  components: {
    Main,
  },
  data: () => ({
    dialog: false,
  }),
};
</script>

<style lang="scss">
body {
  touch-action: manipulation;
  background: lighten(#fab864, 28%);
  background: linear-gradient(0deg, rgba(90,16,120,1) 10%, rgba(177,59,191,1) 45%, rgba(250,184,100,1) 100%);
}

.v-application--wrap {
  padding: env(safe-area-inset-top) env(safe-area-inset-right) env(safe-area-inset-bottom) env(safe-area-inset-left);
}
.theme--light.v-application {
  background: none transparent !important;
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
.v-expansion-panel-header,
.v-expansion-panel-content__wrap {
  padding-left: 0 !important;
  padding-right: 0 !important;
}

.results {
  .mixed {
    color: darken(#fab864, 15%);
  }
  .win {
    color: #01a8a5;
  }
  .fail {
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
.footer-links {
  display: flex;
  flex: 1;
  justify-content: space-between;
  a {
    display: inline-block;
    color: white !important;
    text-decoration: none;
    padding: 0.5rem;
  }
}
</style>