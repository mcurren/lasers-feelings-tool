<template>
  <v-app>
    <!-- header -->
    <v-app-bar app flat dark color="primary">
      <div class="d-flex align-center">
        <h1 class="text-h6"><span class="hide-xs">Roll For</span> LASERS & FEELINGS</h1>
      </div>
      <v-spacer/>
      <InfoDialog/>
    </v-app-bar>

    <!-- content -->
    <v-main>
      <Main/>
    </v-main>

    <!-- footer -->
    <v-footer app flat dark color="transparent">
      <div class="footer-links">
        <a href="https://github.com/mcurren/lasers-feelings-tool" title="Fork the repo on Github" target="_blank">github</a>
        <a href="http://onesevendesign.com/lasers_and_feelings_rpg.pdf" title="Lasers & Feelings RPG PDF" target="_blank">official rules</a>
      </div>
    </v-footer>
  </v-app>
</template>

<script>
import Main from './components/Main';
import InfoDialog from './components/InfoDialog';

export default {
  name: 'App',
  components: {
    Main,
    InfoDialog,
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
// global styles
body {
  touch-action: manipulation;
  background: lighten(#fab864, 28%);
  background: linear-gradient(0deg, rgba(90,16,120,1) 10%, rgba(177,59,191,1) 45%, rgba(250,184,100,1) 100%);
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
// results styles - needs to avoid scoping???
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