<template>
  <div class="container is-fluid mt-5">
    <div class="columns is-centered">
      <div class="card is-5 column columns my-5" style="padding: 0">
        <div class="card-content column is-12 px-6 pt-6">
          <h1 class="title is-3 has-text-centered">Sign Up</h1>
          <hr style="background-color: rgb(3, 51, 35)" />
          <div class="field">
            <div class="field">
              <label class="label">Username</label>
              <div class="control">
                <input class="input" type="text" />
              </div>
            </div>

            <div class="field">
              <label class="label">Password</label>
              <div class="control">
                <input class="input" type="password" />
              </div>
            </div>

            <div class="field">
              <label class="label">Confirm Password</label>
              <div class="control">
                <input class="input" type="password" />
              </div>
            </div>

            <div class="field">
              <label class="label">Email</label>
              <div class="control">
                <input
                  v-model="$v.email.$model"
                  :class="{ 'is-danger': $v.email.$error }"
                  class="input"
                  type="text"
                />
              </div>
              <template v-if="$v.email.$error">
                <p class="help is-danger" v-if="!$v.email.required">
                  This field is required
                </p>
                <p class="help is-danger" v-if="!$v.email.email">
                  Invalid Email
                </p>
              </template>
            </div>

            <div class="field">
              <label class="label">Mobile Number</label>
              <div class="control">
                <input
                  v-model="$v.mobile.$model"
                  :class="{ 'is-danger': $v.mobile.$error }"
                  class="input"
                  type="text"
                />
              </div>
              <template v-if="$v.mobile.$error">
                <p class="help is-danger" v-if="!$v.mobile.required">
                  This field is required
                </p>
                <p class="help is-danger" v-if="!$v.mobile.mobile">
                  Invalid Mobile Number
                </p>
              </template>
            </div>

            <div class="field">
              <label class="label">First Name</label>
              <div class="control">
                <input class="input" type="text" />
              </div>
            </div>

            <div class="field">
              <label class="label">Last Name</label>
              <div class="control">
                <input class="input" type="text" />
              </div>
            </div>

            <button class="button is-primary is-fullwidth" @click="submit()">
              Sign Up
            </button>

            <p class="my-3">
              Already have an account? <a href="#/login">Login</a>
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { required, email, minLength, sameAs } from "vuelidate/lib/validators";
function mobile(value) {
  return !!value.match(/0[0-9]{9}/);
}
function complexPassword(value) {
  if (!(value.match(/[a-z]/) && value.match(/[A-Z]/) && value.match(/[0-9]/))) {
    return false;
  }
  return true;
}
export default {
  name: "signupPage",
  data() {
    return {
      username: "",
      password: "",
      confirm_password: "",
      email: "",
      mobile: "",
      first_name: "",
      last_name: "",
    };
  },
  validations: {
    email: {
      required,
      email,
    },
  },
  mobile: {
    required: required,
    mobile: mobile,
  },
  password: {
    required: required,
    minLength: minLength(8),
    complex: complexPassword,
  },
  confirm_password: {
    sameAs: sameAs("password"),
  },
  methods: {
    submit() {
      // Validate all fields
      this.$v.$touch();

      // เช็คว่าในฟอร์มไม่มี error
      if (!this.$v.$invalid) {
        let data = {
          username: this.username,
          password: this.password,
          confirm_password: this.confirm_password,
          email: this.email,
          mobile: this.mobile,
          first_name: this.first_name,
          last_name: this.last_name,
        };

        axios
          .post("http://localhost:3000/user/signup", data)
          .then(() => {
            alert("Sign up Success");
          })
          .catch((err) => {
            alert(err.response.data.details.message);
          });
      }
    },
  },
};
</script>

<style>
body {
  background-color: rgb(78, 153, 110);
  height: 130vh;
}
</style>
