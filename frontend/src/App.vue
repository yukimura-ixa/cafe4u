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
            <a class="button is-light" @click="openCart = true" v-if="user">
              <font-awesome-layers class="fa-2x">
                <font-awesome-icon icon="fa-solid fa-cart-shopping" />
                <font-awesome-layers-text
                  counter
                  value="10"
                  position="top-right"
                />
              </font-awesome-layers>
            </a>
            <a class="button is-light m-auto" @click="goProfile(user.user_id)" v-if="user"> Profile </a>
            <a class="button is-light" @click="logout" v-if="user"> ออกจากระบบ </a>
            <div class="buttons mb-0" v-if="!user">
              <a class="button is-primary m-auto" href="#/user/signup">
                <strong>สมัครสมาชิก</strong>
              </a>
              <a class="button is-light m-auto" href="#/login"> เข้าสู่ระบบ </a>
            </div>
            <div v-if="user" class="ml-5">
              <p class="title is-5 has-text-right">{{user.user_login}}</p>
              <p class="subtitle has-text-right is-6" v-if="user.user_type == 'customer'">Point: {{user.user_point}}</p>
              <p class="subtitle has-text-right is-6 is-capitalized	" v-else>{{user.user_type}}</p>
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


<!-- Cart -->
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
              <tr v-for="(product,index) in cartProduct" :key="product.product_id">
                <td style="vertical-align: middle">{{index+1}}</td>
                <td style="vertical-align: middle">
                  <div class="list-item">
                    <div class="list-item-image">
                      <figure class="image is-64x64">
                        <img
                          :src="showImage(product.product_id)"
                        />
                      </figure>
                    </div>

                    <div class="list-item-content">
                      <div class="list-item-title">{{product.product_name}}</div>
                      <div class="list-item-description" v-if="optionOf(product.product_id) != ''">
                        Option: {{optionOf(product.product_id)}}
                      </div>
                    </div>
                  </div>
                </td>
                <td style="vertical-align: middle">{{product.product_price}} <span v-if="optionPrice(product.product_id) != 0">+ ({{optionPrice(product.product_id)}})</span></td>
                <td style="vertical-align: middle">{{quantityOf(product.product_id)}}</td>
                <td style="vertical-align: middle">
                  <a @click="changeQuantity('up', product.product_id)">
                    <font-awesome-icon
                      icon="fa-solid fa-square-plus "
                      class="mr-2 has-text-success fa-bounce"
                      style="--fa-animation-iteration-count: 2"
                    />
                  </a>
                  <a @click="changeQuantity('down', product.product_id)"> 
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
              <tr v-if="selectedPromotion.pro_type == 'free'">
                <td style="vertical-align: middle">{{cartProduct.length+1}}</td>
                <td style="vertical-align: middle">
                  <div class="list-item">
                    <div class="list-item-image">
                      <figure class="image is-64x64">
                        <img
                          src=""
                        />
                      </figure>
                    </div>

                    <div class="list-item-content">
                      <div class="list-item-title">(PROMOTION){{selectedPromotion.product_name}}</div>
                      <div class="list-item-description">
                      </div>
                    </div>
                  </div>
                </td>
                <td style="vertical-align: middle">FREE</td>
                <td style="vertical-align: middle">1</td>
                <td style="vertical-align: middle">
                </td>
              </tr>
              <tr v-if="selectedPromotion.pro_type != 'free' && selectedPromotion.pro_type != null">
                <td style="vertical-align: middle">{{cartProduct.length+1}}</td>
                <td style="vertical-align: middle">
                  <div class="list-item">
                    <div class="list-item-image">
                      <figure class="image is-64x64">
                        <img
                          src=""
                        />
                      </figure>
                    </div>

                    <div class="list-item-content">
                      <div class="list-item-title">(PROMOTION){{selectedPromotion.pro_detail}}</div>
                      <div class="list-item-description">
                      </div>
                    </div>
                  </div>
                </td>
                <td style="vertical-align: middle">-{{selectedPromotion.discount}}</td>
                <td style="vertical-align: middle"></td>
                <td style="vertical-align: middle">
                </td>
              </tr>
              <tr>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <!-- <td>{{totalPrice}}</td> -->
                <td><button class="button is-danger" @click="clearCart()">Clear Cart</button></td>
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
                    <option value="none">ไม่มี</option>
                    <option :value="promotion.pro_id" v-for="promotion in cartPossiblePromotion" :key="promotion.pro_id">{{promotion.pro_detail}}</option>
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
                    <p>{{subtotal}}</p>
                  </div>
                </div>
                <hr style="background-color: rgb(230, 230, 230)" />
                <div class="columns">
                  <div class="column is-6">
                    <p class="subtitle is-6">Discount</p>
                  </div>
                  <div class="column is-6 has-text-right">
                    <p v-if="selectedPromotion.discount > 0">-{{selectedPromotion.discount}}</p>
                    <p v-else>0</p>
                  </div>
                </div>
                <hr style="background-color: rgb(230, 230, 230)" />
                <div class="columns">
                  <div class="column is-6">
                    <p class="subtitle is-6">Total</p>
                  </div>
                  <div class="column is-6 has-text-right">
                    <p>{{totalprice}}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <footer class="modal-card-foot">
          <button class="button is-warning ml-auto" @click="spawn()">Spawn Item</button>
          <button class="button is-success ml-auto">Checkout</button>
        </footer>
      </div>
    </div>

    <router-view
      @auth-change="onAuthChange"
      @myCart="print"
      :key="$route.fullPath"
      :user="user"
      :cart="cart"
      :searchCafe="[searchText, searchResult, searchImageResult, cafeType]"
    />
  </div>
