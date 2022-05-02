<template>
  <div class="container is-fluid mt-5">
    <div class="columns is-centered">

      <!-- left element -->
      <div class="column is-4">
        <div class="card">
          <header class="card-header"  style="background-color:rgb(13, 56, 11)">
            <p class="card-header-title has-text-success-light">In-Queue Order</p>
            <div class="card-header-icon">
              <div class="control has-icons-left">
                <div class="select is-primary" >
                  <select style="background-color:rgb(219, 255, 217)" v-model="sortQueue">
                    <option value="date_d">Date DESC</option>
                    <option value="date_a">Date ASC</option>
                  </select>
                </div>
                <div class="icon is-left">
                  <font-awesome-icon icon="fa-solid fa-arrow-down-wide-short" class="has-text-black-ter"  />
                </div>
              </div>
              
            </div>
          </header>
          <div class="card-content has-background-grey-lighter">
            <div class="content" style="max-height: 40vh;overflow-y: auto;">

              <!-- In-Queue Order -->
              <div class="card mb-5" v-for='order in inQueueOrder' :key="order.order_id">
                <div class="card-content" style="padding: 0.9em;"  @click="selectOrder(order)">
                  <div class="content columns" >
                    <div class="column is-4">Order#{{order.order_id}} &nbsp; <strong>({{order.order_totalprice}} B)</strong><br>
                    <span v-if="order.order_status=='finished'" class="box has-text-centered has-background-success has-text-light is-uppercase" style="padding:0.5em">{{order.order_status}}</span>
                      <span v-if="order.order_status=='pending'" class="box has-text-centered has-background-info has-text-light is-uppercase" style="padding:0.5em">{{order.order_status}}</span>
                      <span v-if="order.order_status=='in queue'" class="box has-text-centered has-background-warning has-text-black-ter  is-uppercase" style="padding:0.5em">{{order.order_status}}</span>

                    </div>
                    <div class="column is-4 is-offset-4 has-text-right">{{order.order_datetime.substring(0,10)}} {{order.order_datetime.substring(11,19)}}<br>
                    <button class="button  is-info mr-2" v-if="order.order_status=='in queue'" @click="doOrder($event,order)">Do</button>
                      <button class="button is-outlined is-danger" v-if="order.order_status=='in queue'" @click="cancelOrder($event,order)">Cancel</button>
                      
                    </div>

                  </div>
                </div>
              </div>
            </div>
          </div>
          <header class="card-header"  style="background-color:rgb(13, 56, 11)">
            <p class="card-header-title has-text-success-light">Pending Order</p>
              <div class="card-header-icon">
              <div class="control has-icons-left">
                <div class="select is-primary" >
                  <select style="background-color:rgb(219, 255, 217)" v-model="sortPending">
                    <option value="date_d">Date DESC</option>
                    <option value="date_a">Date ASC</option>
                  </select>
                </div>
                <div class="icon is-left">
                  <font-awesome-icon icon="fa-solid fa-arrow-down-wide-short" class="has-text-black-ter"  />
                </div>
              </div>
              
            </div>
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
                    <div class="column is-4 is-offset-4 has-text-right">{{order.order_datetime.substring(0,10)}} {{order.order_datetime.substring(11,19)}}<br>
                    <button class="button is-success mr-2" v-if="order.order_status=='pending'" @click="finishOrder($event,order)">Finish</button>
                    <button class="button is-outlined is-danger" v-if="order.order_status=='pending'" @click="cancelOrder($event,order)">Cancel</button>
                    </div>

                  </div>
                </div>
              </div>
            </div>
          </div>
          <header class="card-header"  style="background-color:rgb(13, 56, 11)">
            <p class="card-header-title has-text-success-light">Finished Order</p>
            <div class="card-header-icon">
              <div class="control has-icons-left">
                <div class="select is-primary" >
                  <select style="background-color:rgb(219, 255, 217)" v-model="sortFinish">
                    <option value="date_d">Date DESC</option>
                    <option value="date_a">Date ASC</option>
                  </select>
                </div>
                <div class="icon is-left">
                  <font-awesome-icon icon="fa-solid fa-arrow-down-wide-short" class="has-text-black-ter"  />
                </div>
              </div>
              
            </div>
          </header>
          <div class="card-content has-background-grey-lighter">
            <div class="content" style="max-height: 40vh;overflow-y: auto;">

              <!-- Finished Order -->
              <div class="card mb-5" v-for='order in finishedOrder' :key="order.order_id">
                <div class="card-content" style="padding: 0.9em;"  @click="selectOrder(order)">
                  <div class="content columns" >
                    <div class="column is-4">Order#{{order.order_id}} &nbsp; <strong>({{order.order_totalprice}} B)</strong><br>
                    <span v-if="order.order_status=='finished'" class="box has-text-centered has-background-success has-text-light is-uppercase" style="padding:0.5em">{{order.order_status}}</span>
                      <span v-if="order.order_status=='pending'" class="box has-text-centered has-background-info has-text-light is-uppercase" style="padding:0.5em">{{order.order_status}}</span>
                      <span v-if="order.order_status=='in queue'" class="box has-text-centered has-background-warning has-text-black-ter  is-uppercase" style="padding:0.5em">{{order.order_status}}</span>

                    </div>
                    <div class="column is-4 is-offset-4 has-text-right">{{order.order_datetime.substring(0,10)}} {{order.order_datetime.substring(11,19)}}<br>
                      <button class="button is-outlined is-success mr-2" v-if="order.order_status=='finished'" @click="soldOrder($event,order)">Sold</button>
                      <button class="button is-outlined is-danger" v-if="order.order_status=='finished'" @click="cancelOrder($event,order)">Cancel</button>
                      
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
           <div class="card" :class="[!currentOrder?'blankstyle':'']">   
          <div class="card-content has-background-white" style="min-height: 80vh;" v-if="currentOrder">
               <div class="content">
                 <div class="columns">
                <div class="column is-8">
                  <div>Order#{{currentOrder.order_id}}</div>
                  <div>Cafe: {{currentOrder.cafe_name}}</div>
                  <div>Location: {{currentOrder.cafe_location}}</div>
                  <div>By Employee: {{currentOrder.fname}} {{currentOrder.lname}}</div>
                  
                </div>
                <div class="column is-4 has-text-right">
                  <div>Date: {{currentOrder.order_datetime.substring(0,10)}}&nbsp;&nbsp;Time: {{currentOrder.order_datetime.substring(11,19)}}</div>
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
              <div v-if="currentOrder.pro_id">Promotion Used: {{currentOrder.pro_detail}}</div>
              


            </div>
          </div>
          <footer class="card-footer p-5" v-if="currentOrder">
            <div class="ml-auto">
            <button class="button is-info mr-3" v-if="currentOrder.order_status=='in queue'" @click="doOrder($event,currentOrder)">Do</button>
            <button class="button is-success mr-3" v-if="currentOrder.order_status=='pending'" @click="finishOrder($event,currentOrder)">Finish</button>
            <button class="button is-outlined is-success mr-3" v-if="currentOrder.order_status=='finished'" @click="soldOrder($event,currentOrder)">Sold</button>
            <button class="button is-outlined is-danger" v-if="currentOrder.order_status!='cancelled' || currentOrder.order_status!='sold'" @click="cancelOrder($event,currentOrder)">Cancel</button>
            </div>
          </footer>
        </div>

      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: "ManageOrder",
  data() {
    return {
      selectedOrder:-1,
      user:{user_id:1},
      sortQueue:'date_a',
      sortPending:'date_a',
      sortFinish:'date_a',
    //   orders:[{order_id:1,order_datetime:'2021-07-15 12:44:01',order_totalprice:80,user_id:5,emp_id:1,cafe_branchid:3,pro_id:1,order_status:'pending',cafe_location:'215/3 หมู่4 ถนนเทพารักษ์ อ.บางเสาธง จ.สมทุรปราการ 10570 ',cafe_name:'Cafe1',cafe_desc:'11111111111',cafe_theme:'Cool'},
    //   {order_id:14,order_datetime:'2021-05-9 12:43:01',order_totalprice:10,user_id:5,emp_id:1,cafe_branchid:6,pro_id:null,order_status:'sold',cafe_location:'215/3 หมู่4 ถนนเทพารักษ์ อ.บางเสาธง จ.สมทุรปราการ 10570',cafe_name:'Cafe1',cafe_desc:'11111111111',cafe_theme:'Cool'},
    //   {order_id:15,order_datetime:'2021-04-10 12:42:01',order_totalprice:10,user_id:5,emp_id:1,cafe_branchid:6,pro_id:null,order_status:'in queue',cafe_location:'215/3 หมู่4 ถนนเทพารักษ์ อ.บางเสาธง จ.สมทุรปราการ 10570',cafe_name:'Cafe2',cafe_desc:'11111111111',cafe_theme:'Cool'},
    //   {order_id:111,order_datetime:'2021-03-11 12:44:01',order_totalprice:80,user_id:5,emp_id:1,cafe_branchid:3,pro_id:1,order_status:'pending',cafe_location:'215/3 หมู่4 ถนนเทพารักษ์ อ.บางเสาธง จ.สมทุรปราการ 10570 ',cafe_name:'Cafe1',cafe_desc:'11111111111',cafe_theme:'Cool'},
    //   {order_id:151,order_datetime:'2021-02-01 12:42:01',order_totalprice:10,user_id:5,emp_id:1,cafe_branchid:6,pro_id:null,order_status:'in queue',cafe_location:'215/3 หมู่4 ถนนเทพารักษ์ อ.บางเสาธง จ.สมทุรปราการ 10570',cafe_name:'Cafe2',cafe_desc:'11111111111',cafe_theme:'Cool'},
    //   {order_id:112,order_datetime:'2021-01-30 12:44:01',order_totalprice:80,user_id:5,emp_id:1,cafe_branchid:3,pro_id:1,order_status:'pending',cafe_location:'215/3 หมู่4 ถนนเทพารักษ์ อ.บางเสาธง จ.สมทุรปราการ 10570 ',cafe_name:'Cafe1',cafe_desc:'11111111111',cafe_theme:'Cool'},
      
    //   {order_id:12,order_datetime:'2021-07-13 12:41:01',order_totalprice:10,user_id:5,emp_id:1,cafe_branchid:6,pro_id:null,order_status:'finished',cafe_location:'215/3 หมู่4 ถนนเทพารักษ์ อ.บางเสาธง จ.สมทุรปราการ 10570',cafe_name:'Cafe3',cafe_desc:'11111111111',cafe_theme:'Cool'},
    //   {order_id:13,order_datetime:'2021-07-15 12:40:01',order_totalprice:10,user_id:5,emp_id:1,cafe_branchid:6,pro_id:null,order_status:'cancelled',cafe_location:'215/3 หมู่4 ถนนเทพารักษ์ อ.บางเสาธง จ.สมทุรปราการ 10570',cafe_name:'Cafe1',cafe_desc:'11111111111',cafe_theme:'Cool'}],
    // //   when add db    orders join cafe join emp join promotion  maybe join user                        orders_item join product
    //   orders_item:[{item_no:1,product_price:80,order_amount:1,item_totalprice:80,product_id:1,order_id:1,product_name:'Nitro',product_desc:'Nitrooo :D',product_type:'drink',product_status:'available',product_amount:45},
    //   {item_no:20,product_price:80,order_amount:2,item_totalprice:160,product_id:2,order_id:1,product_name:'Nitrox',product_desc:'NitroooX',product_type:'drink',product_status:'available',product_amount:60}]
    orders:null,
    orders_item:null


    };
  },
  created(){
    this.getOrder(this.$route.params.cafeId)
  },
  methods:{
    getOrder(cafe_id){
      axios
        .get(`http://localhost:3000/admin/orders/${cafe_id}`)
        .then((response) => {
          console.log(response)
          this.orders = response.data.orders;
          this.orders_item = response.data.order_item;
        })
        .catch((error) => {
          this.error = error.response.data.message;
        });
    },
    selectOrder(order){
      this.selectedOrder = order.order_id
    },
    cancelOrder(e,order){
      e.stopPropagation()
      if(!confirm('Are you sure to cancel Order#'+order.order_id)){return}
      axios
        .put(`http://localhost:3000/admin/orders/${order.order_id}`, {toStatus:'cancelled'})
        .then((response) => {
          let thisorder = this.orders.filter((order)=>{
                return order.order_id == response.data.newstatus[0].order_id
          })
          thisorder[0].order_status = response.data.newstatus[0].order_status;
        })
        .catch((error) => {
          this.error = error.response.data.message;
        });
    },
    doOrder(e,order){
      e.stopPropagation()
       axios
        .put(`http://localhost:3000/admin/orders/${order.order_id}`, {toStatus:'pending'})
        .then((response) => {
          let thisorder = this.orders.filter((order)=>{
                return order.order_id == response.data.newstatus[0].order_id
          })
          thisorder[0].order_status = response.data.newstatus[0].order_status;
        })
        .catch((error) => {
          this.error = error.response.data.message;
        });
    },
    finishOrder(e,order){
      e.stopPropagation()
      axios
        .put(`http://localhost:3000/admin/orders/${order.order_id}`, {toStatus:'finished'})
        .then((response) => {
          let thisorder = this.orders.filter((order)=>{
                return order.order_id == response.data.newstatus[0].order_id
          })
          thisorder[0].order_status = response.data.newstatus[0].order_status;
        })
        .catch((error) => {
          this.error = error.response.data.message;
        });
    },
    soldOrder(e,order){
      e.stopPropagation()
      if(!confirm('Are you sure that customer have received Order#'+order.order_id)){return}
      axios
        .put(`http://localhost:3000/admin/orders/${order.order_id}`, {toStatus:'sold'})
        .then((response) => {
          let thisorder = this.orders.filter((order)=>{
                return order.order_id == response.data.newstatus[0].order_id
          })
          thisorder[0].order_status = response.data.newstatus[0].order_status;
        })
        .catch((error) => {
          this.error = error.response.data.message;
        });
    },
    sortOrder(order, slot){
        //order by Status Desc
          var arr = ['in queue','pending','finished','sold','cancelled']
          if(slot == 'status_d'){
            order.sort((a,b)=>{
              var aa, bb
              //  weight: sold cancelled    finish pending in queue
              for (let i = 0; i < arr.length; i++) {
                if(a.order_status == arr[i]){aa = i}
                if(b.order_status == arr[i]){bb = i}
              }
              if(aa > bb){return -1}
              if(bb > aa){return 1}
              return 0
            })
          }
          //order by Status Asc
          else if(slot == 'status_a'){
            order.sort((a,b)=>{
              var aa, bb
              //  weight: sold cancelled    finish pending in queue
              for (let i = 0; i < arr.length; i++) {
                if(a.order_status == arr[i]){aa = i}
                if(b.order_status == arr[i]){bb = i}
              }
              if(aa > bb){return 1}
              if(bb > aa){return -1}
              return 0
            })
          }
          //order by Date desc
          else if(slot == 'date_d'){
            order.sort((a,b)=>{
              if(a.order_datetime > b.order_datetime){return -1}
              if(b.order_datetime > a.order_datetime){return 1}
              return 0
            })
          }
          //order by Date asc
          else if(slot == 'date_a'){
            order.sort((a,b)=>{
              if(a.order_datetime > b.order_datetime){return 1}
              if(b.order_datetime > a.order_datetime){return -1}
              return 0
            })
          }
          return order
    }
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
        inQueueOrder(){
          if(this.orders == null){return }
          let order = this.orders.filter((order)=>{
                return order.order_status == 'in queue'
            })
          return this.sortOrder(order, this.sortQueue)
        },
        pendingOrder(){
          if(this.orders == null){return }
          let order =this.orders.filter((order)=>{
                return order.order_status == 'pending'
          })
          return this.sortOrder(order, this.sortPending)
        },
        finishedOrder(){
          if(this.orders == null){return }
          let order =this.orders.filter((order)=>{
                return order.order_status == 'finished'
          })
          return this.sortOrder(order, this.sortFinish)
        }
  },
  
};
</script>

<style>
body {
  background-color: rgb(50, 119, 80);
  height: 100vh;
}
.blankstyle{
  min-height: 80vh;
}

</style>
