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
                <input
                  v-model="$v.username.$model"
                  :class="{ 'is-danger': $v.username.$error }"
                  class="input"
                  type="text"
                />
              </div>
              <template v-if="$v.username.$error">
                <p class="help is-danger" v-if="!$v.username.required">
                  This field is required
                </p>
                <p class="help is-danger" v-if="!$v.username.minLength">
                  Must be at least 5 characters
                </p>
                <p class="help is-danger" v-if="!$v.username.maxLength">
                  Must be less than 20 characters
                </p>
              </template>
            </div>

            <div class="field">
              <label class="label">Password</label>
              <div class="control">
                <input
                  v-model="$v.password.$model"
                  :class="{ 'is-danger': $v.password.$error }"
                  class="input"
                  type="password"
                />
              </div>
              <template v-if="$v.password.$error">
                <p class="help is-danger" v-if="!$v.password.required">
                  This field is required
                </p>
                <p class="help is-danger" v-if="!$v.password.minLength">
                  Must be at least 8 character
                </p>
                <p class="help is-danger" v-if="!$v.password.complex">
                  Password too easy
                </p>
              </template>
            </div>

            <div class="field">
              <label class="label">Confirm Password</label>
              <div class="control">
                <input
                  v-model="$v.confirm_password.$model"
                  :class="{ 'is-danger': $v.confirm_password.$error }"
                  class="input"
                  type="password"
                />
              </div>
              <template v-if="$v.confirm_password.$error">
                <p class="help is-danger" v-if="!$v.confirm_password.sameAs">
                  Password not match
                </p>
              </template>
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
                <input
                  v-model="$v.first_name.$model"
                  :class="{ 'is-danger': $v.first_name.$error }"
                  class="input"
                  type="text"
                />
              </div>
              <template v-if="$v.first_name.$error">
                <p class="help is-danger" v-if="!$v.first_name.required">
                  This field is required
                </p>
                <p class="help is-danger" v-if="!$v.first_name.maxLength">
                  Must be less than 150 characters
                </p>
              </template>
            </div>

            <div class="field">
              <label class="label">Last Name</label>
              <div class="control">
                <input
                  v-model="$v.last_name.$model"
                  :class="{ 'is-danger': $v.last_name.$error }"
                  class="input"
                  type="text"
                />
              </div>
              <template v-if="$v.last_name.$error">
                <p class="help is-danger" v-if="!$v.last_name.required">
                  This field is required
                </p>
                <p class="help is-danger" v-if="!$v.last_name.maxLength">
                  Must be less than 150 characters
                </p>
              </template>
            </div>
            <div class="field">
              <label class="label">Address</label>
              <div class="control">
                <textarea
                  v-model="$v.address.$model"
                  :class="{ 'is-danger': $v.address.$error }"
                  class="textarea"
                  type="text"
                />
              </div>
              <template v-if="$v.address.$error">
                <p class="help is-danger" v-if="!$v.address.required">
                  This field is required
                </p>
              </template>
            </div>

            <div class="field">
              <label class="label">Age</label>
              <div class="control">
                <input
                  v-model="$v.age.$model"
                  :class="{ 'is-danger': $v.age.$error }"
                  class="input"
                  type="text"
                  placeholder="Enter 2 digits"
                />
              </div>
              <template v-if="$v.age.$error">
                <p class="help is-danger" v-if="!$v.age.required">
                  This field is required
                </p>
                <p class="help is-danger" v-if="!$v.age.age">Invalid Age</p>
                <p class="help is-danger" v-if="!$v.age.maxLength">
                  Must be less than 3 characters
                </p>
              </template>
            </div>

            <div class="field">
              <div class="control">
                <label class="label">You Are a/an</label>
                <div class="select">
                  <select v-model="checkRole">
                    <option>customer</option>
                    <option>employee</option>
                  </select>
                </div>
              </div>
            </div>

            <div class="field" v-if="checkRole == 'employee'">
              <label class="label">Cafe Branch ID</label>
              <div class="control">
                <input
                  v-model="$v.cafe_branchid.$model"
                  :class="{ 'is-danger': $v.cafe_branchid.$error }"
                  class="input"
                  type="text"
                  placeholder="Enter 2 digits"
                />
              </div>
              <template v-if="$v.cafe_branchid.$error">
                <p class="help is-danger" v-if="!$v.cafe_branchid.required">
                  This field is required
                </p>
                <p class="help is-danger" v-if="!$v.cafe_branchid.ageNbranchid">
                  Invalid Cafe Branch ID
                </p>
                <p class="help is-danger" v-if="!$v.cafe_branchid.maxLength">
                  Must be less than 3 characters
                </p>
              </template>
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
import {
  required,
  email,
  minLength,
  maxLength,
  sameAs,
} from "vuelidate/lib/validators";
function mobile(value) {
  return !!value.match(/0[0-9]{9}/);
}
function ageNbranchid(value) {
  return !!value.match(/[0-9]{2}/);
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
      address: "",
      age: "",
      checkRole: "customer",
      cafe_branchid: null,
    };
  },
  validations: {
    username: {
      required,
      minLength: minLength(5),
      maxLength: maxLength(20),
    },
    first_name: {
      required,
      maxLength: maxLength(150),
    },
    last_name: {
      required,
      maxLength: maxLength(150),
    },
    email: {
      required,
      email,
    },
    age: {
      required,
      ageNbranchid: ageNbranchid,
      maxLength: maxLength(2),
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
    address: {
      required: required,
    },
    cafe_branchid: {
      ageNbranchid: ageNbranchid,
      maxLength: maxLength(2),
    },
  },

  methods: {
    submit() {
      this.$v.$touch();

      if (!this.$v.$invalid) {
        let data = {
          username: this.username,
          password: this.password,
          confirm_password: this.confirm_password,
          email: this.email,
          mobile: this.mobile,
          first_name: this.first_name,
          last_name: this.last_name,
          age: this.age,
          address: this.address,
          user_type: this.checkRole,
          cafe_branchid: this.cafe_branchid,
        };

        axios
          .post("http://localhost:3000/user/signup", data)
          .then(() => {
            alert("Sign up Success");
            this.username = "";
            this.password = "";
            this.confirm_password = "";
            this.email = "";
            this.mobile = "";
            this.first_name = "";
            this.last_name = "";
            this.address = "";
            this.age = "";
            this.checkRole = "customer";
            this.cafe_branchid = null;
          })
          .catch((err) => {
            alert(err.response.data.message);
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
