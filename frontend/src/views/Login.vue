<template>
  <div class="container is-fluid mt-5">
    <div class="columns is-centered">
      <div class="card is-8 column columns my-5" style="padding:0;">
        <div class="card-image column  is-4" style="padding:0;background-color:rgb(3, 51, 35) ">
          <figure class="image is-2by3">
            <img
              src="https://i0.wp.com/www.goodlifeupdate.com/app/uploads/2018/01/The-Story-Behind-coffee-02.jpg"
              alt="Placeholder image"
            />
          </figure>
          <p class="is-overlay has-text-grey-lighter has-text-centered" style="top:80%;">Start your day with some coffee</p>
        </div>
        <div class="card-content column is-8 px-6 pt-6">
          <h1 class="title is-3 has-text-centered">Welcome to CAFE4U</h1>
          <p class="subtitle is-6 has-text-centered">blah blah blah</p>
          <hr style="background-color:rgb(3, 51, 35)">
          <div class="field">
          <label class="label">Username</label>
          <div class="control has-icons-left">
            <input v-model="username" class="input" type="text" />
            <span class="icon is-small is-left">
              <i class="fas fa-user"></i>
            </span>
          </div>
        </div>

        <div class="field">
          <label class="label">Password</label>
          <div class="control has-icons-left has-icons-right">
            <input v-model="password" class="input" type="password" />
            <span class="icon is-small is-left">
              <i class="fas fa-lock"></i>
            </span>
            <span class="icon is-small is-right">
              <i class="fas fa-check"></i>
            </span>
          </div>
        </div>

        <button class="button is-success is-fullwidth">
          Login
        </button>

        <p class="my-3">
          Don't have an account? <a href="/signup.html">Sign in</a>
        </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "LoginPage",
  data() {
    return {
      password:'',
      username:''
    };
  },
};
</script>

<style>
body {
  background-color: rgb(50, 119, 80);
  height: 100vh;
}
</style>
