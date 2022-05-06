<template>
  <div>
    <section class="hero is-fullheight-with-navbar">
      <vue-flux
        :options="{ autoplay: true }"
        :images="vfImages"
        :transitions="['slide']"
        :size="{ width: 640, height: 360 }"
        ref="slider"
      >
        <template v-slot:preloader>
          <flux-preloader />
        </template>

        <template v-slot:controls>
          <flux-controls />
        </template>

        <template v-slot:pagination>
          <flux-pagination />
        </template>

        <template v-slot:index>
          <flux-index />
        </template>
      </vue-flux>
    </section>

    <br />
    <div class="container is-fluid mt-5 mb-6" v-if="isLoggedIn()">
      <div class="columns">
        <div class="card column is-2 is-offset-3">
          <router-link to="/addcafe"
            ><button class="button is-fullwidth">
              Go To Add New Cafe
            </button></router-link
          >
        </div>
        <div class="card column is-2 is-offset-2">
          <router-link to="/promotion"
            ><button class="button is-fullwidth">
              Go To Promotion
            </button></router-link
          >
        </div>
      </div>
    </div>
    <div class="container is-fluid mt-5 mb-6" v-else>
      <div class="columns">
        <div class="card column is-2 is-offset-5">
          <router-link to="/promotion"
            ><button class="button is-fullwidth">
              Go To Promotion
            </button></router-link
          >
        </div>
      </div>
    </div>
    <section>
      <div class="container is-fluid">
        <div class="columns is-multiline">
          <div class="column is-12 has-text-right">
            <span class="select is-primary">
              <select
                style="background-color: rgb(219, 255, 217)"
                v-model="filterType"
              >
                <option value="none">None</option>
                <option
                  :value="type.cafe_theme"
                  v-for="type in cafeType"
                  :key="type.cafe_theme"
                  class="is-capitalized"
                >
                  {{ type.cafe_theme }}
                </option>
              </select>
            </span>
          </div>
          <template v-for="cafe in cafeList">
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
                      <div class="tags">
                        <div class="tag is-capitalized">
                          {{ cafe.cafe_theme }}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div class="content">
                    {{ shortContent(cafe.cafe_desc) }}
                    <br />
                  </div>
                </div>

                <footer class="card-footer">
                  <router-link
                    class="card-footer-item"
                    :to="`/cafe/${cafe.cafe_branchid}`"
                    >ดูร้าน</router-link
                  >
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
import {
  VueFlux,
  FluxControls,
  FluxIndex,
  FluxPagination,
  FluxPreloader,
} from "vue-flux";

import axios from "@/plugins/axios";
export default {
  name: "HomePage",
  props: ["user", "cart"],
  components: {
    VueFlux,
    FluxControls,
    FluxIndex,
    FluxPagination,
    FluxPreloader,
  },
  mounted() {
    this.search();
  },
  data() {
    return {
      carousel_items: [],
      image: [],
      cafeType: [],
      filterType: "none",
      cafeArr: [],
    };
  },
  methods: {
    isLoggedIn(){
      if(!this.user) return false;
      // if(!this.user.user_type != 'employee') return false
      return this.user.user_type == 'admin'
    },
    shortContent(content) {
      if (content.length > 150) {
        return content.substring(0, 147) + "...";
      }
      return content;
    },
    search() {
      axios
        .get(`http://localhost:3000/search?like=`)
        .then((response) => {
          this.cafeArr = response.data.cafe;
          this.image = response.data.image;
          this.cafeType = response.data.type;
        })
        .catch((error) => {
          this.error = error.response.data.message;
        });
    },
    showImage(cafe_id) {
      let image = this.image.filter((each) => {
        return each.cafe_id == cafe_id;
      });
      if (image[0] == null) {
        return "https://bulma.io/images/placeholders/640x480.png";
      }
      return  'http://localhost:3000'+image[0].image_path;
    },
  },
  computed: {
    vfImages() {
      return this.image.map((ele) => {
        return 'http://localhost:3000'+ ele.image_path;
      });
    },
    cafeList() {
      if (this.filterType == "none") {
        return this.cafeArr;
      }

      return this.cafeArr.filter((cafe) => {
        return cafe.cafe_theme == this.filterType;
      });
    },
  },
};
</script>

