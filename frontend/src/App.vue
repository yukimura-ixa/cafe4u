<template>
  <div id="app">
    <nav class="navbar" role="navigation" aria-label="main navigation">
      <div class="navbar-brand">
        <a class="navbar-item" href="">
          <img src="..\src\assets\logo.png" width="112" />
        </a>

        <a
          role="button"
          class="navbar-burger"
          aria-label="menu"
          aria-expanded="false"
          data-target="navbarBasicExample"
        >
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
        </a>
      </div>

      <div id="navbarBasicExample" class="navbar-menu">
        <div class="navbar-start ">
          <div class="field navbar-item ">
            <p class="control has-icons-right">
              <input class="input" type="text" placeholder="ค้นหาร้าน" v-model="searchText"/>
              <span class="icon is-small is-right">
                <font-awesome-icon icon="fa-solid fa-magnifying-glass" />
              </span>
            </p>
          </div>
        </div>

        <div class="navbar-end">
          <div class="navbar-item">
            <a class="button is-light">
              <font-awesome-layers class="fa-2x">
                <font-awesome-icon icon="fa-solid fa-cart-shopping" />
                <font-awesome-layers-text
                  counter
                  value="10"
                  position="top-right"
                />
              </font-awesome-layers>
            </a>
            <a class="button is-light"> ออกจากระบบ </a>
            <div class="buttons">
              <a class="button is-primary" href="#/signup">
                <strong>สมัครสมาชิก</strong>
              </a>
              <a class="button is-light" href="#/login"> เข้าสู่ระบบ </a>
            </div>
          </div>
        </div>
      </div>
    </nav>

    <router-view :key="$route.fullPath" :user="localUser" :cart="localCart"/>
  </div>
</template>

<script>
// import axios from "axios";

export default {
  name: "App",
  props: ["user", "cart"],
  data() {
    return {
      searchText: '',
      localUser: null,
      localCart: null,
    };
  },
  mounted() {
    // this.onAuthChange();
  },
  methods: {
    // onAuthChange() {
    //   const token = localStorage.getItem("token");
    //   if (token) {
    //     this.getUser();
    //   }
    // },
    // getUser() {
    //   axios.get("/user/me", {}).then((res) => {
    //     this.user = res.data;
    //   });
    // },
    logout() {
      localStorage.removeItem("token");
      this.$router.go();
    },
  },
};
</script>

<style>
</style>
