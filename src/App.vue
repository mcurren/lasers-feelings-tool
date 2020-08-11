<template>
  <v-app>
    <!-- header -->
    <v-app-bar app elevation="1" dark color="primary">
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
    <v-footer app flat absolute dark color="primary">
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
  background: #5a1078;
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
    padding-left: 8px;
    border-left: 3px solid rgba(#000825, 0.3);
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