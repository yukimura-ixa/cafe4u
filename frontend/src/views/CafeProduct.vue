<template>
  <div style="background-color: rgb(78, 153, 110)">
    <section class="container">
      <div class="card mb-3">
        <div class="card-content">
          <div class="content">
            <p class="title is-4">
              <a class="mr-1 has-text-info" href="">
                <font-awesome-icon icon="fa-solid fa-angle-left" />
              </a>
              Cafe name
              <span class="is-pulled-right" v-if="isEmployee">
                <button class="button is-primary" @click="addProductModal()">
                  <span class="icon is-small">
                    <font-awesome-icon icon="fa-solid fa-plus" /> </span
                  ><span>เพิ่มสินค้า</span>
                </button>
              </span>
            </p>
            <div class="tags">
              <span class="tag">Theme</span>
              <span class="tag">Medium</span>
            </div>
            <div class="block">
              Lorem ipsum leo risus, porta ac consectetur ac, vestibulum at
              eros. Donec id elit non mi porta gravida at eget metus. Cum sociis
              natoque penatibus et magnis dis parturient montes, nascetur
              ridiculus mus. Cras mattis consectetur purus sit amet fermentum.
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- product cards -->
    <section class="container box">
      <div class="tabs is-boxed">
        <ul>
          <li class="is-active">
            <a @click="showType = 'drink'">
              <span class="icon is-small"
                ><font-awesome-icon icon="fa-solid fa-blender"
              /></span>
              <span>เครื่องดื่ม</span>
            </a>
          </li>
          <li>
            <a @click="showType = 'bakery'">
              <span class="icon is-small"
                ><font-awesome-icon icon="fa-solid fa-bread-slice"
              /></span>
              <span>เบเกอรี่</span>
            </a>
          </li>
          <li>
            <a @click="showType = ''">
              <span class="icon is-small"
                ><font-awesome-icon icon="fa-solid fa-ellipsis"
              /></span>
              <span>อื่น ๆ</span>
            </a>
          </li>
        </ul>
        <div class="buttons is-pulled-right">
          <button class="button" @click="!isSortNameAsc">
            <font-awesome-icon
              v-show="isSortNameAsc"
              icon="fa-solid fa-arrow-down-a-z"
            />
            <font-awesome-icon
              v-show="!isSortNameAsc"
              icon="fa-solid fa-arrow-down-z-a"
            />
          </button>

          <button class="button" @click="!isSortPriceAsc">
            <font-awesome-icon
              v-show="isSortPriceAsc"
              icon="fa-solid fa-arrow-down-1-9"
            />
            <font-awesome-icon
              v-show="!isSortPriceAsc"
              icon="fa-solid fa-arrow-down-9-1"
            />
          </button>
        </div>
      </div>

      <div class="columns is-multiline m-2">
        <template v-for="(product, index) in products">
          <div class="column is-one-third" :key="product.id">
            <div class="card">
              <div class="card-image">
                <figure class="image is-4by3">
                  <img :src="product.image" alt="Placeholder image" />
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
                      <input
                        class="input"
                        type="text"
                        placeholder="Product Detail"
                        v-model="editProductDesc"
                      />
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
                            <span>{{ product.name }}</span>
                          </p>
                        </div>
                        <div class="column">
                          <span
                            class="is-pulled-right tag is-primary is-medium"
                          >
                            {{ product.price }}฿</span
                          >
                        </div>
                      </div>
                    </div>
                  </div>

                  <div class="content is-small">
                    {{ product.desc }}

                    <br />
                  </div>
                </template>
              </div>

              <footer class="card-footer">
                <a
                  @click="addToCart()"
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
                    @click="editToggle = index"
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
                    @click="deleteProduct()"
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
      <div class="modal" :class="{'is-active' : addProductModalToggle}">
        <div class="modal-background"></div>
        <div class="modal-card">
          <header class="modal-card-head">
            <p class="modal-card-title">Modal title</p>
            <button class="delete" aria-label="close" @click="addProductModalToggle=false"></button>
          </header>
          <section class="modal-card-body">
            <!-- Content ... -->
          </section>
          <footer class="modal-card-foot">
            <button class="button is-success">Save changes</button>
            <button class="button">Cancel</button>
          </footer>
        </div>
      </div>
  </div>
  
</template>

<script>
export default {
  name: "CafeProduct",
  props: ["user", "cart"],
  data() {
    return {
      addProductModalToggle: false,
      editProductName: "",
      editProductPrice: "",
      editProductDesc: "",
      showType: "drink",
      isSortNameAsc: true,
      isSortPriceAsc: true,
      isEmployee: true,
      editToggle: -1,
      products: [
        {
          id: 1,
          name: "asdasdasadfadsfdafdsaf",
          desc: "Lorem ipsum leo risus, porta ac consectetur ac, vestibulum at eros. Donec id elit non mi porta gravida at eget metus. Cum sociisnatoque penatibus et magnis dis parturient montes, nascetur",
          type: "drink",
          image:
            "https://upload.wikimedia.org/wikipedia/commons/thumb/4/45/A_small_cup_of_coffee.JPG/1200px-A_small_cup_of_coffee.JPG",
          price: 25.0,
        },
        {
          id: 2,
          name: "asdasdas",
          desc: "LOREM",
          type: "drink",
          image:
            "https://upload.wikimedia.org/wikipedia/commons/thumb/4/45/A_small_cup_of_coffee.JPG/1200px-A_small_cup_of_coffee.JPG",
          price: 25.0,
        },
        {
          id: 3,
          name: "asdasdas",
          desc: "LOREM",
          type: "drink",
          image:
            "https://upload.wikimedia.org/wikipedia/commons/thumb/4/45/A_small_cup_of_coffee.JPG/1200px-A_small_cup_of_coffee.JPG",
          price: 25.0,
        },
        {
          id: 4,
          name: "asdasdas",
          desc: "LOREM",
          type: "drink",
          image:
            "https://upload.wikimedia.org/wikipedia/commons/thumb/4/45/A_small_cup_of_coffee.JPG/1200px-A_small_cup_of_coffee.JPG",
          price: 25.0,
        },
        {
          id: 5,
          name: "asdasdas",
          desc: "LOREM",
          type: "drink",
          image:
            "https://upload.wikimedia.org/wikipedia/commons/thumb/4/45/A_small_cup_of_coffee.JPG/1200px-A_small_cup_of_coffee.JPG",
          price: 25.0,
        },
      ],
    };
  },
  methods: {
    addToCart() {
      this.$notify({ type: "success", text: "The operation completed" });
    },
    deleteProduct() {
      confirm("Are you sure?");
    },
    editProduct() {
      return;
    },
    cancelEdit() {
      this.editToggle = -1;
      this.editProductName = "";
      this.editProductDesc = "";
      this.editProductPrice = "";
    },
    addProductModal() {
      // this.addProductModalToggle = true;
      //   this.$notify({group:"app",text: "Hello user!" });
      this.addProductModalToggle = true;
    },
  },
};
</script>

<style>
</style>