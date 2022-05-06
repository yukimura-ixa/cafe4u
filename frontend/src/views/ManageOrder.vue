<template>
  <div class="container is-fluid mt-5">
    <div class="columns is-centered">
      <!-- left element -->
      <div class="column is-4">
        <div class="card">
          <header class="card-header" style="background-color: rgb(13, 56, 11)">
            <p class="card-header-title has-text-success-light">
              In-Queue Order
            </p>
            <div class="card-header-icon">
              <div class="control has-icons-left">
                <div class="select is-primary">
                  <select
                    style="background-color: rgb(219, 255, 217)"
                    v-model="sortQueue"
                  >
                    <option value="date_d">Date DESC</option>
                    <option value="date_a">Date ASC</option>
                  </select>
                </div>
                <div class="icon is-left">
                  <font-awesome-icon
                    icon="fa-solid fa-arrow-down-wide-short"
                    class="has-text-black-ter"
                  />
                </div>
              </div>
            </div>
          </header>
          <div class="card-content has-background-grey-lighter">
            <div class="content" style="max-height: 40vh; overflow-y: auto">
              <!-- In-Queue Order -->
              <div
                class="card mb-5"
                v-for="order in inQueueOrder"
                :key="order.order_id"
              >
                <div
                  class="card-content"
                  style="padding: 0.9em"
                  @click="selectOrder(order)"
                >
                  <div class="content columns">
                    <div class="column is-4">
                      Order#{{ order.order_id }} &nbsp;
                      <strong>({{ order.order_totalprice }} B)</strong><br />
                      <span
                        v-if="order.order_status == 'finished'"
                        class="
                          box
                          has-text-centered
                          has-background-success
                          has-text-light
                          is-uppercase
                        "
                        style="padding: 0.5em"
                        >{{ order.order_status }}</span
                      >
                      <span
                        v-if="order.order_status == 'pending'"
                        class="
                          box
                          has-text-centered has-background-info has-text-light
                          is-uppercase
                        "
                        style="padding: 0.5em"
                        >{{ order.order_status }}</span
                      >
                      <span
                        v-if="order.order_status == 'in queue'"
                        class="
                          box
                          has-text-centered
                          has-background-warning
                          has-text-black-ter
                          is-uppercase
                        "
                        style="padding: 0.5em"
                        >{{ order.order_status }}</span
                      >
                    </div>
                    <div class="column is-4 is-offset-4 has-text-right">
                      {{ order.order_datetime.substring(0, 10) }}
                      {{ order.order_datetime.substring(11, 19) }}<br />
                      <button
                        class="button is-info mr-2"
                        v-if="order.order_status == 'in queue'"
                        @click="doOrder($event, order)"
                      >
                        Do
                      </button>
                      <button
                        class="button is-outlined is-danger"
                        v-if="order.order_status == 'in queue'"
                        @click="cancelOrder($event, order)"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <header class="card-header" style="background-color: rgb(13, 56, 11)">
            <p class="card-header-title has-text-success-light">
              Pending Order
            </p>
            <div class="card-header-icon">
              <div class="control has-icons-left">
                <div class="select is-primary">
                  <select
                    style="background-color: rgb(219, 255, 217)"
                    v-model="sortPending"
                  >
                    <option value="date_d">Date DESC</option>
                    <option value="date_a">Date ASC</option>
                  </select>
                </div>
                <div class="icon is-left">
                  <font-awesome-icon
                    icon="fa-solid fa-arrow-down-wide-short"
                    class="has-text-black-ter"
                  />
                </div>
              </div>
            </div>
          </header>
          <div class="card-content has-background-grey-lighter">
            <div class="content" style="max-height: 40vh; overflow-y: auto">
              <!-- Pending Order -->
              <div
                class="card mb-5"
                v-for="order in pendingOrder"
                :key="order.order_id"
              >
                <div
                  class="card-content"
                  style="padding: 0.9em"
                  @click="selectOrder(order)"
                >
                  <div class="content columns">
                    <div class="column is-4">
                      Order#{{ order.order_id }} &nbsp;
                      <strong>({{ order.order_totalprice }} B)</strong><br />
                      <span
                        v-if="order.order_status == 'finished'"
                        class="
                          box
                          has-text-centered
                          has-background-success
                          has-text-light
                          is-uppercase
                        "
                        style="padding: 0.5em"
                        >{{ order.order_status }}</span
                      >
                      <span
                        v-if="order.order_status == 'pending'"
                        class="
                          box
                          has-text-centered has-background-info has-text-light
                          is-uppercase
                        "
                        style="padding: 0.5em"
                        >{{ order.order_status }}</span
                      >
                      <span
                        v-if="order.order_status == 'in queue'"
                        class="
                          box
                          has-text-centered
                          has-background-warning
                          has-text-black-ter
                          is-uppercase
                        "
                        style="padding: 0.5em"
                        >{{ order.order_status }}</span
                      >
                    </div>
                    <div class="column is-4 is-offset-4 has-text-right">
                      {{ order.order_datetime.substring(0, 10) }}
                      {{ order.order_datetime.substring(11, 19) }}<br />
                      <button
                        class="button is-success mr-2"
                        v-if="order.order_status == 'pending'"
                        @click="finishOrder($event, order)"
                      >
                        Finish
                      </button>
                      <button
                        class="button is-outlined is-danger"
                        v-if="order.order_status == 'pending'"
                        @click="cancelOrder($event, order)"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <header class="card-header" style="background-color: rgb(13, 56, 11)">
            <p class="card-header-title has-text-success-light">
              Finished Order
            </p>
            <div class="card-header-icon">
              <div class="control has-icons-left">
                <div class="select is-primary">
                  <select
                    style="background-color: rgb(219, 255, 217)"
                    v-model="sortFinish"
                  >
                    <option value="date_d">Date DESC</option>
                    <option value="date_a">Date ASC</option>
                  </select>
                </div>
                <div class="icon is-left">
                  <font-awesome-icon
                    icon="fa-solid fa-arrow-down-wide-short"
                    class="has-text-black-ter"
                  />
                </div>
              </div>
            </div>
          </header>
          <div class="card-content has-background-grey-lighter">
            <div class="content" style="max-height: 40vh; overflow-y: auto">
              <!-- Finished Order -->
              <div
                class="card mb-5"
                v-for="order in finishedOrder"
                :key="order.order_id"
              >
                <div
                  class="card-content"
                  style="padding: 0.9em"
                  @click="selectOrder(order)"
                >
                  <div class="content columns">
                    <div class="column is-4">
                      Order#{{ order.order_id }} &nbsp;
                      <strong>({{ order.order_totalprice }} B)</strong><br />
                      <span
                        v-if="order.order_status == 'finished'"
                        class="
                          box
                          has-text-centered
                          has-background-success
                          has-text-light
                          is-uppercase
                        "
                        style="padding: 0.5em"
                        >{{ order.order_status }}</span
                      >
                      <span
                        v-if="order.order_status == 'pending'"
                        class="
                          box
                          has-text-centered has-background-info has-text-light
                          is-uppercase
                        "
                        style="padding: 0.5em"
                        >{{ order.order_status }}</span
                      >
                      <span
                        v-if="order.order_status == 'in queue'"
                        class="
                          box
                          has-text-centered
                          has-background-warning
                          has-text-black-ter
                          is-uppercase
                        "
                        style="padding: 0.5em"
                        >{{ order.order_status }}</span
                      >
                    </div>
                    <div class="column is-4 is-offset-4 has-text-right">
                      {{ order.order_datetime.substring(0, 10) }}
                      {{ order.order_datetime.substring(11, 19) }}<br />
                      <button
                        class="button is-outlined is-success mr-2"
                        v-if="order.order_status == 'finished'"
                        @click="soldOrder($event, order)"
                      >
                        Sold
                      </button>
                      <button
                        class="button is-outlined is-danger"
                        v-if="order.order_status == 'finished'"
                        @click="cancelOrder($event, order)"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- right element -->
      <div class="column is-8">
        <div class="card" :class="[!currentOrder ? 'blankstyle' : '']">
          <div
            class="card-content has-background-white"
            style="min-height: 80vh"
            v-if="currentOrder"
          >
            <div class="content">
              <div class="columns">
                <div class="column is-8">
                  <div>Order#{{ currentOrder.order_id }}</div>
                  <div>Cafe: {{ currentOrder.cafe_name }}</div>
                  <div>Location: {{ currentOrder.cafe_location }}</div>
                  <div>
                    By Employee: {{ currentOrder.fname }}
                    {{ currentOrder.lname }}
                  </div>
                </div>
                <div class="column is-4 has-text-right">
                  <div>
                    Date:
                    {{
                      currentOrder.order_datetime.substring(0, 10)
                    }}&nbsp;&nbsp;Time:
                    {{ currentOrder.order_datetime.substring(11, 19) }}
                  </div>
                  <div>
                    Status:
                    <span
                      v-if="currentOrder.order_status == 'finished'"
                      class="
                        box
                        has-text-centered has-background-success has-text-light
                        is-uppercase
                        px-5
                      "
                      style="padding: 0.5em; display: inline-block"
                      >{{ currentOrder.order_status }}</span
                    >
                    <span
                      v-if="currentOrder.order_status == 'pending'"
                      class="
                        box
                        has-text-centered has-background-info has-text-light
                        is-uppercase
                        px-5
                      "
                      style="padding: 0.5em; display: inline-block"
                      >{{ currentOrder.order_status }}</span
                    >
                    <span
                      v-if="currentOrder.order_status == 'in queue'"
                      class="
                        box
                        has-text-centered
                        has-background-warning
                        has-text-black-ter
                        is-uppercase
                        px-5
                      "
                      style="padding: 0.5em; display: inline-block"
                      >{{ currentOrder.order_status }}</span
                    >
                    <span
                      v-if="currentOrder.order_status == 'sold'"
                      class="
                        has-text-centered has-text-success
                        is-uppercase
                        px-5
                      "
                      style="padding: 0.5em; display: inline-block"
                      >{{ currentOrder.order_status }}</span
                    >
                    <span
                      v-if="currentOrder.order_status == 'cancelled'"
                      class="
                        has-text-centered has-text-danger has-text-light
                        is-uppercase
                        px-5
                      "
                      style="padding: 0.5em; display: inline-block"
                      >{{ currentOrder.order_status }}</span
                    >
                  </div>
                </div>
              </div>
            </div>
            <div class="content">
              <table
                class="
                  table
                  has-background-success-light
                  is-striped is-hoverable
                "
              >
                <thead class="has-background-success">
                  <tr>
                    <th>#</th>
                    <th>Product</th>
                    <th>Price</th>
                    <th>Quantity</th>
                    <th>Total</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(item, index) in currentOrderItem" :key="item.item_no">
                    <td style="vertical-align: middle">{{ index + 1 }}</td>
                    <td style="vertical-align: middle">
                      <div class="list-item">
                        <div class="list-item-image">
                          <figure class="image is-64x64">
                            <img :src="showImage(item.product_id)" />
                          </figure>
                        </div>

                        <div class="list-item-content">
                          <div class="list-item-title">
                            {{ item.product_name }}
                          </div>
                          <div
                            class="list-item-description"
                            v-if="optionOf(item.item_no) != ''"
                          >
                            Option: {{ optionOf(item.item_no) }}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td style="vertical-align: middle">
                      {{ item.product_price }}
                    </td>
                    <td style="vertical-align: middle">
                      {{ item.order_amount }}
                    </td>
                    <td style="vertical-align: middle">
                      {{ item.item_totalprice }}
                      <span v-if="optionOf(item.item_no) != ''"
                        >+ ({{ optionPrice(item.item_no) }})</span
                      >
                    </td>
                  </tr>

                  <tr v-if="currentOrder.pro_type == 'free'">
                    <td style="vertical-align: middle">
                      {{ currentOrderItem.length + 1 }}
                    </td>
                    <td style="vertical-align: middle">
                      <div class="list-item">
                        <div class="list-item-image">
                          <figure class="image is-64x64">
                            <img :src="showImage(currentOrder.product_id)" />
                          </figure>
                        </div>
                        <div class="list-item-content">
                          <div class="list-item-title">
                            (PROMOTION){{ currentOrder.product_name }}
                          </div>
                          <div class="list-item-description">
                          </div>
                        </div>
                      </div>
                    </td>
                    <td style="vertical-align: middle">FREE</td>
                    <td style="vertical-align: middle">1</td>
                    <td style="vertical-align: middle">FREE</td>
                  </tr>

                  <tr v-if="currentOrder.pro_type != 'free' && currentOrder.pro_type != null">
                    <td style="vertical-align: middle">
                      {{ currentOrderItem.length + 1 }}
                    </td>
                    <td style="vertical-align: middle">
                      <div class="list-item">
                        <div class="list-item-content">
                          <div class="list-item-title">
                            (PROMOTION){{ currentOrder.pro_detail }}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td style="vertical-align: middle"></td>
                    <td style="vertical-align: middle"></td>
                    <td style="vertical-align: middle">
                      -{{ currentOrder.discount }}
                    </td>
                  </tr>

                  <tr>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td>{{ totalPrice }}</td>
                  </tr>
                </tbody>
              </table>
              <div v-if="currentOrder.pro_id">
                Promotion Used: {{ currentOrder.pro_detail }}
              </div>
            </div>
          </div>
          <footer class="card-footer p-5" v-if="currentOrder">
            <div class="ml-auto">
              <button
                class="button is-info mr-3"
                v-if="currentOrder.order_status == 'in queue'"
                @click="doOrder($event, currentOrder)"
              >
                Do
              </button>
              <button
                class="button is-success mr-3"
                v-if="currentOrder.order_status == 'pending'"
                @click="finishOrder($event, currentOrder)"
              >
                Finish
              </button>
              <button
                class="button is-outlined is-success mr-3"
                v-if="currentOrder.order_status == 'finished'"
                @click="soldOrder($event, currentOrder)"
              >
                Sold
              </button>
              <button
                class="button is-outlined is-danger"
                v-if="
                  currentOrder.order_status != 'cancelled' ||
                  currentOrder.order_status != 'sold'
                "
                @click="cancelOrder($event, currentOrder)"
              >
                Cancel
              </button>
            </div>
          </footer>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "@/plugins/axios";
