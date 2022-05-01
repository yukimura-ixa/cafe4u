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
              <a class="button is-primary">
                <strong>สมัครสมาชิก</strong>
              </a>
              <a class="button is-light"> เข้าสู่ระบบ </a>
            </div>
          </div>
        </div>
      </div>
    </nav>

    <router-view :key="$route.fullPath" />
  </div>
</template>

<script>
export default {
  name: "App",
  props: ["user", "cart"],
  data() {
    return {
      user_logged: "",
      cart_item: [],
      searchText: '',
    };
  },
  // mounted() {},
  // computed() {},
  // methods() {},
};
</script>

<style>
</style>
