<template>
  <div class="container is-fluid mt-5">
    <div class="columns is-centered">
      <div class="column is-4">
        <div class="card">
          <header class="card-header"  style="background-color:rgb(13, 56, 11)">
            <p class="card-header-title has-text-success-light">Pending Order</p>
          </header>
          <div class="card-content has-background-grey-lighter">
            <div class="content" style="max-height: 40vh;overflow-y: auto;">

              <!-- Pending Order -->
              <div class="card mb-5" v-for='order in pendingOrder' :key="order.order_id">
                <div class="card-content" style="padding: 0.9em;"  @click="selectOrder(order)">
                  <div class="content columns" >
                    <div class="column is-4">Order#{{order.order_id}} &nbsp; <strong>({{order.order_totalprice}} B)</strong><br>
                    <span v-if="order.order_status=='finished'" class="box has-text-centered has-background-success has-text-light is-uppercase" style="padding:0.5em">{{order.order_status}}</span>
                      <span v-if="order.order_status=='pending'" class="box has-text-centered has-background-info has-text-light is-uppercase" style="padding:0.5em">{{order.order_status}}</span>
                      <span v-if="order.order_status=='in queue'" class="box has-text-centered has-background-warning has-text-black-ter  is-uppercase" style="padding:0.5em">{{order.order_status}}</span>

                    </div>
                    <div class="column is-4 is-offset-4 has-text-right">{{order.order_datetime}}<br>
                      <button class="button is-outlined is-danger" v-if="order.order_status=='in queue'" @click="cancelOrder($event,order)">Cancel</button>
                      
                    </div>

                  </div>
                </div>
              </div>




            </div>
          </div>
          <header class="card-header"  style="background-color:rgb(13, 56, 11)">
            <p class="card-header-title has-text-success-light">Order History</p>
          </header>
          <div class="card-content has-background-grey-lighter">
            <div class="content" style="max-height: 40vh;overflow-y: auto;">
                            <!-- History Order -->
              <div class="card mb-5" v-for='order in historyOrder' :key="order.order_id">
                <div class="card-content" style="padding: 0.9em;"  @click="selectOrder(order)">
                  <div class="content columns" >
                    <div class="column is-4">Order#{{order.order_id}} &nbsp; <strong>({{order.order_totalprice}} B)</strong><br>
                      <span v-if="order.order_status=='sold'" class="has-text-centered has-text-success is-uppercase" style="padding:0.5em;display:block">{{order.order_status}}</span>
                      <span v-if="order.order_status=='cancelled'" class="has-text-centered has-text-danger has-text-light is-uppercase" style="padding:0.5em;display:block">{{order.order_status}}</span>

                    </div>
                    <div class="column is-4 is-offset-4 has-text-right">{{order.order_datetime}}<br>
                    </div>

                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="column is-8">
           <div class="card" style="min-height: 80vh;">
               
          <div class="card-content has-background-white" v-if="currentOrder">
               <div class="content">
                 <div class="columns">
                <div class="column is-8">
                  <div>Order#{{currentOrder.order_id}}</div>
                  <div>Cafe: {{currentOrder.cafe_name}}</div>
                  <div>Location: {{currentOrder.cafe_location}}</div>
                  <div>By Employee: {{currentOrder.emp_id}}</div>
                  
                </div>
                <div class="column is-4 has-text-right">
                  <div>Date: {{currentOrder.order_datetime.split(' ')[0]}}&nbsp;&nbsp;Time: {{currentOrder.order_datetime.split(' ')[1]}}</div>
                  <div>

                    Status:
                    <span v-if="currentOrder.order_status=='finished'" class="box has-text-centered has-background-success has-text-light is-uppercase px-5" style="padding:0.5em;display:inline-block">{{currentOrder.order_status}}</span>
                    <span v-if="currentOrder.order_status=='pending'" class="box has-text-centered has-background-info has-text-light is-uppercase px-5" style="padding:0.5em;display:inline-block">{{currentOrder.order_status}}</span>
                    <span v-if="currentOrder.order_status=='in queue'" class="box has-text-centered has-background-warning has-text-black-ter  is-uppercase px-5" style="padding:0.5em;display:inline-block">{{currentOrder.order_status}}</span>
                    <span v-if="currentOrder.order_status=='sold'" class="has-text-centered has-text-success is-uppercase px-5" style="padding:0.5em;display:inline-block">{{currentOrder.order_status}}</span>
                    <span v-if="currentOrder.order_status=='cancelled'" class="has-text-centered has-text-danger has-text-light is-uppercase px-5" style="padding:0.5em;display:inline-block">{{currentOrder.order_status}}</span>
                  </div>
                </div>
                </div>
               </div>
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
                      <tr v-for="(item,index) in currentOrderItem" :key="item.item_no">
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
                          <td>{{totalPrice}}</td>
                      </tr>
                  </tbody>
              </table>
              <div v-if="currentOrder.pro_id">Promotion Used: {{currentOrder.pro_id}}</div>


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
      orders:[{order_id:1,order_datetime:'2021-07-15 12:44:01',order_totalprice:80,user_id:5,emp_id:1,cafe_branchid:3,pro_id:1,order_status:'pending',cafe_location:'215/3 หมู่4 ถนนเทพารักษ์ อ.บางเสาธง จ.สมทุรปราการ 10570 ',cafe_name:'Cafe1',cafe_desc:'11111111111',cafe_theme:'Cool'},
      {order_id:14,order_datetime:'2021-07-15 12:43:01',order_totalprice:10,user_id:5,emp_id:1,cafe_branchid:6,pro_id:null,order_status:'sold',cafe_location:'215/3 หมู่4 ถนนเทพารักษ์ อ.บางเสาธง จ.สมทุรปราการ 10570',cafe_name:'Cafe1',cafe_desc:'11111111111',cafe_theme:'Cool'},
      {order_id:15,order_datetime:'2021-07-15 12:42:01',order_totalprice:10,user_id:5,emp_id:1,cafe_branchid:6,pro_id:null,order_status:'in queue',cafe_location:'215/3 หมู่4 ถนนเทพารักษ์ อ.บางเสาธง จ.สมทุรปราการ 10570',cafe_name:'Cafe2',cafe_desc:'11111111111',cafe_theme:'Cool'},
      {order_id:12,order_datetime:'2021-07-15 12:41:01',order_totalprice:10,user_id:5,emp_id:1,cafe_branchid:6,pro_id:null,order_status:'finished',cafe_location:'215/3 หมู่4 ถนนเทพารักษ์ อ.บางเสาธง จ.สมทุรปราการ 10570',cafe_name:'Cafe3',cafe_desc:'11111111111',cafe_theme:'Cool'},
      {order_id:13,order_datetime:'2021-07-15 12:40:01',order_totalprice:10,user_id:5,emp_id:1,cafe_branchid:6,pro_id:null,order_status:'cancelled',cafe_location:'215/3 หมู่4 ถนนเทพารักษ์ อ.บางเสาธง จ.สมทุรปราการ 10570',cafe_name:'Cafe1',cafe_desc:'11111111111',cafe_theme:'Cool'}],
    //   when add db    orders join cafe join emp join promotion  maybe join user                        orders_item join product
      orders_item:[{item_no:1,product_price:80,order_amount:1,item_totalprice:80,product_id:1,order_id:1,product_name:'Nitro',product_desc:'Nitrooo :D',product_type:'drink',product_status:'available',product_amount:45},
      {item_no:20,product_price:80,order_amount:2,item_totalprice:160,product_id:2,order_id:1,product_name:'Nitrox',product_desc:'NitroooX',product_type:'drink',product_status:'available',product_amount:60}]


    };
  },
  computed: {
        currentOrder() {
        let x =   this.orders.filter((order)=>{
                return order.order_id == this.selectedOrder
            })
      
        return x[0]
          
        },
        currentOrderItem(){
          return this.orders_item.filter((item)=>{
                return item.order_id == this.selectedOrder
            })
        },
        totalPrice(){

          return this.currentOrderItem.reduce((total,item)=>{
                return total + (item.product_price * item.order_amount)
            },0)
        },
        pendingOrder(){
          return this.orders.filter((order)=>{
                return order.order_status == 'pending' || order.order_status == 'in queue' || order.order_status == 'finished'
            })
        },
        historyOrder(){
          return this.orders.filter((order)=>{
                return order.order_status != 'pending' && order.order_status != 'in queue' && order.order_status != 'finished'
            })
        }
  },
  methods:{
    selectOrder(order){
      this.selectedOrder = order.order_id
    },
    cancelOrder(e,order){
      e.stopPropagation()
      console.log(order)
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
