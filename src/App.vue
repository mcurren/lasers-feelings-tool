<template>
  <v-app :class="appBgClass">
    <!-- header -->
    <v-app-bar app elevation="1" dark color="primary">
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
      <div class="d-flex align-center">
        <h1 class="text-h6">LASERS & FEELINGS <span class="hide-xs">APP</span></h1>
      </div>
      <v-spacer/>
      <DialogInfo/>
    </v-app-bar>

    <!-- content -->
    <v-main>
      <router-view id="content" @updateOutcome="updateOutcome"/>
    </v-main>

    <!-- nav -->
    <v-navigation-drawer
      v-model="drawer"
      fixed
      temporary>
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
          <v-list-item to="/">
            <v-list-item-title>Roll Dice</v-list-item-title>
          </v-list-item>

          <v-list-item to="/character">
            <v-list-item-title>Create a Character</v-list-item-title>
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

    <!-- footer -->
    <v-footer app flat absolute dark color="transparent">
      <div id="footer">
        <a href="https://curren.me" title="Mike Curren Portfolio" target="_blank">author</a>
        <a href="https://github.com/mcurren/lasers-feelings-tool" title="Fork the repo on Github" target="_blank">github repo</a>
      </div>
    </v-footer>
  </v-app>
</template>

<script>
import DialogInfo from '@/components/DialogInfo';

export default {
  name: 'App',
  components: {
    DialogInfo,
  },
  data: () => ({
    drawer: false,
    group: null,
    outcome: null,
  }),
  computed: {
    appBgClass () {
      return (this.outcome) ? `bg--${this.outcome}` : false
    },
  },
  methods: {
    updateOutcome (outcome) {
      this.outcome = outcome
    }
  },
};
</script>

<style lang="scss">
// utility classes
.hide-xs {
  @media (max-width: 459px) {
    display: none;
  }
}
.nowrap {
  white-space: nowrap;
}
.align-center {
  align-items: center;
}
// global styles
body {
  touch-action: manipulation;
  background: #5a1078;
}
#app {
  background: linear-gradient(0deg, rgba(90,16,120,1) 10%, rgba(177,59,191,1) 45%, rgba(250,184,100,1) 100%) !important;
  transition: background 0.6s;
  &.bg--success {
    background: rgba(#01a8a5,1) !important;
  }
  &.bg--mixed {
    background: rgba(#fab864,1) !important;
  }
  &.bg--failure {
    background: rgba(#d4396f,1) !important;
  }
}
#nav {
  padding: 30px;
  a {
    font-weight: bold;
    color: #2c3e50;
    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
#content {
  max-width: 580px;
  margin: 0 auto;
  position: relative;
  section {
    margin: 2rem 0.75rem;
  }
}
#footer {
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
// results styles - needs to avoid scoping???
.results {
  em, strong {
    white-space: nowrap;
  }
  .flavor {
    font-size: 1.1em;
  }
  .rules {
    font-size: 0.85rem;
    line-height: 1.4;
    color: rgba(#000825, 0.75);
    margin-top: -10px;
    // padding-left: 8px;
    // border-left: 3px solid rgba(#000825, 0.3);
    // &:before {
    //   content: '"'
    // }
    // &:after {
    //   content: '"'
    // }
  }
}
// vuetify overrides
.v-application--wrap { // avoid iphoneX "notch" - not working...
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
</style>