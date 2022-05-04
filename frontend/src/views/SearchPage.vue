<template>
  <div>
    <div class="columns">
      <div class="column is-4">
        <h1 class="title">ผลการค้นหาคำว่า {{ searchCafe[0] }}</h1>
      </div>
      <div class="column is-offset-3 is-4 has-text-right">
        <span class="select is-primary">
          <select
            style="background-color: rgb(219, 255, 217)"
            v-model="filterType"
          >
            <option value="none">None</option>
            <option
              :value="type.cafe_theme"
              v-for="type in searchCafe[3]"
              :key="type.cafe_theme"
              class="is-capitalized"
            >
              {{ type.cafe_theme }}
            </option>
          </select>
        </span>
      </div>
    </div>

    <section>
      <div class="container is-fluid">
        <div class="columns is-multiline">
          <template v-for="cafe in searchList">
            <div class="column is-one-quarter" :key="cafe.cafe_branchid">
              <div class="card">
                <div class="card-image">
                  <figure class="image is-4by3">
                    <img
                      :src="showImage(cafe.cafe_branchid)"
                      alt="Placeholder image"
                    />
                  </figure>
                </div>
                <div class="card-content" style="min-height: 30vh">
                  <div class="media">
                    <div class="media-content">
                      <p class="title is-4">{{ cafe.cafe_name }}</p>
                      <p class="subtitle is-6">{{ cafe.cafe_theme }}</p>
                    </div>
                  </div>

                  <div class="content">
                    {{ shortContent(cafe.cafe_desc) }}
                    <br />
                  </div>
                </div>

                <footer class="card-footer">
                  <a href="#" class="card-footer-item">ดูร้าน</a>
                </footer>
              </div>
            </div>
          </template>
        </div>
      </div>
    </section>
  </div>
</template>
<script>
import axios from "axios";
export default {
  name: "SearchPage",
  props: ["user", "cart", "searchCafe"],
  data() {
    return {
      filterType: "none",
    };
  },
  methods: {
    shortContent(content) {
      if (content.length > 150) {
        return content.substring(0, 147) + "...";
      }
      return content;
    },
    search() {
      axios
        .get(`http://localhost:3000/search?like=` + this.searchText)
        .then((response) => {
          this.searchResult = response.data.cafe;
        })
        .catch((error) => {
          this.error = error.response.data.message;
        });
    },
    showImage(cafe_id) {
      let image = this.searchImages.filter((each) => {
        return each.cafe_id == cafe_id;
      });
      if (image[0] == null) {
        return "https://www.paiduaykan.com/travel/wp-content/uploads/2020/04/1-SON09231.jpg";
      }
      return image[0].image_path;
    },
  },
  computed: {
    searchList() {
      if (this.filterType == "none") {
        return this.searchCafe[1];
      }

      return this.searchCafe[1].filter((cafe) => {
        return cafe.cafe_theme == this.filterType;
      });
    },
    searchImages() {
      return this.searchCafe[2];
    },
  },
};
</script>

<style>
section {
  background-color: rgb(78, 153, 110);
}
</style>