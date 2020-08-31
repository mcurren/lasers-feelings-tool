<template>
  <v-dialog 
    v-model="dialog" 
    scrollable 
    max-width="500px">
    <template v-slot:activator="{ on, attrs }">
      <v-btn 
        text
        color="white"
        v-bind="attrs"
        v-on="on">
        credits
      </v-btn>
    </template>
    <v-card
      tile>
      <v-card-title>Credits</v-card-title>
      <v-card-text>
        <p>The entire <a href="http://www.onesevendesign.com/laserfeelings/" title="Lasers & Feelings RPG" target="_blank">Lasers & Feelings</a> RPG, concept and most of the copy in this app was written by the brilliant <a href="https://twitter.com/john_harper" title="Follow John Harper on Twitter" target="_blank">John Harper</a>.</p>
        <p>This silly app was developed with loving care by <a href="https://curren.me" title="Mike Curren's Portfolio" target="_blank">Mike Curren</a>.</p>
        <p>It is built on <a href="https://vuejs.org/" title="Vue.js - The Progressive Javascript Framework" target="_blank">Vue.js</a>, bootstrapped using <a href="https://vuetifyjs.com/" title="Vuetify Material Design Component Framework" target="_blank">Vuetify</a> and hosted on <a href="https://www.netlify.com/" title="Netlify Hosting - Server Less, Do More" target="_blank">Netlify</a>.</p>
        <p>The code is open source and you can find <a href="https://github.com/mcurren/lasers-feelings-tool" title="Fork the repo on Github" target="_blank">the repo on Github</a>.</p>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn text color="info" @click="dialog = false">Close</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
  export default {
    name: 'CreditDialog',
    data: () => ({
      dialog: false,
    }),
  }
</script>