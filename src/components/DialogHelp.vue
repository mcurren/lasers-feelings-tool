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
        <slot></slot>
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
    name: 'Dialog',
    data: () => ({
      dialog: false,
    }),
  }
</script>