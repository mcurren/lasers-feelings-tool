<template>
  <v-dialog 
    v-model="dialog" 
    scrollable 
    max-width="500px">
    <template v-slot:activator="{ on, attrs }">
      <v-btn 
        icon
        v-bind="attrs"
        v-on="on">
        <v-icon>mdi-head-question-outline</v-icon>
      </v-btn>
    </template>
    <v-card
      class="rounded-lg">
      <v-card-title>What the what?</v-card-title>
      <v-card-text>
        <p>Want to play the popular one-page RPG <strong><a href="http://www.onesevendesign.com/laserfeelings/" title="Lasers & Feelings RPG" target="_blank">Lasers & Feelings</a></strong> but don't have any dice to roll? This app has got your back!</p>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn text color="info" @click="dialog = false">Ok, let's roll!</v-btn>
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