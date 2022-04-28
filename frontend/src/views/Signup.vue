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
              <div class="control has-icons-left">
                <input class="input" type="text" />
                <span class="icon is-small is-left">
                  <i class="fas fa-user"></i>
                </span>
              </div>
            </div>

            <div class="field">
              <label class="label">Password</label>
              <div class="control has-icons-left has-icons-right">
                <input class="input" type="password" />
                <span class="icon is-small is-left">
                  <i class="fas fa-lock"></i>
                </span>
              </div>
            </div>

            <div class="field">
              <label class="label">Confirm Password</label>
              <div class="control has-icons-left has-icons-right">
                <input class="input" type="password" />
                <span class="icon is-small is-left">
                  <i class="fas fa-lock"></i>
                </span>
              </div>
            </div>

            <div class="field">
              <label class="label">Email</label>
              <div class="control has-icons-left has-icons-right">
                <input class="input" type="text" />
                <span class="icon is-small is-left">
                  <i class="fas fa-envelope"></i>
                </span>
              </div>
            </div>

            <div class="field">
              <label class="label">Mobile Number</label>
              <div class="control has-icons-left has-icons-right">
                <input class="input" type="text" />
                <span class="icon is-small is-left">
                  <i class="fas fa-mobile"></i>
                </span>
              </div>
            </div>

            <div class="field">
              <label class="label">First Name</label>
              <div class="control has-icons-left has-icons-right">
                <input class="input" type="text" />
              </div>
            </div>

            <div class="field">
              <label class="label">Last Name</label>
              <div class="control has-icons-left has-icons-right">
                <input class="input" type="text" />
              </div>
            </div>

            <button class="button is-primary is-fullwidth" @click="submit()">
              Sign Up
            </button>

            <p class="my-3">Already have an account? <a href="#/login">Login</a></p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "signupPage",
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
  height: 130vh;
}
</style>
