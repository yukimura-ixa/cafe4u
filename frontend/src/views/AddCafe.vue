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
                <input
                  v-model="$v.cafe_name.$model"
                  :class="{ 'is-danger': $v.cafe_name.$error }"
                  class="input"
                  type="text"
                />
              </div>
              <template v-if="$v.cafe_name.$error">
                <p class="help is-danger" v-if="!$v.cafe_name.required">
                  This field is required
                </p>
              </template>
            </div>

            <div class="field">
              <label class="label">Location</label>
              <div class="control">
                <input
                  v-model="$v.location.$model"
                  :class="{ 'is-danger': $v.location.$error }"
                  class="input"
                  type="text"
                />
              </div>
              <template v-if="$v.location.$error">
                <p class="help is-danger" v-if="!$v.location.required">
                  This field is required
                </p>
              </template>
            </div>

            <div class="field">
              <label class="label">Cafe Theme</label>
              <div class="control">
                <input
                  v-model="$v.cafe_theme.$model"
                  :class="{ 'is-danger': $v.cafe_theme.$error }"
                  class="input"
                  type="text"
                />
              </div>
              <template v-if="$v.cafe_theme.$error">
                <p class="help is-danger" v-if="!$v.cafe_theme.required">
                  This field is required
                </p>
              </template>
            </div>
            <div class="field">
              <label class="label">Theme Describe</label>
              <div class="control">
                <textarea
                  v-model="$v.cafe_desc.$model"
                  :class="{ 'is-danger': $v.cafe_desc.$error }"
                  class="textarea"
                  type="text"
                />
              </div>
              <template v-if="$v.cafe_desc.$error">
                <p class="help is-danger" v-if="!$v.cafe_desc.required">
                  This field is required
                </p>
              </template>
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
import { required } from "vuelidate/lib/validators";
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
  validations: {
    cafe_name: {
      required: required,
    },
    cafe_theme: {
      required: required,
    },
    cafe_desc: {
      required: required,
    },
    address: {
      required: required,
    },
  },
  methods: {
    submit() {
      this.$v.$touch();

      if (!this.$v.$invalid) {
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
      }
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
