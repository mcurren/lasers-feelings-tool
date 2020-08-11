<template>
  <v-dialog 
    v-model="dialog" 
    scrollable 
    max-width="500px">
    <template v-slot:activator="{ on, attrs }">
      <v-btn 
        fab
        x-small
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
        <p style="margin-top:1rem;">Want to play the popular one-page RPG <strong><a href="http://www.onesevendesign.com/laserfeelings/" title="Lasers & Feelings RPG" target="_blank">Lasers & Feelings</a></strong> but don't have any dice to roll? This app has got your back!</p>
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
              <p>Below the dice icons is some flavor text that explains what the outcome your rolls mean as per the <strong><a href="http://onesevendesign.com/lasers_and_feelings_rpg.pdf" title="Lasers & Feelings RPG PDF" target="_blank">official rules</a></strong> of the game.</p>
              <p>Click the <em>NEW ROLL</em> button when you need to make your next roll in the game.</p>
            </v-expansion-panel-content>
          </v-expansion-panel>
        </v-expansion-panels>
      </v-card-text>
      <v-divider></v-divider>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn text color="error" @click="dialog = false">Ok, let's roll!</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
  export default {
    name: 'InfoDialog',
    data: () => ({
      dialog: false,
    }),
  }
</script>