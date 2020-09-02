<template>
  <div class="home text-left text-sm-center">
    <section>
      <v-card
        flat
        shaped
        elevation="0"
        class="mb-6">
        <v-card-title>Register</v-card-title>
        <v-card-text
        class="text-left">
          <form novalidate @submit.prevent="submit">
            <div v-if="errors.length" class="mb-4">
              <div v-for="error in errors" :key="error" class="error--text">{{error}}</div>
            </div>
            <div>
              <v-text-field v-model="email" label="Email" prepend-icon="mdi-email-outline" type="email" required invalidFeedback="Please provide an email"/>
              <v-text-field v-model="password" label="Password" prepend-icon="mdi-lock-outline" type="password" required invalidFeedback="Please provide a password"/>
              <v-text-field v-if="password.length" v-model="confirmPassword" label="Confirm Password" prepend-icon="mdi-lock-outline" type="password" required invalidFeedback="Please provide a password"/>
            </div>
            <v-card-actions>
              <p class="my-0">Already have an account? <router-link :to="loginRoute">Login here</router-link>.</p>
              <v-spacer></v-spacer>
              <v-btn type="submit">Register</v-btn>
            </v-card-actions>
          </form>
        </v-card-text>
      </v-card>
    </section>
  </div>
</template>

<script>
import { Auth } from '@/firebase/auth'
import { required, email, minLength, sameAs } from 'vuelidate/lib/validators'

export default {
  name: 'Register',
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
      confirmPassword: '',
      errors: [],
    };
  },
  computed: {
    loginRoute () {
      return (this.game) ? `/user/login/${this.game}` : '/user/login'
    },
  },
  validations: {
    email: {
      required,
      email,
    },
    password: {
      required,
      minLength: minLength(6)
    },
    confirmPassword: {
      sameAsPassword: sameAs('password')
    }
  },
  methods: {
    submit(event) {
      // clear any existing error messages
      this.errors = [];
      // validate the form
      this.$v.$touch()
      if (this.$v.email.$invalid) {
        this.errors.push('Please enter a valid email address.');
      }
      if (!this.email.length) {
        this.errors.push('Please enter a password.');
      }
      if (this.email.length && this.$v.password.$invalid) {
        this.errors.push('Your password is not long enough!');
      }
      if (!this.confirmPassword.length) {
        this.errors.push('Please confirm your password.')
      }
      if (this.confirmPassword.length && this.$v.confirmPassword.$invalid) {
        this.errors.push('Passwords do not match.');
      }
      // submit the form
      if (!this.$v.$invalid) {
        event.target.classList.add('was-validated');
        Auth.createUserWithEmailAndPassword(this.email, this.password)
          .then((created) => {
            console.log(created.user)
            // created.user.sendEmailVerification().then(() => {
            //   this.$router.push('/user/profile');
            // });
            this.$store.commit('authUser', { userId: Auth.currentUser.uid })
            const destination = (this.game) ? `/game/${this.game}` : '/game'
            this.$router.push(destination)
          }).catch((error) => {
            this.errors.push(error.message);
          });
      }
    },
  },
}
</script>
<style lang="scss" scoped>
</style>