</template>

<script>
import axios from '@/plugins/axios'

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
      cartProduct:[],
      cartImage:[],
      cartOption:[],
      Promotion:[],
      cafeId:null


    };
  },
  mounted() {
    this.onAuthChange();
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
    onAuthChange() {
      const token = localStorage.getItem("token");
      if (token) {
        this.getUser();
      }
    },
    getUser() {
      axios.get("http://localhost:3000/user/me").then((res) => {
        this.user = res.data;
      });
    },
    logout() {
      localStorage.removeItem("token");
      this.user = null
      this.$router.push('/login')
    },
    goProfile(userId) {
      this.$router.push(`/profile/${userId}`)
    },
    onCartChange(){
      this.cart = JSON.parse(localStorage.getItem('cart'))
      if(this.cart.length > 0){
        axios
        .put(`http://localhost:3000/cart`,{toFind:this.cart})
        .then((response) => {
          this.cartProduct = response.data.product;
          this.cartImage = response.data.image;
          this.cartOption = response.data.option;
          this.Promotion = response.data.promotion
          this.cafeId = response.data.cafeid
        })
        .catch((error) => {
          this.error = error.response.data.message;
        });
      }
      else{
        this.cart = null
      }
    },
    showImage(product_id){
      let image = this.cartImage.filter((each) => {
        return each.product_id == product_id;
      });
      if (image[0] == null) {
        return "https://via.placeholder.com/128x128.png?text=Image";
      }
      return image[0].image_path;
    },
    optionOf(product_id){
      let product = this.cart.filter((each) => {
        return each.product_id == product_id;
      });
      let option = this.cartOption.filter((each) => {
        return each.product_id == product[0].option;
      });
      if(option.length > 0){
        return option[0].product_name
      }
      return ''
    },
    optionPrice(product_id){
      let product = this.cart.filter((each) => {
        return each.product_id == product_id;
      });
      let option = this.cartOption.filter((each) => {
        return each.product_id == product[0].option;
      });
      if(option.length > 0){
        return option[0].product_price
      }
      return 0
    },
    quantityOf(product_id){
      let cart = this.cart.filter((each) => {
        return each.product_id == product_id;
      });
      if(cart[0]){
        return cart[0].quantity
      }
      return 0
    },
    changeQuantity(choice, product_id){
      let cart = this.cart.filter((each) => {
        return each.product_id == product_id;
      });
      if(choice == 'up'){
          cart[0].quantity += 1
      }else if(cart[0].quantity -1 > 0){
        cart[0].quantity -= 1
      }else if(cart[0].quantity -1 == 0){
        let products = this.cartProduct.filter((each) => {
          return each.product_id != product_id;
        });
        let options = this.cartOption.filter((each) => {
          return each.product_id != cart[0].option;
        });
        let cart2 = this.cart.filter((each) => {
        return each.product_id != product_id;
        });
        this.cartPromotion = 'none'
        this.cart = cart2
        this.cartOption = options
        this.cartProduct = products
      }

    },
    clearCart(){
      this.cartPromotion = 'none'
      this.cafeId = null
      this.cart = []
      this.cartProduct = []
      this.cartImage = []
      this.cartOption = []
      this.Promotion = []
    },

    // Just For Test
    spawn(){
      localStorage.setItem('cart',JSON.stringify([{product_id:1,quantity:3,option:null},{product_id:5,quantity:1,option:17},{product_id:8,quantity:1,option:null}]))
      console.log(JSON.parse(localStorage.getItem('cart')))
      this.onCartChange()
    },
    print(){
      console.log('here')
    }
  },
  computed: {
    subtotal() {
      var toreturn = this.cartProduct.reduce((total, product)=>{
        return total + (product.product_price * this.quantityOf(product.product_id))
      },0)
      toreturn = this.cartOption.reduce((total, product)=>{
        return total + product.product_price
      },toreturn)

      return toreturn

    },
    cartPossiblePromotion(){
      return this.Promotion.filter((promotion)=>{
        if(promotion.pro_type == 'price_get_discount'){
          return this.subtotal > promotion.buy_price_need
        }
        else if(promotion.pro_type == 'point'){
          return this.user.user_point > promotion.point_need
        }
        else if(promotion.pro_type == 'product_get_discount' || promotion.pro_type == 'free'){
          let product = this.cartProduct.filter((product)=>{
            return product.product_id == promotion.product_id
          })
          return !!product[0]
        }
      })
    },
    selectedPromotion(){
      if(this.cartPromotion == 'none'){return []}
      return this.cartPossiblePromotion.filter((promotion)=>{
        return promotion.pro_id == this.cartPromotion
      })[0]
    },
    totalprice(){
      var toreturn = this.subtotal
      if (
        this.selectedPromotion.pro_type != "free" &&
        this.selectedPromotion.pro_type != null
      ) {
        toreturn -= this.selectedPromotion.discount;
      }
      return toreturn;
    }
  }
};
</script>

<style>
html {
  background-color: rgb(50, 119, 80) !important ;
}
</style>