export default {
  name: "ManageOrder",
  props:['user'],
  data() {
    return {
      selectedOrder: -1,
      sortQueue: "date_a",
      sortPending: "date_a",
      sortFinish: "date_a",
      orders: [],
      orders_item: [],
      images: [],
      option: [],
    };
  },
  created() {
    this.getOrder(this.$route.params.cafeId);
  },
  methods: {
    getOrder(cafe_id) {
      axios
        .get(`http://localhost:3000/admin/orders/${cafe_id}`)
        .then((response) => {
          console.log(response);
          this.orders = response.data.orders;
          this.orders_item = response.data.order_item;
          this.images = response.data.image
          this.option = response.data.option
        })
        .catch((error) => {
          this.error = error.response.data.message;
        });
    },
    selectOrder(order) {
      this.selectedOrder = order.order_id;
    },
    cancelOrder(e, order) {
      e.stopPropagation();
      if (!confirm("Are you sure to cancel Order#" + order.order_id)) {
        return;
      }
      axios
        .put(`http://localhost:3000/admin/orders/${order.order_id}`, {
          toStatus: "cancelled",
        })
        .then((response) => {
          let thisorder = this.orders.filter((order) => {
            return order.order_id == response.data.newstatus[0].order_id;
          });
          thisorder[0].order_status = response.data.newstatus[0].order_status;
        })
        .catch((error) => {
          this.error = error.response.data.message;
        });
    },
    doOrder(e, order) {
      e.stopPropagation();
      axios
        .put(`http://localhost:3000/admin/orders/${order.order_id}`, {
          toStatus: "pending",user:this.user
        })
        .then((response) => {
          let thisorder = this.orders.filter((order) => {
            return order.order_id == response.data.newstatus[0].order_id;
          });
          for (var key of Object.keys(thisorder[0])) {
              thisorder[0][key] = response.data.newstatus[0][key]
          }
        })
        .catch((error) => {
          this.error = error.response.data.message;
        });
    },
    finishOrder(e, order) {
      e.stopPropagation();
      axios
        .put(`http://localhost:3000/admin/orders/${order.order_id}`, {
          toStatus: "finished",
        })
        .then((response) => {
          let thisorder = this.orders.filter((order) => {
            return order.order_id == response.data.newstatus[0].order_id;
          });
          thisorder[0].order_status = response.data.newstatus[0].order_status;
        })
        .catch((error) => {
          this.error = error.response.data.message;
        });
    },
    soldOrder(e, order) {
      e.stopPropagation();
      if (
        !confirm(
          "Are you sure that customer have received Order#" + order.order_id
        )
      ) {
        return;
      }
      axios
        .put(`http://localhost:3000/admin/orders/${order.order_id}`, {
          toStatus: "sold",
        })
        .then((response) => {
          let thisorder = this.orders.filter((order) => {
            return order.order_id == response.data.newstatus[0].order_id;
          });
          thisorder[0].order_status = response.data.newstatus[0].order_status;
        })
        .catch((error) => {
          this.error = error.response.data.message;
        });
    },
    showImage(product_id){
      let image = this.images.filter((each) => {
        return each.product_id == product_id;
      });
      if (image[0] == null) {
        return "https://via.placeholder.com/128x128.png?text=Image";
      }
      return 'http://localhost:3000'+image[0].image_path;
    },
    optionOf(item_no){
      let option = this.option.filter((each) => {
        return each.item_no == item_no;
      });
      if(option.length > 0){
        return option[0].product_name
      }
      return ''
    },
    optionPrice(item_no){
      let option = this.option.filter((each) => {
        return each.item_no == item_no;
      });
      if(option.length > 0){
        return option[0].product_price
      }
      return 0
    },
    sortOrder(order, slot) {
      //order by Status Desc
      var arr = ["in queue", "pending", "finished", "sold", "cancelled"];
      if (slot == "status_d") {
        order.sort((a, b) => {
          var aa, bb;
          //  weight: sold cancelled    finish pending in queue
          for (let i = 0; i < arr.length; i++) {
            if (a.order_status == arr[i]) {
              aa = i;
            }
            if (b.order_status == arr[i]) {
              bb = i;
            }
          }
          if (aa > bb) {
            return -1;
          }
          if (bb > aa) {
            return 1;
          }
          return 0;
        });
      }
      //order by Status Asc
      else if (slot == "status_a") {
        order.sort((a, b) => {
          var aa, bb;
          //  weight: sold cancelled    finish pending in queue
          for (let i = 0; i < arr.length; i++) {
            if (a.order_status == arr[i]) {
              aa = i;
            }
            if (b.order_status == arr[i]) {
              bb = i;
            }
          }
          if (aa > bb) {
            return 1;
          }
          if (bb > aa) {
            return -1;
          }
          return 0;
        });
      }
      //order by Date desc
      else if (slot == "date_d") {
        order.sort((a, b) => {
          if (a.order_datetime > b.order_datetime) {
            return -1;
          }
          if (b.order_datetime > a.order_datetime) {
            return 1;
          }
          return 0;
        });
      }
      //order by Date asc
      else if (slot == "date_a") {
        order.sort((a, b) => {
          if (a.order_datetime > b.order_datetime) {
            return 1;
          }
          if (b.order_datetime > a.order_datetime) {
            return -1;
          }
          return 0;
        });
      }
      return order;
    },
  },
  computed: {
    currentOrder() {
      let x = this.orders.filter((order) => {
        return order.order_id == this.selectedOrder;
      });

      return x[0];
    },
    currentOrderItem() {
      return this.orders_item.filter((item) => {
        return item.order_id == this.selectedOrder;
      });
    },
    totalPrice() {
      var toreturn = this.currentOrderItem.reduce((total, item) => {
        let option = 0
        for(let i =0;i<this.option.length;i++){
          if(item.item_no == this.option[i].item_no){
            option = this.option[i].product_price
          }
        }
        return total + (item.product_price * item.order_amount) + option;
      }, 0);
      if (
        this.currentOrder.pro_type != "free" &&
        this.currentOrder.pro_type != null
      ) {
        toreturn -= this.currentOrder.discount;
      }
      return toreturn;
    },
    inQueueOrder() {
      if (this.orders == null) {
        return;
      }
      let order = this.orders.filter((order) => {
        return order.order_status == "in queue";
      });
      return this.sortOrder(order, this.sortQueue);
    },
    pendingOrder() {
      if (this.orders == null) {
        return;
      }
      let order = this.orders.filter((order) => {
        return order.order_status == "pending";
      });
      return this.sortOrder(order, this.sortPending);
    },
    finishedOrder() {
      if (this.orders == null) {
        return;
      }
      let order = this.orders.filter((order) => {
        return order.order_status == "finished";
      });
      return this.sortOrder(order, this.sortFinish);
    },
  },
};
</script>

<style>
body {
  background-color: rgb(50, 119, 80);
  height: 100vh;
}
.blankstyle {
  min-height: 80vh;
}
</style>
