<template>
  <v-navigation-drawer
    :value="open"
    width="340"
    class="secondary"
    dark
    fixed
    temporary
    @input="toggleMenu($event)">
    <v-list-item 
      to="/" 
      active-class="accent--text">
      <v-list-item-avatar>
        <img src="../assets/avatar-white.png">
      </v-list-item-avatar>
      <v-list-item-content>
        <v-list-item-title>Lasers & Feelings App</v-list-item-title>
      </v-list-item-content>
    </v-list-item>

    <v-list
      dense
      shaped
      ripple
      nav>
      <v-subheader>PLAYERS</v-subheader>
      <v-list-item 
        v-for="item in playerItems" 
        :key="item.title" 
        :to="item.route"
        active-class="accent--text">
        <v-list-item-icon v-if="item.icon">
          <v-icon>{{ item.icon }}</v-icon>
        </v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title>{{ item.title }}</v-list-item-title>
        </v-list-item-content>
      </v-list-item>

      <v-subheader class="mt-4">GAME MASTER</v-subheader>
      <v-list-item 
        v-for="item in gmItems" 
        :key="item.title" 
        :to="item.route"
        active-class="accent--text">
        <v-list-item-icon v-if="item.icon">
          <v-icon>{{ item.icon }}</v-icon>
        </v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title>{{ item.title }}</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
import { Auth } from '@/firebase/auth';

export default {
  name: 'NavMenu',
  data: () => ({
    gmItems: [
      {
        icon: 'mdi-script-text-outline',
        title: 'Generate a Mission',
        route: '/mission',
      },
      {
        icon: 'mdi-puzzle-outline',
        title: 'Run the Game',
        route: '/run',
      },
    ],
  }),
  props: {
    open: {
      type: Boolean,
      required: true,
    }
  },
  computed: {
    playerItems () {
      return [
        {
          icon: 'mdi-account-edit-outline',
          title: 'Create a Character',
          route: this.getRoute('character'),
        },
        {
          icon: 'mdi-rocket-outline',
          title: 'Create a Ship',
          route: this.getRoute('ship'),
        },
        {
          icon: 'mdi-dice-multiple-outline',
          title: 'Roll Some Dice',
          route: '/roll',
        },
      ]
    },
  },
  methods: {
    toggleMenu (event) {
      this.$emit('changeMenu', event)
    },
    getRoute (route) {
      const userId = (Auth.currentUser) ? Auth.currentUser.uid : false
      return (userId) ? `/${route}/${userId}` : `/${route}`
    },
  },
}
</script>
