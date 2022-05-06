<template>
  <div class="container is-fluid mt-5 mb-6">
    <div class="card column is-12 px-6 pt-6">
      <h1 class="title is-3 has-text-centered">Promotion</h1>
      <hr style="background-color: rgb(3, 51, 35)" />

      <div
        class="list has-visible-pointer-controls"
        v-for="pro in promotionList"
        :key="pro.pro_id"
      >
        <div class="card m-2">
          <div class="list-item">
            <div class="list-item-content">
              <div
                class="list-item-description"
                v-if="editToggle != pro.pro_id"
              >
                <label class="label">{{ pro.pro_detail }}</label>
              </div>
              <div class="list-item-description" v-else>
                <input
                  type="text"
                  class="input"
                  placeholder="Promotion Detail"
                  v-model="editPromotionDesc"
                />
              </div>
              <div
                class="list-item-description"
                v-if="editToggle != pro.pro_id"
              >
                Start At
                {{
                  new Date(Date.parse(pro.start_date))
                    .toLocaleString()
                    .substring(0, 10)
                }}<br />
                End At
                {{
                  new Date(Date.parse(pro.expired_date))
                    .toLocaleString()
                    .substring(0, 10)
                }}
              </div>
              <div class="list-item-description" v-else>
                <label class="label">Start Promotion Date</label>
                <input type="date" v-model="start_date" />
                <label class="label">Stop Promotion Date</label>
                <input type="date" v-model="stop_date" />
              </div>
              <div class="list-item-description">
                <label class="label"
                  >Type of Promotion: {{ pro.pro_type }}</label
                >
              </div>

              <div
                class="list-item-description"
                v-if="editToggle != pro.pro_id"
              >
                <label class="label" v-if="pro.pro_type == 'free'"
                  >Product Free ID: {{ pro.product_free }}</label
                >
                <label class="label" v-else>Discount: {{ pro.discount }}</label>
              </div>
              <div class="list-item-description" v-else>
                <input
                  type="text"
                  class="input"
                  placeholder="Product Free ID"
                  v-if="pro.pro_type == 'free'"
                  v-model="product_free_id"
                />
                <input
                  type="text"
                  class="input"
                  placeholder="Discount"
                  v-else
                  v-model="discount"
                />
              </div>

              <div
                class="list-item-description"
                v-if="editToggle != pro.pro_id"
              >
                <label class="label" v-if="pro.pro_type == 'free'"
                  >Product Count Need: {{ pro.product_count_need }}</label
                >
                <label class="label" v-else-if="pro.pro_type == 'point'"
                  >Need Point: {{ pro.point_need }}</label
                >
                <label
                  class="label"
                  v-else-if="pro.pro_type == 'price_get_discount'"
                  >Need Price: {{ pro.buy_price_need }}</label
                >
                <label
                  class="label"
                  v-else-if="pro.pro_type == 'product_get_discount'"
                  >Buy Count Need: {{ pro.buy_count_need }}<br />
                  Product ID: {{ pro.product_id }}</label
                >
              </div>
              <div class="list-item-description" v-else>
                <input
                  type="text"
                  class="input"
                  placeholder="Product Count Need"
                  v-if="pro.pro_type == 'free'"
                  v-model="product_count_need"
                />
                <input
                  type="text"
                  class="input"
                  placeholder="Need Point"
                  v-if="pro.pro_type == 'point'"
                  v-model="need_point"
                />
                <input
                  type="text"
                  class="input"
                  placeholder="Need Price"
                  v-if="pro.pro_type == 'price_get_discount'"
                  v-model="need_price"
                />
                <input
                  type="text"
                  class="input"
                  placeholder="Buy Count Need"
                  v-if="pro.pro_type == 'product_get_discount'"
                  v-model="buy_count_need"
                />
                <input
                  type="text"
                  class="input"
                  placeholder="Product ID"
                  v-if="pro.pro_type == 'product_get_discount'"
                  v-model="productId"
                />
              </div>
            </div>
            <div class="list-item-controls">
              <div class="buttons is-right">
                <button
                  class="button is-success"
                  @click="saveEditPromotion(pro.pro_id, pro.pro_type)"
                  v-if="user.user_type == 'employee'"
                >
                  <span>Edit</span>
                </button>
                <button
                  class="button is-danger"
                  @click="deletePromotion(pro.pro_id)"
                  v-if="user.user_type == 'employee'"
                >
                  <span>Delete</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <br />

    <div class="columns" v-if="user.user_type == 'employee'">
      <div class="card column is-2 is-offset-2 m-2">
        <label class="label">Start Promotion Date</label>
        <input type="date" v-model="Newstart_date" />
        <label class="label">Stop Promotion Date</label>
        <input type="date" v-model="Newstop_date" />
      </div>

      <div class="card column is-4 m-2">
        <div class="control">
          <textarea
            class="textarea"
            type="promotion_detail"
            placeholder="Promotion Detail"
            v-model="newproDetail"
          />
        </div>
      </div>

      <div class="column is-2 m-2">
        <div class="select">
          <select v-model="type">
            <option>free</option>
            <option>point</option>
            <option>price_get_discount</option>
            <option>product_get_discount</option>
          </select>
        </div>
      </div>

      <div class="card column is-2 m-2" v-if="this.type == 'free'">
        <label class="label">Product Free ID</label>
        <input
          class="input"
          placeholder="Product ID"
          v-model="addProductFreeId"
        />
        <label class="label">Product Count Need</label>
        <input class="input" placeholder="1-9" v-model="addProductCountNeed" />
      </div>

      <div class="card column is-2 m-2" v-else-if="this.type == 'point'">
        <label class="label">Discount</label>
        <input class="input" placeholder="Discount" v-model="addDiscount" />
        <label class="label">Need Point</label>
        <input class="input" placeholder="Point" v-model="addNeedPoint" />
      </div>

      <div
        class="card column is-2 m-2"
        v-else-if="this.type == 'price_get_discount'"
      >
        <label class="label">Discount</label>
        <input class="input" placeholder="Discount" v-model="addDiscount" />
        <label class="label">Need Price</label>
        <input class="input" placeholder="Price" v-model="addNeedPirce" />
      </div>

      <div class="card column is-2 m-2" v-else>
        <label class="label">Discount</label>
        <input class="input" placeholder="Discount" v-model="addDiscount" />
        <label class="label">Buy Count Need</label>
        <input class="input" placeholder="1-9" v-model="addBuyCountNeed" />
        <label class="label">Product ID</label>
        <input class="input" placeholder="Product ID" v-model="addProductId" />
      </div>

      <div class="card-content column is-2 m-2">
        <button
          class="button is-warning"
          @click="addNewPromotion(promotionList.length + 1)"
        >
          <span>Add Promotion</span>
        </button>
      </div>
    </div>
  </div>
