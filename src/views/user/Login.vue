<template>
  <div class="home text-left text-sm-center">
    <section>
      <v-card
        flat
        shaped
        elevation="0"
        class="mb-6">
        <v-card-title>Sign In</v-card-title>
        <v-card-text
        class="text-left">
          <form novalidate @submit.prevent="login">
            <div v-if="errors.length" class="mb-4">
              <div v-for="error in errors" :key="error" class="error--text">{{error}}</div>
            </div>
            <div>
              <v-text-field v-model="email" label="Email" prepend-icon="mdi-email-outline" type="email" required invalidFeedback="Please provide an email"/>
              <v-text-field v-model="password" label="Password" prepend-icon="mdi-lock-outline" type="password" required invalidFeedback="Please provide a password"/>
            </div>
            <v-card-actions>
              <p class="my-0">Need an account? <router-link :to="registerRoute">Register here</router-link>.</p>
              <v-spacer></v-spacer>
              <v-btn type="submit">Sign In</v-btn>
            </v-card-actions>
          </form>
        </v-card-text>
      </v-card>
    </section>
  </div>
</template>

<script>
import { Auth } from '@/firebase/auth'
import { required, email } from 'vuelidate/lib/validators'

export default {
  name: 'LogIn',
  props: {
    game: {
      type: String,
      required: false,
      default: null,
    },
  },
  data() {
    return {
      email: '',
      password: '',
      errors: [],
    };
  },
  computed: {
    registerRoute () {
      return (this.game) ? `/user/register/${this.game}` : '/user/register'
    },
  },
  validations: {
    email: {
      required,
      email,
    },
    password: {
      required,
    },
  },
  methods: {
    login(event) {
      // clear any existing error messages
      this.errors = [];
      // validate the form
      this.$v.$touch()
      if (this.$v.email.$invalid) {
        this.errors.push('Please enter a valid email address.');
      }
      if (this.$v.password.$invalid) {
        this.errors.push('Please enter a password.');
      }
      // submit the form
      if (!this.$v.$invalid) {
        event.target.classList.add('was-validated');
        Auth.signInWithEmailAndPassword(this.email, this.password)
          .then(() => {
            this.$store.commit('authUser', { userId: Auth.currentUser.uid })
            const destination = (this.game) ? `/game/${this.game}` : '/game'
            this.$router.push(destination)
          })
          .catch(err => this.errors.push(err.message));
      }
    },
  },
}
</script>
<style lang="scss" scoped>
</style>
