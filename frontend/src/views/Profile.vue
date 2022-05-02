<template>
  <div class="container is-fluid mt-5">
    <div class="columns is-centered">
      <div class="card is-10 column columns my-5" style="padding: 0">
        <div class="card-content column is-4 px-6 pt-6">
          <h1 class="title is-3 has-text-centered">Profile</h1>
          <hr style="background-color: rgb(3, 51, 35)" />
          <table style="width: 60%">
            <tr style="height: 50px">
              <th>Username:</th>
            </tr>
            <tr style="height: 50px">
              <th>Full Name:</th>
            </tr>
            <tr style="height: 50px">
              <th>Address:</th>
            </tr>
            <tr style="height: 50px">
              <th>Phone:</th>
            </tr>
            <tr style="height: 50px">
              <th>Email:</th>
            </tr>
          </table>
          <div class="card-content column is-12 px-6 pt-6">
            <button class="button is-warning is-medium is-fullwidth" @click="showEditPassword()">
              Change Password
            </button>
          </div>
        </div>
        <div class="card-content column is-8 px-6 pt-6">
          <h1 class="title is-3 has-text-centered">Edit Profile</h1>
          <hr style="background-color: rgb(3, 51, 35)" />
          <div class="field"></div>

          <label class="label">Username:</label>
          <div class="control">
            <input class="input" type="username" />
          </div>

          <label class="label">First Name:</label>
          <div class="control">
            <input class="input" name="fname" />
          </div>

          <label class="label">Last Name:</label>
          <div class="control">
            <input class="input" name="lname" />
          </div>

          <label class="label">Address:</label>
          <div class="control">
            <input class="input" type="address" />
          </div>

          <label class="label">Phone:</label>
          <div class="control">
            <input class="input" type="phone" />
          </div>

          <label class="label">Email:</label>
          <div class="control">
            <input class="input" type="email" />
          </div>

          <div v-if="this.passwordToggle == true">
            <label class="label">Password:</label>
            <div class="control">
              <input class="input" type="password" />
            </div>
          </div>

          <div v-if="this.passwordToggle == true">
            <label class="label">Confirm Password</label>
            <div class="control">
              <input class="input" type="password" />
            </div>
          </div>

          <div class="card-content column is-12 px-6 pt-6">
            <button class="button is-success is-medium is-fullwidth">
              Submit
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ProfilePage",
  data() {
    return {
      password: "",
      username: "",
      passwordToggle: false,
    };
  },
  methods: {
    showEditPassword() {
      if (this.passwordToggle == true) {
        this.passwordToggle = false;
      } else {
        this.passwordToggle = true;
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
