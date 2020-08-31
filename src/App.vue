<template>
  <v-app :class="appBgClass">
    <div class="bg-results bg-results--success"></div>
    <div class="bg-results bg-results--mixed"></div>
    <div class="bg-results bg-results--failure"></div>
    <!-- header -->
    <v-app-bar 
      app 
      dark 
      elevation="1"
      color="primary">
      <router-link to="/">
        <img src="./assets/avatar-white.png" class="header-icon">
      </router-link>
      <v-divider
        class="mx-4"
        vertical
        inset
      ></v-divider>
      <v-toolbar-title>
        {{ this.$route.name }}
      </v-toolbar-title>
      <v-spacer/>
      <v-toolbar-items>
        <InfoDialog/>
      </v-toolbar-items>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
    </v-app-bar>

    <!-- content -->
    <v-main>
      <v-container fluid>
        <transition name="fade" mode="out-in">
          <router-view 
            id="content"
            @updateOutcome="updateOutcome"
            @toggleMenu="drawer = !drawer"
          />
        </transition>
      </v-container>
    </v-main>

    <!-- nav -->
    <NavMenu 
      :open="drawer"
      @changeMenu="drawer = $event"
    />

    <!-- footer -->
    <v-footer app flat absolute dark color="transparent">
      <CreditDialog/>
      <v-spacer/>
      <v-btn 
        text
        color="white"
        href="https://github.com/mcurren/lasers-feelings-tool"
        target="_blank">
        Fork Me
      </v-btn>
    </v-footer>
  </v-app>
</template>

<script>
import NavMenu from '@/components/NavMenu';
import InfoDialog from '@/components/DialogInfo';
import CreditDialog from '@/components/DialogCredit';

export default {
  name: 'App',
  components: {
    InfoDialog,
    CreditDialog,
    NavMenu,
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
.hide-small {
  @media (max-width: 599px) {
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
img {
  max-width: 100%;
}
#app {
  background: linear-gradient(0deg, rgba(90,16,120,1) 10%, rgba(177,59,191,1) 45%, rgba(250,184,100,1) 100%) !important;
  transition: background 0.6s;
  &.bg--success {
    .bg-results--success {
      opacity: 1;
    }
  }
  &.bg--mixed {
    .bg-results--mixed {
      opacity: 1;
    }
  }
  &.bg--failure {
    .bg-results--failure {
      opacity: 1;
    }
  }
}
.bg-results {
  position: fixed;
  opacity: 0;
  z-index: 0;
  width: 100vw;
  height: 100vh;
  transition: opacity 0.8s ease-in-out;
  &.bg-results--success {
    background-color: #01a8a5;
  }
  &.bg-results--mixed {
    background-color: #fab864;
  }
  &.bg-results--failure {
    background-color: #d4396f;
  }
}
.v-application h1 a {
  color: inherit;
  text-decoration: none;;
}
.header-icon {
  max-height: 36px;
  display: block;
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
    margin: 1rem 0 2em;
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
  }
}
// vuetify overrides
.v-application--wrap { // avoid iphoneX "notch" - not working...
  padding: env(safe-area-inset-top) env(safe-area-inset-right) env(safe-area-inset-bottom) env(safe-area-inset-left);
}
.theme--light.v-application {
  background: none transparent !important;
}
.v-toolbar__title {
  transform: translateY(-1px);
}
.theme--light.v-icon {
  color: rgba(0,8,37,0.74);
}
.v-card__subtitle {
  padding-bottom: 10px;

  &:not(:first-child) {
    padding-top: 0;
  }
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
// page transitions
.fade-enter-active, .fade-leave-active {
  transition: opacity .4s;
}
.fade-enter, .fade-leave-active {
  opacity: 0;
}
</style>