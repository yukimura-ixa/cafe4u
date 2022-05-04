<template>
  <div class="container is-fluid mt-5 mb-6">
    <div class="container is-fluid mt-5">
      <div class="columns">
        <div class="card-content column is-2 is-offset-10">
          <div class="card title is-5">User Point: {{ userPoint }}</div>
        </div>
      </div>
    </div>
    <br />
    <div class="card column is-12 px-6 pt-6">
      <h1 class="title is-3 has-text-centered">Promotion</h1>
      <hr style="background-color: rgb(3, 51, 35)" />
      <template v-for="pro in promotionList">
        <div class="list has-visible-pointer-controls" :key="pro.id">
          <div class="card m-2">
            <div class="list-item">
              <div class="list-item-content">
                <div class="list-item-description" v-if="editToggle != pro.id">
                  <label class="label">{{ pro.detail }}</label>
                </div>
                <div class="list-item-description" v-else>
                  <input
                    type="text"
                    class="input"
                    placeholder="Promotion Detail"
                    v-model="editPromotionDesc"
                  />
                </div>
                <div class="list-item-description" v-if="editToggle != pro.id">
                  Start At {{ pro.start_date }}<br />
                  End At {{ pro.stop_date }}
                </div>
                <div class="list-item-description" v-else>
                  <label class="label">Start Promotion Date</label>
                  <input type="date" v-model="Newstart_date" />
                  <label class="label">Stop Promotion Date</label>
                  <input type="date" v-model="Newstop_date" />
                </div>
                <div class="list-item-description" v-if="editToggle != pro.id">
                  <label class="label">Type of Promotion: {{ pro.type }}</label>
                </div>
                <div class="list-item-description" v-else>
                  <div class="select">
                    <select v-model="newType">
                      <option>Free</option>
                      <option>Point</option>
                      <option>Price Get Discount</option>
                      <option>Product Get Discount</option>
                    </select>
                  </div>
                </div>

                <div class="list-item-description" v-if="editToggle != pro.id">
                  <label class="label" v-if="pro.type == 'Free'"
                    >Product Free ID: {{ pro.value1 }}</label
                  >
                  <label class="label" v-else>Discount: {{ pro.value1 }}</label>
                </div>
                <div class="list-item-description" v-else>
                  <input
                    type="text"
                    class="input"
                    placeholder="Product Free ID"
                    v-if="pro.type == 'Free'"
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

                <div class="list-item-description" v-if="editToggle != pro.id">
                  <label class="label" v-if="pro.type == 'Free'"
                    >Product Count Need: {{ pro.value2 }}</label
                  >
                  <label class="label" v-else-if="pro.type == 'Point'"
                    >Need Point: {{ pro.value2 }}</label
                  >
                  <label
                    class="label"
                    v-else-if="pro.type == 'Price Get Discount'"
                    >Need Price: {{ pro.value2 }}</label
                  >
                  <label
                    class="label"
                    v-else-if="pro.type == 'Product Get Discount'"
                    >Buy Count Need: {{ pro.value2 }}</label
                  >
                </div>
                <div class="list-item-description" v-else>
                  <input
                    type="text"
                    class="input"
                    placeholder="Product Count Need"
                    v-if="pro.type == 'Free'"
                    v-model="product_count_need"
                  />
                  <input
                    type="text"
                    class="input"
                    placeholder="Need Point"
                    v-if="pro.type == 'Point'"
                    v-model="need_point"
                  />
                  <input
                    type="text"
                    class="input"
                    placeholder="Need Price"
                    v-if="pro.type == 'Price Get Discount'"
                    v-model="need_price"
                  />
                  <input
                    type="text"
                    class="input"
                    placeholder="Buy Count Need"
                    v-if="pro.type == 'Product Get Discount'"
                    v-model="buy_count_need"
                  />
                </div>
              </div>
              <div class="list-item-controls">
                <div class="buttons is-right">
                  <button
                    class="button is-success"
                    @click="saveEditPromotion(pro)"
                  >
                    <span>Edit</span>
                  </button>
                  <button
                    class="button is-danger"
                    @click="deletePromotion(pro.id)"
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
        <input type="date" v-model="start_date" />
        <label class="label">Stop Promotion Date</label>
        <input type="date" v-model="stop_date" />
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
            <option>Free</option>
            <option>Point</option>
            <option>Price Get Discount</option>
            <option>Product Get Discount</option>
          </select>
        </div>
      </div>

      <div class="card column is-2 m-2" v-if="this.type == 'Free'">
        <label class="label">Product Free ID</label>
        <input
          class="input"
          placeholder="Product ID"
          v-model="addProductFreeId"
        />
        <label class="label">Product Count Need</label>
        <input class="input" placeholder="1-9" v-model="addProductCountNeed" />
      </div>

      <div class="card column is-2 m-2" v-else-if="this.type == 'Point'">
        <label class="label">Discount</label>
        <input class="input" placeholder="Discount" v-model="addDiscount" />
        <label class="label">Need Point</label>
        <input class="input" placeholder="Point" v-model="addNeedPoint" />
      </div>

      <div
        class="card column is-2 m-2"
        v-else-if="this.type == 'Price Get Discount'"
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
export default {
  name: "PromotionPage",
  props: [],
  data() {
    return {
      newproList: {
        id: null,
        start_date: null,
        stop_date: null,
        detail: null,
        type: null,
        value1: null,
        value2: null,
      },
      promotionList: [
        {
          id: 1,
          start_date: "2022-05-01",
          stop_date: "2022-05-16",
          detail: "hello world Cafe Restuarant",
          type: "Free",
          value1: 7,
          value2: 2,
        },
        {
          id: 2,
          start_date: "2022-05-01",
          stop_date: "2022-05-16",
          detail: "hello world Cafe Restuarant",
          type: "Point",
          value1: 10,
          value2: 100,
        },
        {
          id: 3,
          start_date: "2022-05-01",
          stop_date: "2022-05-16",
          detail: "hello world Cafe Restuarant",
          type: "Price Get Discount",
          value1: 10,
          value2: 150,
        },

        {
          id: 4,
          start_date: "2022-05-01",
          stop_date: "2022-05-16",
          detail: "hello world Cafe Restuarant",
          type: "Product Get Discount",
          value1: 10,
          value2: 1,
        },

        {
          id: 5,
          start_date: "2022-05-01",
          stop_date: "2022-05-16",
          detail: "hello world Cafe Restuarant",
          type: "Free",
          value1: 1,
          value2: 1,
        },
      ],
      userPoint: 500,
      selectedPromotion: [],
      editToggle: -1,
      editPromotionDesc: "",
      type: "Free",
      start_date: "",
      stop_date: "",
      product_free_id:"",
      discount:"",
      product_count_need:"",
      need_point:"",
      need_price:"",
      buy_count_need:"",
      newType:"Free",
      addProductFreeId:"",
      addProductCountNeed:"",
      addDiscount:"",
      addNeedPoint:"",
      addNeedPirce:"",
      addBuyCountNeed:"",
      newproDetail:"",
      Newstop_date:"",
      Newstart_date:"",
    };
  },
  methods: {
    saveEditPromotion(pro) {
      let selectedPromotion = this.promotionList.filter(
        (e) => e.id === pro.id
      )[0];
      if (this.editToggle == -1) {
        this.editToggle = pro.id;
        this.editPromotionDesc = selectedPromotion.detail;
        this.newType = selectedPromotion.type;
        this.start_date = selectedPromotion.start_date;
        this.stop_date = selectedPromotion.stop_date;
        if(pro.type == "Free"){
          this.product_free_id = selectedPromotion.value1
          this.product_count_need = selectedPromotion.value2
        }
        else if(pro.type == "Point"){
          this.discount = selectedPromotion.value1
          this.need_point = selectedPromotion.value2
        }
        else if(pro.type == "Price Get Discount"){
          this.discount = selectedPromotion.value1
          this.need_price = selectedPromotion.value2
        }
        else if(pro.type == "Product Get Discount"){
          this.discount = selectedPromotion.value1
          this.buy_count_need = selectedPromotion.value2
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

