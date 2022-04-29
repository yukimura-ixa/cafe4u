<template>
  <div class="container is-fluid mt-5">
    <div class="columns is-centered">
      <div class="column is-4">
        <div class="card">
          <header class="card-header"  style="background-color:rgb(13, 56, 11)">
            <p class="card-header-title has-text-success-light">Pending Order</p>
          </header>
          <div class="card-content has-background-grey-lighter">
            <div class="content">

              <div class="card mb-5" v-for='order in orders' :key="order.order_id">
                <div class="card-content" style="padding: 0.9em;"  @click="selectedOrder = order.order_id">
                  <div class="content columns" >
                    <!-- <div class="column is-4">Order#2 &nbsp; <strong>(35 B)</strong></div>
                    <div class="column is-4 is-offset-4 has-text-right">2021-07-15 12:44:01<br>Cancled</div> -->
                    <div class="column is-4">Order#{{order.order_id}} &nbsp; <strong>({{order.order_totalprice}} B)</strong></div>
                    <div class="column is-4 is-offset-4 has-text-right">{{order.order_datetime}}<br>{{order.order_status}}</div>

                  </div>
                </div>
              </div>


            </div>
          </div>
          <header class="card-header"  style="background-color:rgb(13, 56, 11)">
            <p class="card-header-title has-text-success-light">Order History</p>
          </header>
          <div class="card-content has-background-grey-lighter">
            <div class="content"></div>
          </div>
        </div>
      </div>
      <div class="column is-8">
           <div class="card">
               
          <div class="card-content has-background-white">
               <div class="content">{{currentOrder[0]?currentOrder[0].order_id:'None'}}</div>
            <div class="content">

              <table class="table has-background-success-light is-striped is-hoverable">
                  <thead class="has-background-success">
                      <tr>
                          <th>#</th>
                          <th>Product Name</th>
                          <th>Product Price</th>
                          <th>Order Amount</th>
                          <th>TotalPrice</th>
                      </tr>
                  </thead>
                  <tbody>
                      <tr v-for="(item,index) in orders_item" :key="item.item_no">
                          <td>{{index+1}}</td>
                          <td>{{item.product_name}}</td>
                          <td>{{item.product_price}}</td>
                          <td>{{item.order_amount}}</td>
                          <td>{{item.item_totalprice}}</td>
                      </tr>
                      <tr>
                          <td></td>
                          <td></td>
                          <td></td>
                          <td></td>
                          <td>computed</td>
                      </tr>
                  </tbody>
              </table>


            </div>
          </div>
        </div>

      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "OrderHistory",
  data() {
    return {
      selectedOrder:-1,
      orders:[{order_id:1,order_datetime:'2021-07-15 12:44:01',order_totalprice:80,user_id:5,emp_id:1,cafe_branchid:3,pro_id:null,order_status:'pending'},
      {order_id:14,order_datetime:'2021-07-15 12:45:01',order_totalprice:10,user_id:5,emp_id:1,cafe_branchid:6,pro_id:null,order_status:'sold'}],
    //   when add db    return orders and order_item that join product
      orders_item:[{item_no:1,product_price:80,order_amount:1,item_totalprice:80,product_id:1,order_id:1,product_name:'Nitro',product_desc:'Nitrooo :D',product_type:'drink',product_status:'available',product_amount:45},
      {item_no:20,product_price:80,order_amount:2,item_totalprice:160,product_id:2,order_id:1,product_name:'Nitrox',product_desc:'NitroooX',product_type:'drink',product_status:'available',product_amount:60}]


    };
  },
  computed: {
        currentOrder() {
        let x =   this.orders.filter((order)=>{
                return order.order_id == this.selectedOrder
            })
      
        return x
          
        }
      }
};
</script>

<style>
body {
  background-color: rgb(50, 119, 80);
  height: 100vh;
}
</style>
