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
        <div class="navbar-start">
          <div class="navbar-item">
            <div class="field has-addons">
              <!-- @keydown.enter="search(true)" -->
              <div class="control">
                <input
                  class="input"
                  type="text"
                  placeholder="ค้นหาร้าน"
                  v-model="searchText"
                />
              </div>

              <div class="control">
                <a class="button is-info" @click="search(true)">
                  <span class="icon is-small is-right">
                    <font-awesome-icon icon="fa-solid fa-magnifying-glass" />
                  </span>
                </a>
              </div>
            </div>
          </div>
        </div>

        <div class="navbar-end">
          <div class="navbar-item">
            <a class="button is-light" @click="openCart = true">
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
              <a class="button is-primary" href="#/user/signup">
                <strong>สมัครสมาชิก</strong>
              </a>
              <a class="button is-light" href="#/login"> เข้าสู่ระบบ </a>
            </div>
          </div>
        </div>
      </div>
    </nav>
    <notifications />
    <notifications
      group="app"
      position="bottom right"
      classes="notification is-success m-1 p-3"
    />
    <notifications
      group="danger"
      position="bottom right"
      classes="notification is-danger m-1 p-3"
    />

    <div class="modal" :class="{ 'is-active': openCart }">
      <div class="modal-background"></div>
      <div class="modal-card" style="width: 80vw">
        <header class="modal-card-head">
          <p class="modal-card-title">My Cart</p>
          <button
            class="delete"
            aria-label="close"
            @click="openCart = false"
          ></button>
        </header>
        <section class="modal-card-body">
          <!-- Content ... -->
          <table
            class="
              table
              has-background-success-light
              is-striped is-hoverable
              m-auto
            "
            style="width: 70vw"
          >
            <thead class="has-background-success">
              <tr>
                <th>#</th>
                <th>Product</th>
                <th>Price</th>
                <th>Quantity</th>
                <th>Add/Remove</th>
              </tr>
            </thead>
            <tbody>
              <!-- <tr v-for="(item,index) in currentOrderItem" :key="item.item_no">
                          <td>{{index+1}}</td>
                          <td>{{item.product_name}}</td>
                          <td>{{item.product_price}}</td>
                          <td>{{item.order_amount}}</td>
                          <td>{{item.item_totalprice}}</td>
                      </tr>
                      <tr v-if="currentOrder.pro_type == 'free'">
                          <td>{{currentOrderItem.length+1}}</td>
                          <td>(PROMOTION){{currentOrder.product_name}}</td>
                          <td>FREE</td>
                          <td>1</td>
                          <td>FREE</td>
                      </tr>
                      <tr v-if="currentOrder.pro_type != 'free' && currentOrder.pro_type != null">
                          <td>{{currentOrderItem.length+1}}</td>
                          <td>(PROMOTION){{currentOrder.pro_detail}}</td>
                          <td></td>
                          <td></td>
                          <td>-{{currentOrder.discount}}</td>
                      </tr> -->
              <tr>
                <td style="vertical-align: middle">1</td>
                <td style="vertical-align: middle">
                  <div class="list-item">
                    <div class="list-item-image">
                      <figure class="image is-64x64">
                        <img
                          src="https://via.placeholder.com/128x128.png?text=Image"
                        />
                      </figure>
                    </div>

                    <div class="list-item-content">
                      <div class="list-item-title">นมสด</div>
                      <div class="list-item-description">
                        นมสดปั่น หวานมัน หอมกลิ่นนมสด
                      </div>
                    </div>
                  </div>
                </td>
                <td style="vertical-align: middle">40</td>
                <td style="vertical-align: middle">1</td>
                <td style="vertical-align: middle">
                  <a>
                    <font-awesome-icon
                      icon="fa-solid fa-square-plus "
                      class="mr-2 has-text-success fa-bounce"
                      style="--fa-animation-iteration-count: 2"
                    />
                  </a>
                  <a>
                    <font-awesome-icon
                      icon="fa-solid fa-square-minus"
                      class="has-text-danger fa-bounce"
                      style="
                        --fa-animation-iteration-count: 2;
                        --fa-animation-delay: 0.2s;
                      "
                    />
                  </a>
                </td>
              </tr>
              <tr>
                <td style="vertical-align: middle">1</td>
                <td style="vertical-align: middle">
                  <div class="list-item">
                    <div class="list-item-image">
                      <figure class="image is-64x64">
                        <img
                          src="https://via.placeholder.com/128x128.png?text=Image"
                        />
                      </figure>
                    </div>

                    <div class="list-item-content">
                      <div class="list-item-title">นมสด</div>
                      <div class="list-item-description">
                        นมสดปั่น หวานมัน หอมกลิ่นนมสด
                      </div>
                    </div>
                  </div>
                </td>
                <td style="vertical-align: middle">40</td>
                <td style="vertical-align: middle">1</td>
                <td style="vertical-align: middle">
                  <a>
                    <font-awesome-icon
                      icon="fa-solid fa-square-plus "
                      class="mr-2 has-text-success fa-bounce"
                      style="--fa-animation-iteration-count: 2"
                    />
                  </a>
                  <a>
                    <font-awesome-icon
                      icon="fa-solid fa-square-minus"
                      class="has-text-danger fa-bounce"
                      style="
                        --fa-animation-iteration-count: 2;
                        --fa-animation-delay: 0.2s;
                      "
                    />
                  </a>
                </td>
              </tr>
              <tr>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <!-- <td>{{totalPrice}}</td> -->
                <td>33</td>
              </tr>
            </tbody>
          </table>
          <hr style="background-color: rgb(230, 230, 230)" />
          <div class="container">
            <div class="columns">
              <div class="column is-6">
                <h1 class="title is-5">Promotion</h1>
                <div class="select is-primary">
                  <select
                    style="background-color: rgb(219, 255, 217)"
                    v-model="cartPromotion"
                  >
                    <option value="none">None</option>
                    <option value="date_a">Date ASC</option>
                  </select>
                </div>
              </div>
              <div class="column is-6">
                <h1 class="title is-4 is-spaced">Summary</h1>
                <div class="columns">
                  <div class="column is-6">
                    <p class="subtitle is-6">Cart Subtotal</p>
                  </div>
                  <div class="column is-6 has-text-right">
                    <p>80</p>
                  </div>
                </div>
                <hr style="background-color: rgb(230, 230, 230)" />
                <div class="columns">
                  <div class="column is-6">
                    <p class="subtitle is-6">Discount</p>
                  </div>
                  <div class="column is-6 has-text-right">
                    <p>0</p>
                  </div>
                </div>
                <hr style="background-color: rgb(230, 230, 230)" />
                <div class="columns">
                  <div class="column is-6">
                    <p class="subtitle is-6">Total</p>
                  </div>
                  <div class="column is-6 has-text-right">
                    <p>80</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <footer class="modal-card-foot">
          <button class="button is-success ml-auto">Checkout</button>
        </footer>
      </div>
    </div>

    <router-view
      :key="$route.fullPath"
      :user="user"
      :cart="cart"
      :searchCafe="[searchText, searchResult, searchImageResult, cafeType]"
    />
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "App",
  data() {
    return {
      searchText: "",
      user: null,
      cart: null,
      searchResult: null,
      searchImageResult: null,
      cafeType: null,
      openCart: false,
      cartPromotion: "none",
    };
  },
  mounted() {
    // this.onAuthChange();
    this.search(false);
  },
  methods: {
    search(bool) {
      if (this.$route.fullPath != "/search" && bool) {
        this.$router.push({ path: "/search" });
      }
      axios
        .get(`http://localhost:3000/search?like=` + this.searchText)
        .then((response) => {
          this.searchResult = response.data.cafe;
          this.searchImageResult = response.data.image;
          this.cafeType = response.data.type;
        })
        .catch((error) => {
          this.error = error.response.data.message;
        });
    },
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
    // logout() {
    //   localStorage.removeItem("token");
    //   this.$router.go();
    // },
  },
};
</script>

<style>
html {
  background-color: rgb(50, 119, 80) !important ;
}
</style>
