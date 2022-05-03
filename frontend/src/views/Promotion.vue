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
                <div class="list-item-title" v-if="editToggle != pro.id">{{ pro.name }}</div>
                <div class="list-item-description" v-else>
                  <input
                    type="text"
                    class="input"
                    v-model="editPromotionName"
                  />
                </div>
                <div class="list-item-description" v-if="editToggle != pro.id">
                  {{ pro.desc }}
                </div>
                <div class="list-item-description" v-else>
                  <input
                    type="text"
                    class="input"
                    v-model="editPromotionDesc"
                  />
                </div>
                <div class="list-item-description" v-if="editToggle != pro.id">
                  {{ pro.free_or_discount }}
                </div>
                <div class="list-item-description" v-else>
                  <input
                    type="text"
                    class="input"
                    v-model="editPromotionMessage"
                  />
                </div>
              </div>
              <div class="list-item-controls">
                <div class="buttons is-right">
                  <button
                    class="button is-success"
                    @click="saveEditPromotion(pro.id)"
                  >
                    <span>Edit</span>
                  </button>
                  <button class="button is-danger" @click="deletePromotion(pro.id)">
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
      <div class="column is-2">
        <div class="control">
          <input
            class="input"
            type="promotion_name"
            placeholder="Promotion Name"
            v-model="newproName"
          />
        </div>
      </div>
      <div class="column is-4">
        <div class="control">
          <input
            class="input"
            type="promotion_desc"
            placeholder="Promotion Description"
            v-model="newproDesc"
          />
        </div>
      </div>
      <div class="column is-4">
        <div class="control">
          <input
            class="input"
            type="promotion_detail"
            placeholder="Promotion Detail"
            v-model="newproDetail"
          />
        </div>
      </div>
      <div class="card-content column is-2">
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
        name: "",
        desc: "",
        free_or_discount: "",
      },
      promotionList: [
        {
          id: 1,
          name: "promotion1",
          desc: "Lorem ipsum",
          free_or_discount: "buy 1 free 1",
        },
        {
          id: 2,
          name: "promotion2",
          desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
          free_or_discount: "discount 50 bath if buy orange juice",
        },
        {
          id: 3,
          name: "promotion3",
          desc: "Lorem ipsum",
          free_or_discount: "discount 10% if buy more than 300",
        },

        {
          id: 4,
          name: "promotion4",
          desc: "Lorem ipsum",
          free_or_discount: "buy 2 free 1",
        },

        {
          id: 5,
          name: "promotion5",
          desc: "Lorem ipsum",
          free_or_discount: "buy 2 discount 15%",
        },
      ],
      userPoint: 500,
      selectedPromotion: [],
      editToggle: -1,
      editPromotionName:"",
      editPromotionMessage: "",
      editPromotionDesc: "",
      newproName: "",
      newproDesc: "",
      newproDetail: "",
    };
  },
  methods: {
    saveEditPromotion(proId) {
      let selectedPromotion = this.promotionList.filter(
        (e) => e.id === proId
      )[0];
      if (this.editToggle == -1) {
        this.editToggle = proId;
        this.editPromotionName = selectedPromotion.name;
        this.editPromotionDesc = selectedPromotion.desc;
        this.editPromotionMessage = selectedPromotion.free_or_discount;
      } else {
        this.editToggle = -1;
      }
    },
    addNewPromotion() {
      this.newproList.id = this.promotionList.length + 1;
      this.newproList.name = this.newproName;
      this.newproList.desc = this.newproDesc;
      this.newproList.free_or_discount = this.newproDetail;
      this.promotionList.push(this.newproList);
      this.newproName = "";
      this.newproDesc = "";
      this.newproDetail = "";
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

