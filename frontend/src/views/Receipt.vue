<template>
  <div class="container is-fluid mt-5">
    <div class="card">
      <div class="columns">
        <!-- receipt -->

        <div class="column">
          <p class="ml-5 title is-3">Receipt</p>
          <div class="ml-5 columns">
            <div class="column is-7">
              <div>Order#{{ order.order_id }}</div>
              <div>Cafe: {{ order.cafe_name }}</div>
              <div>Location: {{ order.cafe_location }}</div>
            </div>
            <div class="column is-5 has-text-right">
              <div>
                Date:
                {{ order.order_datetime.substring(0, 10) }}&nbsp;&nbsp;Time:
                {{ order.order_datetime.substring(11, 19) }}
              </div>
            </div>
          </div>
          <table
            class="
              table
              has-background-white-ter
              is-striped is-hoverable
              m-auto
            "
          >
            <thead class="has-background-white-ter">
              <tr>
                <th>#</th>
                <th>Product</th>
                <th>Price</th>
                <th>Quantity</th>
                <th>Total</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(item, index) in order_item" :key="item.item_no">
                <td style="vertical-align: middle">{{ index + 1 }}</td>
                <td style="vertical-align: middle">
                  <div class="list-item">
                    <div class="list-item-image">
                      <figure class="image is-64x64">
                        <img :src="showImage(item.product_id)" />
                      </figure>
                    </div>

                    <div class="list-item-content">
                      <div class="list-item-title">{{ item.product_name }}</div>
                      <div
                        class="list-item-description"
                        v-if="optionOf(item.item_no) != ''"
                      >
                        Option: {{ optionOf(item.item_no) }}
                      </div>
                    </div>
                  </div>
                </td>
                <td style="vertical-align: middle">{{ item.product_price }}</td>
                <td style="vertical-align: middle">{{ item.order_amount }}</td>
                <td style="vertical-align: middle">
                  {{ item.item_totalprice }}
                  <span v-if="optionOf(item.item_no) != ''"
                    >+ ({{ optionPrice(item.item_no) }})</span
                  >
                </td>
              </tr>

              <tr v-if="order.pro_type == 'free'">
                <td style="vertical-align: middle">
                  {{ order_item.length + 1 }}
                </td>
                <td style="vertical-align: middle">
                  <div class="list-item">
                    <div class="list-item-image">
                      <figure class="image is-64x64">
                        <img :src="showImage(order.product_id)" />
                      </figure>
                    </div>
                    <div class="list-item-content">
                      <div class="list-item-title">
                        (PROMOTION){{ order.product_name }}
                      </div>
                      <div class="list-item-description"></div>
                    </div>
                  </div>
                </td>
                <td style="vertical-align: middle">FREE</td>
                <td style="vertical-align: middle">1</td>
                <td style="vertical-align: middle">FREE</td>
              </tr>

              <tr v-if="order.pro_type != 'free' && order.pro_type != null">
                <td style="vertical-align: middle">
                  {{ order_item.length + 1 }}
                </td>
                <td style="vertical-align: middle">
                  <div class="list-item">
                    <div class="list-item-content">
                      <div class="list-item-title">
                        (PROMOTION){{ order.pro_detail }}
                      </div>
                    </div>
                  </div>
                </td>
                <td style="vertical-align: middle"></td>
                <td style="vertical-align: middle"></td>
                <td style="vertical-align: middle">-{{ order.discount }}</td>
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
          <p class="ml-5 mt-5">Promotion Used: {{ order.pro_detail }}</p>
        </div>

        <div class="column">
          EEE
          <!-- MAP HERE -->
        </div>
      </div>
      <footer class="card-footer">
        <p class="card-footer-item">
          <span> to Menu </span>
        </p>
        <p class="card-footer-item">
          <span> to OrderHistory </span>
        </p>
      </footer>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "ReceiptPage",
  data() {
    return {
      orderid: 13,
      order: [],
      order_item: [],
      images: [],
      option: [],
    };
  },
  created() {
    this.getOrder();
  },
  methods: {
    getOrder() {
      axios
        .get(`http://localhost:3000/order/${this.orderid}`)
        .then((response) => {
          console.log(response);
          this.order = response.data.order[0];
          this.order_item = response.data.order_item;
          this.images = response.data.image;
          this.option = response.data.option;
        })
        .catch((error) => {
          this.error = error.response.data.message;
        });
    },
    showImage(product_id) {
      let image = this.images.filter((each) => {
        return each.product_id == product_id;
      });
      if (image[0] == null) {
        return "https://via.placeholder.com/128x128.png?text=Image";
      }
      return image[0].image_path;
    },
    optionOf(item_no) {
      let option = this.option.filter((each) => {
        return each.item_no == item_no;
      });
      if (option.length > 0) {
        return option[0].product_name;
      }
      return "";
    },
    optionPrice(item_no) {
      let option = this.option.filter((each) => {
        return each.item_no == item_no;
      });
      if (option.length > 0) {
        return option[0].product_price;
      }
      return 0;
    },
  },
  computed: {
    totalPrice() {
      var toreturn = this.order_item.reduce((total, item) => {
        let option = 0
        for(let i =0;i<this.option.length;i++){
          if(item.item_no == this.option[i].item_no){
            option = this.option[i].product_price
          }
        }
        return total + (item.product_price * item.order_amount) + option;
      }, 0);

      if (this.order.pro_type != "free" && this.order.pro_type != null) {
        toreturn -= this.order.discount;
      }
      return toreturn;
    },
  },
};
</script>

<style>
body {
  background-color: rgb(50, 119, 80);
  height: 100vh;
}
</style>
