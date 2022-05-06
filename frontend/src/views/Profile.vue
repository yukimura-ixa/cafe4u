<template>
  <div class="container is-fluid mt-5">
    <div class="columns is-centered">
      <div class="card is-10 column columns my-5" style="padding: 0">
        <div class="card-content column is-4 px-6 pt-6">
          <router-link :to="'/'" class="mr-1 has-text-info">
            <font-awesome-icon icon="fa-solid fa-angle-left" />
          </router-link>
          <h1 class="title is-3 has-text-centered">Profile</h1>
          <hr style="background-color: rgb(3, 51, 35)" />
          <table style="width: 100%">
            <tr style="height: 50px">
              <th>Username: {{ userDetail[0].user_login }}</th>
            </tr>
            <tr style="height: 50px">
              <th>
                Full Name: {{ userDetail[0].fname }} {{ userDetail[0].lname }}
              </th>
            </tr>
            <tr style="height: 50px">
              <th>Address: {{ userDetail[0].address }}</th>
            </tr>
            <tr style="height: 50px">
              <th>Phone: {{ userDetail[0].phone }}</th>
            </tr>
            <tr style="height: 50px">
              <th>Email: {{ userDetail[0].email }}</th>
            </tr>
          </table>
          <div class="card-content column">
            <button class="button is-info" @click="getDetail()">
              Get Information of Profile
            </button>
          </div>
          <div class="card-content column">
            <button class="button is-warning" @click="clearDetail()">
              Clear Information
            </button>
          </div>
        </div>
        <div class="card-content column is-8 px-6 pt-6">
          <h1 class="title is-3 has-text-centered">Edit Profile</h1>
          <hr style="background-color: rgb(3, 51, 35)" />
          <div class="field"></div>

          <label class="label">Username:</label>
          <div class="control">
            <input
              class="input"
              type="username"
              v-model="$v.username.$model"
              :class="{ 'is-danger': $v.username.$error }"
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

          <label class="label">First Name:</label>
          <div class="control">
            <input
              class="input"
              name="fname"
              v-model="$v.first_name.$model"
              :class="{ 'is-danger': $v.first_name.$error }"
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

          <label class="label">Last Name:</label>
          <div class="control">
            <input
              class="input"
              name="lname"
              v-model="$v.last_name.$model"
              :class="{ 'is-danger': $v.last_name.$error }"
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

          <label class="label">Address:</label>
          <div class="control">
            <input
              class="input"
              type="address"
              v-model="$v.address.$model"
              :class="{ 'is-danger': $v.address.$error }"
            />
          </div>
          <template v-if="$v.address.$error">
            <p class="help is-danger" v-if="!$v.address.required">
              This field is required
            </p>
          </template>

          <label class="label">Phone:</label>
          <div class="control">
            <input
              class="input"
              type="phone"
              v-model="$v.mobile.$model"
              :class="{ 'is-danger': $v.mobile.$error }"
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

          <label class="label">Email:</label>
          <div class="control">
            <input
              class="input"
              type="email"
              v-model="$v.email.$model"
              :class="{ 'is-danger': $v.email.$error }"
            />
          </div>
          <template v-if="$v.email.$error">
            <p class="help is-danger" v-if="!$v.email.required">
              This field is required
            </p>
            <p class="help is-danger" v-if="!$v.email.email">Invalid Email</p>
          </template>

          <div>
            <label class="label">Password:</label>
            <div class="control">
              <input
                class="input"
                type="password"
                v-model="$v.password.$model"
                :class="{ 'is-danger': $v.password.$error }"
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

          <div>
            <label class="label">Confirm Password</label>
            <div class="control">
              <input
                class="input"
                type="password"
                v-model="$v.confirm_password.$model"
                :class="{ 'is-danger': $v.confirm_password.$error }"
              />
            </div>
            <template v-if="$v.confirm_password.$error">
              <p class="help is-danger" v-if="!$v.confirm_password.sameAs">
                Password not match
              </p>
            </template>
          </div>

          <div class="card-content column is-12 px-6 pt-6">
            <button
              class="button is-success is-medium is-fullwidth"
              @click="submit(userDetail[0].user_id)"
            >
              Submit
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "@/plugins/axios";
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
function complexPassword(value) {
  if (!(value.match(/[a-z]/) && value.match(/[A-Z]/) && value.match(/[0-9]/))) {
    return false;
  }
  return true;
}
export default {
  name: "ProfilePage",
  data() {
    return {
      userDetail: [
        {
          address: "",
          age: 0,
          cafe_branchid: null,
          email: "",
          fname: "",
          lname: "",
          password: "",
          phone: "",
          user_id: 0,
          user_login: "",
          user_point: 0,
          user_type: "",
        },
      ],
      username: "",
      password: "",
      confirm_password: "",
      email: "",
      mobile: "",
      first_name: "",
      last_name: "",
      address: "",
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
  },
  mounted() {
    this.getProfileDetail(this.$route.params.id);
  },
  methods: {
    getDetail() {
      this.username = this.userDetail[0].user_login;
      this.email = this.userDetail[0].email;
      this.mobile = this.userDetail[0].phone;
      this.first_name = this.userDetail[0].fname;
      this.last_name = this.userDetail[0].lname;
      this.address = this.userDetail[0].address;
    },
    clearDetail() {
      this.username = "";
      this.email = "";
      this.mobile = "";
      this.first_name = "";
      this.last_name = "";
      this.address = "";
      this.password = "";
      this.confirm_password = "";
    },
    getProfileDetail(userId) {
      axios
        .get(`http://localhost:3000/profile/${userId}`)
        .then((response) => {
          this.userDetail = response.data;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    submit(userId) {
      this.$v.$touch();

      if (!this.$v.$invalid) {
        let data = {
          username: this.username,
          password: this.password,
          email: this.email,
          mobile: this.mobile,
          first_name: this.first_name,
          last_name: this.last_name,
          address: this.address,
        };

        axios
          .put(`http://localhost:3000/profile/update/${userId}`, data)
          .then(() => {
            alert("Update Profile Success");
            this.getProfileDetail(this.$route.params.id);
            this.clearDetail()
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
  height: 140vh;
}
</style>
