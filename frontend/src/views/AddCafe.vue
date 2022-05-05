<template>
  <div class="container is-fluid mt-5">
    <div class="columns is-centered">
      <div class="card is-5 column columns my-5" style="padding: 0">
        <div class="card-content column is-12 px-6 pt-6">
          <h1 class="title is-3 has-text-centered">Add New Cafe</h1>
          <hr style="background-color: rgb(3, 51, 35)" />
          <div class="field">
            <div class="field">
              <label class="label">Cafe Name</label>
              <div class="control">
                <input v-model="cafe_name" class="input" type="text" />
              </div>
            </div>

            <div class="field">
              <label class="label">Location</label>
              <div class="control">
                <input v-model="location" class="input" type="text" />
              </div>
            </div>

            <div class="field">
              <label class="label">Cafe Theme</label>
              <div class="control">
                <input v-model="cafe_theme" class="input" type="text" />
              </div>
            </div>
            <div class="field">
              <label class="label">Theme Describe</label>
              <div class="control">
                <textarea v-model="cafe_desc" class="textarea" type="text" />
              </div>
            </div>

            <div class="field">
              <label class="label">Cafe Picture</label>
              <input type="file" multiple accept="image/*" class="input-file" />
            </div>

            <button class="button is-primary is-fullwidth" @click="submit()">
              Add New Cafe
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "AddCafePage",
  data() {
    return {
      cafe_name: "",
      location: "",
      cafe_theme: "",
      cafe_desc: "",
    };
  },
  methods: {
    submit() {
      let data = {
        cafe_name: this.cafe_name,
        cafe_theme: this.cafe_theme,
        cafe_desc: this.cafe_desc,
        cafe_location: this.location,
      };

      axios
        .post("http://localhost:3000/cafe/add", data)
        .then(() => {
          alert("Add Cafe Success");
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