</template>


<script>
import axios from "@/plugins/axios";
export default {
  name: "PromotionPage",
  props: ["user"],
  data() {
    return {
      promotionList: [],
      selectedPromotion: [],
      editToggle: -1,
      editPromotionDesc: "",
      type: "free",
      start_date: "",
      stop_date: "",
      product_free_id: null,
      discount: null,
      product_count_need: null,
      need_point: null,
      need_price: null,
      buy_count_need: null,
      productId: null,
      newType: "free",
      addProductFreeId: null,
      addProductCountNeed: null,
      addDiscount: null,
      addNeedPoint: null,
      addNeedPirce: null,
      addBuyCountNeed: null,
      addProductId: null,
      newproDetail: "",
      Newstop_date: "",
      Newstart_date: "",
    };
  },
  mounted() {
    this.getPromotionDetail();
  },
  methods: {
    getPromotionDetail() {
      axios
        .get("http://localhost:3000/promotion")
        .then((response) => {
          this.promotionList = response.data;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    clearDetail() {
      this.addBuyCountNeed = "";
      this.addDiscount = "";
      this.addNeedPirce = "";
      this.addNeedPoint = "";
      this.addProductCountNeed = "";
      this.addProductFreeId = "";
      this.addProductId = "";
      this.type = "free";
      this.newproDetail = "";
      this.Newstart_date = "";
      this.Newstop_date = "";
    },
    saveEditPromotion(proId, type) {
      let selectedPromotion = this.promotionList.filter(
        (e) => e.pro_id === proId
      )[0];
      if (this.editToggle == -1) {
        this.editToggle = proId;
        this.editPromotionDesc = selectedPromotion.pro_detail;
        this.newType = selectedPromotion.pro_type;
        this.start_date = selectedPromotion.start_date.substring(0, 10);
        this.stop_date = selectedPromotion.expired_date.substring(0, 10);
        if (selectedPromotion.pro_type == "free") {
          this.product_free_id = selectedPromotion.product_free;
          this.product_count_need = selectedPromotion.product_count_need;
        } else if (selectedPromotion.pro_type == "point") {
          this.discount = selectedPromotion.discount;
          this.need_point = selectedPromotion.point_need;
        } else if (selectedPromotion.pro_type == "price_get_discount") {
          this.discount = selectedPromotion.discount;
          this.need_price = selectedPromotion.buy_price_need;
        } else if (selectedPromotion.pro_type == "product_get_discount") {
          this.discount = selectedPromotion.discount;
          this.buy_count_need = selectedPromotion.buy_count_need;
          this.productId = selectedPromotion.product_id;
        }
      } else {
        let data = {};
        if (type == "free") {
          data = {
            pro_detail: this.editPromotionDesc,
            product_free_id: this.product_free_id,
            product_count_need: this.product_count_need,
            discount: this.discount,
            need_point: this.need_point,
            need_price: this.need_price,
            buy_count_need: this.buy_count_need,
            product_id: this.product_free_id,
            start_date: this.start_date,
            expired_date: this.stop_date,
          };
        } else {
          data = {
            pro_detail: this.editPromotionDesc,
            product_free_id: this.product_free_id,
            product_count_need: this.product_count_need,
            discount: this.discount,
            need_point: this.need_point,
            need_price: this.need_price,
            buy_count_need: this.buy_count_need,
            product_id: this.productId,
            start_date: this.start_date,
            expired_date: this.stop_date,
          };
        }
        axios
          .put(`http://localhost:3000/promotion/edit/${proId}`, data)
          .then(() => {
            this.getPromotionDetail();
            this.editToggle = -1;
          })
          .catch((err) => {
            alert(err.response.data.details.message);
          });
      }
    },
    addNewPromotion(lengthOfPro) {
      let data = {};
      if (this.type == "free") {
        data = {
          pro_detail: this.newproDetail,
          pro_type: this.type,
          product_free_id: this.addProductFreeId,
          product_count_need: this.addProductCountNeed,
          discount: this.addDiscount,
          need_point: this.addNeedPoint,
          need_price: this.addNeedPirce,
          buy_count_need: this.addBuyCountNeed,
          product_id: this.addProductFreeId,
          start_date: this.Newstart_date,
          expired_date: this.Newstop_date,
        };
      } else {
        data = {
          pro_detail: this.newproDetail,
          pro_type: this.type,
          product_free_id: this.addProductFreeId,
          product_count_need: this.addProductCountNeed,
          discount: this.addDiscount,
          need_point: this.addNeedPoint,
          need_price: this.addNeedPirce,
          buy_count_need: this.addBuyCountNeed,
          product_id: this.addProductId,
          start_date: this.Newstart_date,
          expired_date: this.Newstop_date,
        };
      }
      axios
        .post(`http://localhost:3000/promotion/add/${lengthOfPro}`, data)
        .then(() => {
          this.getPromotionDetail();
          this.clearDetail();
        })
        .catch((err) => {
          alert(err.response.data.details.message);
        });
    },
    deletePromotion(proId) {
      const result = confirm(`Are you sure you want to delete this Promotion`);
      if (result) {
        axios
          .delete(`http://localhost:3000/promotion/${proId}`)
          .then(() => {
            this.getPromotionDetail();
          })
          .catch((err) => {
            console.log(err);
            alert(err.response.data.details.message);
          });
      }
    },
  },
};
</script>
<style>
body {
  background-color: rgb(78, 153, 110);
  height: 200;
}
</style>

