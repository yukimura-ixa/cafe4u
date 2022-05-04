<template>
  <div>
    <section class="hero is-fullheight">
      <Splide
        class="is-fluid"
        :options="{
          cover: true,
          type: 'loop',
          heightRatio: 0.4,
          autoplay: true,
          arrows: false,
        }"
      >
        <SplideSlide>
          <img
            src="https://s.isanook.com/hm/0/rp/rc/w850h510/yatxacm1w0/aHR0cHM6Ly9zLmlzYW5vb2suY29tL2htLzAvdWQvNC8yNDY0Ny96YWtrYWhvbWUuanBn.jpg"
            alt="Sample 1"
          />
        </SplideSlide>
        <SplideSlide>
          <img
            src="https://www.forfur.com/img/I78/t_7768_15834695551067208599.jpg"
            alt="Sample 2"
          />
        </SplideSlide>
        <SplideSlide>
          <img
            src="https://thejourneymoment.com/wp-content/uploads/2019/12/cover-cafe-no-text.jpg"
            alt="Sample 2"
          />
        </SplideSlide>
      </Splide>
    </section>

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
import { Splide, SplideSlide } from "@splidejs/vue-splide";
import axios from "@/plugins/axios";
export default {
  name: "HomePage",
  props: ["user", "cart"],
  components: {
    Splide,
    SplideSlide,
  },
  mounted() {
    this.search();
  },
  data() {
    return {
      name: "Nook Nut Art",
      carousel_items: [],
      image: [],
      cafeType: [],
      filterType:'none',
      cafeArr:[]
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
        return "https://www.paiduaykan.com/travel/wp-content/uploads/2020/04/1-SON09231.jpg";
      }
      return image[0].image_path;
    },
  },
  computed: {
    cafeList() {
      if (this.filterType == "none") {
        return this.cafeArr;
      }

      return this.cafeArr.filter((cafe) => {
        return cafe.cafe_theme == this.filterType;
      });
    }
  }
};
</script>
<style>
section {
  background-color: rgb(78, 153, 110);
}
</style>

