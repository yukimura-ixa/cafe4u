<template>
  <div class="container is-fluid mt-5">
    <div class="columns is-centered">
      <div class="card is-5 column columns my-5" style="padding: 0">
        <div class="card-content column is-12 px-6 pt-6">
          <h1 class="title is-3 has-text-centered">Edit Profile</h1>
          <hr style="background-color: rgb(3, 51, 35)" />
          <div class="field">
            <label class="label">Old Username :</label>
            <label class="label">New Username :</label>
            <div class="control has-icons-left">
              <input v-model="username" class="input" type="text" />
              <span class="icon is-small is-left">
                <i class="fas fa-user"></i>
              </span>
            </div>
          </div>

          <div class="field">
            <label class="label">Old Password :</label>
            <label class="label">New Password :</label>
            <div class="control has-icons-left has-icons-right">
              <input
                v-model="password"
                class="input"
                type="password"
                value="FakePSW"
              />
              <span class="icon is-small is-left">
                <i class="fas fa-lock"></i>
              </span>
              <span class="icon is-small is-right">
                <i class="fas fa-check"></i>
              </span>
            </div>
          </div>

          <div class="field">
            <label class="label">Old Birth Day :</label>
            <label class="label">New Birth Day :</label>
            <input type="date" />
          </div>

          <button class="button is-success is-fullwidth">Submit</button>
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
    };
  },
};
</script>

<style>
body {
  background-color: rgb(78, 153, 110);
  height: 100vh;
}
</style>
