<template>
  <div class="mt-3">
    <section class="container">
      <div class="card mb-3">
        <div class="card-content">
          <div class="content">
            <p class="title is-4">
              <a
                class="mr-1 has-text-info"
                @click="$router.push(`/cafe/${cafe.cafe_branchid}`)"
              >
                <font-awesome-icon icon="fa-solid fa-angle-left" />
              </a>
              {{ cafe.cafe_name }}
              <span class="is-pulled-right" v-if="isEmployee">
                <button
                  class="button is-primary"
                  @click="addProductModalToggle = true"
                >
                  <span class="icon is-small">
                    <font-awesome-icon icon="fa-solid fa-plus" /> </span
                  ><span>เพิ่มสินค้า</span>
                </button>
              </span>
            </p>
            <div class="tags">
              <span class="tag is-capitalized">{{ cafe.cafe_theme }}</span>
            </div>
            <div class="block">
              {{ cafe.cafe_desc }}
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- product cards -->
    <section class="container box">
      <div class="tabs is-boxed">
        <ul>
          <li
            :class="{ 'is-active': showType === 'drink' }"
            @click="showType = 'drink'"
          >
            <a>
              <span class="icon is-small"
                ><font-awesome-icon icon="fa-solid fa-blender"
              /></span>
              <span>เครื่องดื่ม</span>
            </a>
          </li>
          <li
            :class="{ 'is-active': showType === 'bakery' }"
            @click="showType = 'bakery'"
          >
            <a>
              <span class="icon is-small"
                ><font-awesome-icon icon="fa-solid fa-bread-slice"
              /></span>
              <span>เบเกอรี่</span>
            </a>
          </li>

          <li
            v-if="isEmployee"
            :class="{ 'is-active': showType === 'option' }"
            @click="showType = 'option'"
          >
            <a>
              <span class="icon is-small"
                ><font-awesome-icon icon="fa-solid fa-cubes-stacked"
              /></span>
              <span>ท็อปปิ้ง</span>
            </a>
          </li>

          <li
            :class="{ 'is-active': showType === null }"
            @click="showType = null"
          >
            <a>
              <span class="icon is-small"
                ><font-awesome-icon icon="fa-solid fa-ellipsis"
              /></span>
              <span>อื่น ๆ</span>
            </a>
          </li>
        </ul>
      </div>

      <div class="columns is-multiline m-2">
        <template v-for="(product, index) in filteredProducts">
          <div class="column is-one-third" :key="product.product_id">
            <div class="card">
              <div class="card-image">
                <figure class="image is-4by3">
                  <img
                    :src="product.image_path"
                    alt="Placeholder image"
                    onerror="this.onerror=null; this.src='https://bulma.io/images/placeholders/640x480.png'"
                  />
                </figure>
              </div>
              <div class="card-content" style="min-height: 30vh">
                <template v-if="editToggle === index">
                  <div class="field">
                    <label class="label">ชื่อสินค้า</label>
                    <div class="control">
                      <input
                        class="input"
                        type="text"
                        placeholder="Product Name"
                        v-model="editProductName"
                      />
                    </div>
                  </div>

                  <div class="field">
                    <label class="label">รายละเอียดสินค้า</label>
                    <div class="control">
                      <textarea
                        class="textarea"
                        placeholder="รายละเอียด"
                        v-model="editProductDesc"
                      ></textarea>
                    </div>
                  </div>

                  <div class="field">
                    <label class="label">ราคา</label>
                    <div class="control">
                      <input
                        class="input"
                        type="text"
                        placeholder="Product Price"
                        v-model="editProductPrice"
                      />
                    </div>
                  </div>

                  <div class="file">
                    <label class="file-label">
                      <input class="file-input" type="file" name="resume" />
                      <span class="file-cta">
                        <span class="file-icon">
                          <font-awesome-icon icon="fa-solid fa-upload" />
                        </span>
                        <span class="file-label"> เปลี่ยนรูป </span>
                      </span>
                    </label>
                  </div>
                </template>

                <template v-else>
                  <div class="media">
                    <div class="media-content">
                      <div class="columns is-vcentered">
                        <div class="column is-8">
                          <p class="title is-5">
                            <span>{{ product.product_name }}</span>
                          </p>
                        </div>
                        <div class="column">
                          <span
                            class="is-pulled-right tag is-primary is-medium"
                          >
                            {{ product.product_price }}฿</span
                          >
                        </div>
                      </div>
                    </div>
                  </div>

                  <div class="content is-small">
                    {{ product.product_desc }}

                    <br />
                  </div>
                </template>
              </div>

              <footer class="card-footer">
                <a
                  @click="addToCart(product)"
                  class="card-footer-item has-background-success has-text-white"
                  v-if="!isEmployee"
                >
                  <span class="icon is-small mr-1"
                    ><font-awesome-icon icon="fa-solid fa-cart-plus" /></span
                  ><span>เพิ่มเข้าตะกร้า</span></a
                >

                <template v-if="isEmployee && editToggle === index">
                  <a
                    @click="confirmEditProduct()"
                    class="
                      card-footer-item
                      has-background-success has-text-white
                    "
                  >
                    <span class="icon is-small mr-1"
                      ><font-awesome-icon
                        icon="fa-solid fa-floppy-disk" /></span
                    ><span>ยืนยัน</span></a
                  >
                  <a @click="cancelEdit()" class="card-footer-item">
                    <span class="icon is-small mr-1"
                      ><font-awesome-icon icon="fa-solid fa-xmark" /></span
                    ><span>ยกเลิก</span></a
                  >
                </template>

                <template v-else-if="isEmployee">
                  <a
                    @click="editProduct(index, product)"
                    class="
                      card-footer-item
                      has-background-warning has-text-black
                    "
                  >
                    <span class="icon is-small mr-1"
                      ><font-awesome-icon
                        icon="fa-regular fa-pen-to-square" /></span
                    ><span>แก้ไข</span></a
                  >
                  <a
                    @click="deleteProduct(product)"
                    class="
                      card-footer-item
                      has-background-danger has-text-white
                    "
                  >
                    <span class="icon is-small mr-1"
                      ><font-awesome-icon icon="fa-solid fa-trash" /></span
                    ><span>ลบสินค้า</span></a
                  >
                </template>
              </footer>
            </div>
          </div>
        </template>
      </div>
    </section>
    <div class="modal" :class="{ 'is-active': addProductModalToggle }">
      <div class="modal-background"></div>
      <div class="modal-card">
        <header class="modal-card-head">
          <p class="modal-card-title">เพิ่มสินค้า</p>
          <button
            class="delete"
            aria-label="close"
            @click="addProductModalToggle = false"
          ></button>
        </header>
        <section class="modal-card-body">
          <div class="card-image">
            <figure class="image is-4by3">
              <img
                v-if="newProductImage === ''"
                src="https://bulma.io/images/placeholders/640x480.png"
                alt="Placeholder image"
              />
              <img v-else :src="newProductImage" alt="Placeholder image" />
            </figure>
          </div>
          <div class="field">
            <label class="label">ชื่อสินค้า</label>
            <div class="control">
              <input
                class="input"
                v-model="newProductName"
                type="text"
                placeholder="Product Name"
              />
            </div>
          </div>

          <div class="field">
            <label class="label">รายละเอียด</label>
            <div class="control">
              <textarea
                v-model="newProductDesc"
                class="textarea"
                placeholder="Product Detail"
              ></textarea>
            </div>
          </div>

          <div class="columns is-vcentered">
            <div class="column">
              <div class="field">
                <label class="label">ราคา</label>
                <div class="control">
                  <input
                    class="input"
                    type="text"
                    placeholder="Product Price"
                    v-model.number="newProductPrice"
                  />
                </div>
              </div>
            </div>

            <div class="column">
              <div class="field">
                <label class="label">ประเภท</label>
                <div class="control">
                  <div class="select">
                    <select v-model="newProductType">
                      <option value="drink">เครื่องดื่ม</option>
                      <option value="bakery">เบเกอรี่</option>
                      <option value="option">ท็อปปิ้ง</option>
                      <option value="">อื่น ๆ</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>

            <div class="column">
              <label class="label">รูปสินค้า</label>
              <div class="file">
                <label class="file-label">
                  <input class="file-input" type="file" @change="onFileChange"/>
                  <span class="file-cta">
                    <span class="file-icon">
                      <font-awesome-icon icon="fa-solid fa-upload" />
                    </span>
                    <span class="file-label"> เปลี่ยนรูป </span>
                  </span>
                </label>
              </div>
            </div>
          </div>
        </section>
        <footer class="modal-card-foot">
          <button class="button is-success" @click="addProduct()">เพิ่ม</button>
          <button class="button is-danger" @click="clearProductData()">ล้างข้อมูล</button>
        </footer>
      </div>
    </div>

    <div class="modal" :class="{ 'is-active': addDrinkClicked }">
      <div class="modal-background" @click="cancelAddDrink()"></div>
      <div class="modal-content">
        <div class="list box">
          <p class="modal-card-title">เลือกท็อปปิ้ง</p>

          <template
            v-for="option in products.filter(
              (ele) => ele.product_type === 'option'
            )"
          >
            <div class="list-item" :key="option.product_id">
              <div class="list-item-image">
                <figure class="image is-64x64">
                  <img
                    class="is-rounded"
                    :src="option.image_path"
                    onerror="this.onerror=null; this.src='https://via.placeholder.com/128x128.png?text=Image'"
                  />
                </figure>
              </div>

              <div class="list-item-content">
                <div class="list-item-title">
                  <span>{{ option.product_name }}</span>
                </div>
                <div class="list-item-description">
                  {{ option.product_desc }}
                </div>
                <p>{{ option.product_price }}฿</p>
              </div>

              <label class="checkbox">
                <input
                  type="checkbox"
                  :value="option.product_id"
                  v-model="selectedOptions"
                />
              </label>
            </div>
          </template>
          <div class="buttons is-right mt-3">
            <button class="button is-success" @click="confirmAddDrink()">
              เพิ่มเข้าตะกร้า
            </button>
            <button class="button" @click="cancelAddDrink()">ยกเลิก</button>
          </div>
        </div>
      </div>
      <button
        class="modal-close is-large"
        aria-label="close"
        @click="cancelAddDrink()"
      ></button>
    </div>
  </div>
