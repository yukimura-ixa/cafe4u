<template>
  <div class="container is-fluid mt-5 mb-6">
    <div class="card column is-12 px-6 pt-6">
      <h1 class="title is-3 has-text-centered">Promotion</h1>
      <hr style="background-color: rgb(3, 51, 35)" />
      <template v-for="pro in promotionList">
        <div class="list has-visible-pointer-controls" :key="pro.pro_id">
          <div class="card m-2">
            <div class="list-item">
              <div class="list-item-content">
                <div class="list-item-description" v-if="editToggle != pro.pro_id">
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
                <div class="list-item-description" v-if="editToggle != pro.pro_id">
                  Start At {{ new Date(Date.parse(pro.start_date)) }}<br />
                  End At {{ new Date(Date.parse(pro.expired_date)) }}
                </div>
                <div class="list-item-description" v-else>
                  <label class="label">Start Promotion Date</label>
                  <input type="date" v-model="start_date" />
                  <label class="label">Stop Promotion Date</label>
                  <input type="date" v-model="stop_date" />
                </div>
                <div class="list-item-description" v-if="editToggle != pro.pro_id">
                  <label class="label">Type of Promotion: {{ pro.pro_type }}</label>
                </div>
                <div class="list-item-description" v-else>
                  <div class="select">
                    <select v-model="newType">
                      <option>free</option>
                      <option>point</option>
                      <option>price_get_discount</option>
                      <option>product_get_discount</option>
                    </select>
                  </div>
                </div>

                <div class="list-item-description" v-if="editToggle != pro.pro_id">
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

                <div class="list-item-description" v-if="editToggle != pro.pro_id">
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
                    >Buy Count Need: {{ pro.buy_count_need }}</label
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
                </div>
              </div>
              <div class="list-item-controls">
                <div class="buttons is-right">
                  <button
                    class="button is-success"
                    @click="saveEditPromotion(pro.pro_id)"
                  >
                    <span>Edit</span>
                  </button>
                  <button
                    class="button is-danger"
                    @click="deletePromotion(pro.pro_id)"
                  >
                    <span>Delete</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </template>
    </div>
    <br />
    <div class="columns">
      <div class="card column is-2 m-2">
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
      </div>

      <div class="card-content column is-2 m-2">
        <button class="button is-warning" @click="addNewPromotion()">
          <span>Add Promotion</span>
        </button>
      </div>
    </div>
  </div>
</template>


<script>
import axios from "axios";
export default {
  name: "PromotionPage",
  props: [],
  data() {
    return {
      /*/newproList: {
        id: null,
        start_date: null,
        stop_date: null,
        detail: null,
        type: null,
        value1: null,
        value2: null,
      },/*/
      promotionList: [],
      userPoint: 500,
      selectedPromotion: [],
      editToggle: -1,
      editPromotionDesc: "",
      type: "free",
      start_date: "",
      stop_date: "",
      product_free_id: "",
      discount: "",
      product_count_need: "",
      need_point: "",
      need_price: "",
      buy_count_need: "",
      newType: "Free",
      addProductFreeId: "",
      addProductCountNeed: "",
      addDiscount: "",
      addNeedPoint: "",
      addNeedPirce: "",
      addBuyCountNeed: "",
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
    saveEditPromotion(proId) {
      let selectedPromotion = this.promotionList.filter(
        (e) => e.pro_id === proId
      )[0];
      if (this.editToggle == -1) {
        this.editToggle = proId;
        this.editPromotionDesc = selectedPromotion.pro_detail;
        this.newType = selectedPromotion.pro_type;
        this.start_date = selectedPromotion.start_date;
        this.stop_date = selectedPromotion.expired_date;
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
        }
      } else {
        this.editToggle = -1;
      }
    },
    addNewPromotion() {
      this.newproList.id = this.promotionList.length + 1;
      /*/this.newproList.start_date = this.Newstart_date
      this.newproList.stop_date = this.new
      this.newproList.detail = this.newproDetail
      this.newproList.type = this.newType
      if(this.newproList.type == "Free"){
        this.newproList.value1 = this.addProductFreeId
        this.newproList.value2 = this.addProductCountNeed
      }
      else if(this.newproList.type == "Point"){
        this.newproList.value1 = this.addDiscount
        this.newproList.value2 = this.addNeedPoint
      }
      else if(this.newproList.type == "Price Get Discount"){
        this.newproList.value1 = this.addDiscount
        this.newproList.value2 = this.addNeedPirce
      }
      else if(this.newproList.type == "Product Get Discount"){
        this.newproList.value1 = this.addDiscount
        this.newproList.value2 = this.addBuyCountNeed
      }/*/
      this.promotionList.push(this.newproList);
    },
    //deletePromotion(proId) {
    //},
  },
};
</script>
<style>
body {
  background-color: rgb(78, 153, 110);
  height: 200;
}
</style>

