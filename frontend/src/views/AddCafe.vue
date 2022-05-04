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
                <input class="input" type="text" />
              </div>
            </div>

            <div class="field">
              <label class="label">Location</label>
              <div class="control">
                <input class="input" type="text" />
              </div>
            </div>

            <div class="field">
              <label class="label">Cafe Theme</label>
              <div class="control">
                <input class="input" type="text" />
              </div>
            </div>
            <div class="field">
              <label class="label">Theme Describe</label>
              <div class="control">
                <textarea class="textarea" type="text" />
              </div>
            </div>

            <div class="field">
              <label class="label">Cafe Picture</label>
              <input
                type="file"
                multiple
                :name="uploadFieldName"
                accept="image/*"
                class="input-file"
              />
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
export default {
  name: "AddCafePage",
  data() {
    return {
      username: "",
      password: "",
      confirm_password: "",
      email: "",
      mobile: "",
      first_name: "",
      last_name: "",
      theme: "",
    };
  },
};
</script>

<style>
body {
  background-color: rgb(78, 153, 110);
  height: 100vh;
}
</style>