</template>

<script>
// import axios from "@/plugins/axios";
import axios from "axios";

export default {
  name: "CafeProduct",
  props: ["user", "cart"],
  data() {
    return {
      newProductName: "",
      newProductPrice: "",
      newProductDesc: "",
      newProductType: "",
      newProductImage: "",
      addProductModalToggle: false,

      editProductName: "",
      editProductPrice: "",
      editProductDesc: "",
      editProductImage: "",
      editToggle: -1,

      showType: "drink",
      isEmployee: true,

      addDrinkClicked: false,
      selectedProduct: null,
      selectedOptions: [],

      products: [],
      cafe: {},

      error: null,
    };
  },
  mounted() {
    this.getProducts(this.$route.params.id);
  },
  computed: {
    filteredProducts() {
      return this.products.filter((ele) => {
        return ele.product_type == this.showType;
      });
    },
  },
  methods: {
    getProducts(cafe_id) {
      axios
        .get(`http://localhost:3000/cafe/${cafe_id}/product/`)
        .then((res) => {
          this.products = res.data.products;
          this.cafe = res.data.cafe;
        })
        .catch((err) => {
          this.error = err.response.data.message;
        });
    },

    addToCart(product) {
      if (product.product_type === "drink") {
        this.addDrinkClicked = true;
        this.selectedProduct = product;
      }
    },
    confirmAddDrink() {
      const cartItem = {
        drink: this.selectedProduct,
        options: this.selectedOptions,
      };
      var sessionCart = JSON.parse(sessionStorage.getItem("cart"));
      var addCart = [];
      if (sessionCart !== null) {
        addCart = sessionCart;
        addCart.push(cartItem);
      } else {
        addCart.push(cartItem);
      }
      // console.log(addCart);
      sessionStorage.setItem("cart", JSON.stringify(addCart));
      this.$notify({ group: "app", text: "เพิ่มเข้าตะกร้าสินค้าแล้ว" });
      this.cancelAddDrink();
    },
    cancelAddDrink() {
      this.addDrinkClicked = false;
      this.selectedProduct = null;
      this.selectedOptions = [];
    },
    deleteProduct(product) {
      if (confirm(`ต้องการจะลบสินค้า ${product.product_name} หรือไม่?`)) {
        axios
          .delete(`http://localhost:3000/product/${product.product_id}`)
          .then((res) => {
            var index = this.products.indexOf(product);
            this.products.splice(index, 1);
            this.$notify({
              group: "app",
              text: `ลบสินค้า ${product.product_name} แล้ว`,
            });
            console.log(res);
          })
          .catch((err) => {
            this.error = err.response.data.message;
            this.$notify({ group: "danger", text: this.error });
          });
      }
    },
    editProduct(index, product) {
      this.editToggle = index;
      this.editProductName = product.product_name;
      this.editProductDesc = product.product_desc;
      this.editProductPrice = product.product_price;
    },
    cancelEdit() {
      this.editToggle = -1;
      this.editProductName = "";
      this.editProductDesc = "";
      this.editProductPrice = "";
    },
    onFileChange(e) {
      const file = e.target.files[0];
      this.newProductImage = URL.createObjectURL(file);
      console.log(this.newProductImage);
    },
    addProduct() {
      let formData = new FormData();
      formData.append("name", this.newProductName);
      formData.append("desc", this.newProductDesc);
      formData.append("price", this.newProductPrice);
      formData.append("type", this.newProductType);
      formData.append("productImage", this.newProductImage);
      axios
        .post(`http://localhost:3000/product/${this.cafe.cafe_branchid}`, formData)
        // eslint-disable-next-line
        .then((res) => {
          this.$route.go();
          this.$notify({ group: "app", text: "เพิ่มสินค้าแล้ว" });
        })
        .catch((err) => {
          this.error = err.response.data.message;
          this.$notify({ group: "danger", text: this.error });
        });
    },
    clearProductData(){
      this.newProductName = ""
      this.newProductPrice = ""
      this.newProductDesc = ""
      this.newProductType = ""
      this.newProductImage = null
    },
  },
};
</script>

<style>
</style>