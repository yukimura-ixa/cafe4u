<template>
  <div class="container is-fluid mt-5">
    <div class="columns is-centered">
      <div class="card is-5 column columns my-5" style="padding: 0">
        <div class="card-content column is-12 px-6 pt-6">
          <router-link :to="'/'" class="mr-1 has-text-info">
            <font-awesome-icon icon="fa-solid fa-angle-left" />
          </router-link>
          <h1 class="title is-3 has-text-centered">Add New Cafe</h1>
          <hr style="background-color: rgb(3, 51, 35)" />
          <div class="field">
            <div class="field">
              <label class="label">Cafe Name</label>
              <div class="control">
                <input v-model="cafe_name" class="input" type="text" />
              </div>
              <p class="help is-danger">***This field is required***</p>
            </div>

            <div class="field">
              <label class="label">Location</label>
              <div class="control">
                <input v-model="location" class="input" type="text" />
              </div>
              <p class="help is-danger">***This field is required***</p>
            </div>

            <div class="field">
              <label class="label">Cafe Theme</label>
              <div class="control">
                <input v-model="cafe_theme" class="input" type="text" />
              </div>
              <p class="help is-danger">***This field is required***</p>
            </div>
            <div class="field">
              <label class="label">Theme Describe</label>
              <div class="control">
                <textarea v-model="cafe_desc" class="textarea" type="text" />
              </div>
              <p class="help is-danger">***This field is required***</p>
            </div>

            <button
              class="button is-primary is-fullwidth"
              @click="submit(cafeId.length + 1)"
            >
              Add New Cafe
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "@/plugins/axios";
export default {
  name: "AddCafePage",
  props: ["user"],
  data() {
    return {
      cafeId: [],
      cafe_name: "",
      location: "",
      cafe_theme: "",
      cafe_desc: "",
    };
  },
  mounted() {
    this.getCafeId();
  },
  methods: {
    getCafeId() {
      axios
        .get("http://localhost:3000/cafe")
        .then((response) => {
          this.cafeId = response.data;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    submit(countId) {
      let data = {
        cafe_branchid: countId,
        cafe_name: this.cafe_name,
        cafe_theme: this.cafe_theme,
        cafe_desc: this.cafe_desc,
        cafe_location: this.location,
      };

      axios
        .post("http://localhost:3000/cafe/add", data)
        .then(() => {
          alert("Add Cafe Success");
          this.getCafeId();
          this.cafe_name = "";
          this.cafe_desc = "";
          this.location = "";
          this.cafe_theme = "";
        })
        .catch((err) => {
          alert(err.response.data.details.message);
        });
    },
  },
};
</script>

<style>
body {
  background-color: rgb(78, 153, 110);
  height: 100vh;
}
</style>
