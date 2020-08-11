<template>
  <v-dialog 
    v-model="dialog" 
    scrollable 
    max-width="400px">
    <template v-slot:activator="{ on, attrs }">
      <v-btn 
        fab
        x-small
        elevation="0"
        v-bind="attrs"
        color="transparent"
        v-on="on">
        <v-icon>mdi-help-circle-outline</v-icon>
      </v-btn>
    </template>
    <v-card
      tile>
      <v-card-text>
        <p style="margin-top:1rem;">Choose your <strong>number</strong>, from 2 to 5. A high number means you’re better at <strong>LASERS</strong> (technology; science; cold rationality; calm, precise action). A low number means you’re better at <strong>FEELINGS</strong> (intuition; diplomacy; seduction; wild, passionate action).</p>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn text color="error" @click="dialog = false">Close</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
  export default {
    name: 'NumberDialog',
    data: () => ({
      dialog: false,
    }),
  }
</script>