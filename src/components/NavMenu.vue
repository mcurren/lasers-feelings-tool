<template>
  <v-navigation-drawer
    :value="open"
    width="300"
    fixed
    temporary
    @input="toggleMenu($event)">
    <v-list-item>
      <v-list-item-content>
        <v-list-item-title class="title">
          Lasers & Feelings
        </v-list-item-title>
      </v-list-item-content>
    </v-list-item>
    <v-list
      dense
      nav>
      <v-list-item-group
        v-model="group"
        active-class="primary--text text--accent-4">
        <v-list-item to="/">
          <v-list-item-title>Intro</v-list-item-title>
        </v-list-item>
      </v-list-item-group>
    </v-list>

    <v-divider class="mt-3 mb-4"></v-divider>

    <v-list-item>
      <v-list-item-content>
        <v-list-item-title class="title">
          Players
        </v-list-item-title>
      </v-list-item-content>
    </v-list-item>
    <v-list
      dense
      nav>
      <v-list-item-group
        v-model="group"
        active-class="primary--text text--accent-4">
        <v-list-item to="/roll">
          <v-list-item-title>Roll Dice</v-list-item-title>
        </v-list-item>

        <v-list-item to="/character">
          <v-list-item-title>Create a Character</v-list-item-title>
        </v-list-item>

        <v-list-item to="/ship">
          <v-list-item-title>Create a Ship</v-list-item-title>
        </v-list-item>
      </v-list-item-group>
    </v-list>

    <v-divider class="mt-3 mb-4"></v-divider>

    <v-list-item>
      <v-list-item-content>
        <v-list-item-title class="title">
          Game Master
        </v-list-item-title>
      </v-list-item-content>
    </v-list-item>
    <v-list
      dense
      nav>
      <v-list-item-group
        v-model="group"
        active-class="primary--text text--accent-4">
        <v-list-item to="/mission">
          <v-list-item-title>Generate a Mission</v-list-item-title>
        </v-list-item>

        <v-list-item to="/run">
          <v-list-item-title>Run the Game</v-list-item-title>
        </v-list-item>
      </v-list-item-group>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
export default {
  name: 'NavMenu',
  data: () => ({
    group: null,
  }),
  props: {
    open: {
      type: Boolean,
      required: true,
    }
  },
  methods: {
    toggleMenu (event) {
      this.$emit('changeMenu', event)
    },
  },
}
</script>
