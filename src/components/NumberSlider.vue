<template>
  <div :class="wrapClass">
    <v-card-subtitle :class="titleClass">
      <span>{{ title }}</span>
      <Dialog v-if="hasDialog">
        <p style="margin-top:1rem;">Choose your <strong>number</strong>, from 2 to 5, by dragging the slider or using the <span class="nowrap"><v-icon small color="error">mdi-heart</v-icon>/<v-icon small color="success">mdi-brain</v-icon></span> buttons.</p>
        <p>A high number means you’re better at <strong>LASERS</strong> (technology; science; cold rationality; calm, precise action).</p>
        <p>A low number means you’re better at <strong>FEELINGS</strong> (intuition; diplomacy; seduction; wild, passionate action).</p>
        <p><em>Note: once you set this number, it should not change for the rest of the game.</em></p>
      </Dialog>
    </v-card-subtitle>

    <v-card-text>
      <v-slider
        v-model="num"
        thumb-label="always"
        color="info"
        track-color="warning"
        min="2"
        max="5"
        ticks="always"
        :thumb-size="20"
        class="slider align-center"
        hide-details>
        <template v-slot:prepend>
          <v-btn
            fab
            small
            elevation="0"
            color="#f7edfd"
            @click="decrement('num', 2)"
            class="slider-button">
            <v-icon
              color="error">
              mdi-heart
            </v-icon>
          </v-btn>
        </template>
        <template v-slot:append>
          <v-btn
            fab
            small
            elevation="0"
            color="#f7edfd"
            @click="increment('num', 5)"
            class="slider-button">
            <v-icon
              color="success">
              mdi-brain
            </v-icon>
          </v-btn>
        </template>
      </v-slider>
    </v-card-text>

    <v-snackbar
      light
      multiLine
      elevation="1"
      timeout="6000"
      color="warning"
      transition="slide-y-reverse-transition"
      v-model="alert.show">
      {{ alert.text }}
      <template v-slot:action="{ attrs }">
        <v-btn
          color="secondary"
          text
          v-bind="attrs"
          @click="alert.show = false">
          Close
        </v-btn>
      </template>
    </v-snackbar>
  </div>
</template>

<script>
import Dialog from '@/components/DialogHelp';

export default {
  name: 'NumberSlider',
  components: {
    Dialog
  },
  props: {
    title: {
      type: String,
      required: false,
      default: 'Character Number',
    },
    hasTopPad: {
      type: Boolean,
      required: false,
      default: true,
    },
    padBottom: {
      type: Number,
      required: false,
      default: 0,
    },
    hasDialog: {
      type: Boolean,
      required: false,
      default: true,
    },
  },
  data: () => ({
    num: 3,
    alert: {
      show: false,
      text: null
    },
  }),
  computed: {
    wrapClass () {
      return `pb-${this.padBottom}`
    },
    titleClass () {
      return (this.hasTopPad) ? null : 'pt-0'
    },
  },
  methods: {
    openTag (tag) {
      return `<${tag}>`
    },
    closeTag (tag) {
      return `</${tag}>`
    },
    decrement (field, min) {
      // minus button
      if (this[field] === min) return
      this[field]--
    },
    increment (field, max) {
      // plus button
      if (this[field] === max) return
      this[field]++
    },
  },
  mounted () {
    // load data from local storage if available
    const number = localStorage.getItem('targetNumber')
    if (number) {
      this.num = number
      // alert the user
      this.alert.text = `Loaded your most recent character number (${number}).`
      this.alert.show = true
    }
  },
  watch: {
    num: function (newNum, oldNum) {
      if (newNum === oldNum) return
      // emit change to parent
      this.$emit('numberChange', this.num)
      // save target number to local storage on change
      localStorage.setItem('targetNumber', newNum)
    },
  },
}
</script>

<style lang="scss" scoped>
.v-card__subtitle {
  display: flex;
  align-items: center;
  & > span {
    margin-right: 5px;
  }
}
</style>