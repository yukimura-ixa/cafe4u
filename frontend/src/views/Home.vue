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
        <div class="columns is-multiline ">
          <template v-for="cafe in cafeList">
            <div class="column is-one-quarter" :key="cafe.id">
              <div class="card">
                <div class="card-image">
                  <figure class="image is-4by3">
                    <img :src="cafe.image" alt="Placeholder image" />
                  </figure>
                </div>
                <div class="card-content" style="min-height: 30vh;">
                  <div class="media">
                    <div class="media-content">
                      <p class="title is-4">{{ cafe.name }}</p>
                      <p class="subtitle is-6">{{ cafe.themes }}</p>
                    </div>
                  </div>

                  <div class="content">
                    {{ shortContent(cafe.desc) }}
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

export default {
  name: "HomePage",
  props: ["user", "cart"],
  components: {
    Splide,
    SplideSlide,
  },
  data() {
    return {
      name: "Nook Nut Art",
      carousel_items: [],
      cafeList: [
        {
          id: 1,
          name: "cafe",
          desc: "Lorem ipsum",
          themes: "cool, loft, nature",
          image:
            "https://www.paiduaykan.com/travel/wp-content/uploads/2020/04/1-SON09231.jpg",
        },
        {
          id: 2,
          name: "cafe",
          desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
          themes: "cool, loft, nature",
          image:
            "https://www.paiduaykan.com/travel/wp-content/uploads/2020/04/1-SON09231.jpg",
        },
        {
          id: 3,
          name: "cafe",
          desc: "Lorem ipsum",
          themes: "cool, loft, nature",
          image:
            "https://www.paiduaykan.com/travel/wp-content/uploads/2020/04/1-SON09231.jpg",
        },

        {
          id: 4,
          name: "cafe",
          desc: "Lorem ipsum",
          themes: "cool, loft, nature",
          image:
            "https://www.paiduaykan.com/travel/wp-content/uploads/2020/04/1-SON09231.jpg",
        },

        {
          id: 5,
          name: "cafe",
          desc: "Lorem ipsum",
          themes: "cool, loft, nature",
          image:
            "https://www.paiduaykan.com/travel/wp-content/uploads/2020/04/1-SON09231.jpg",
        },
      ],
    };
  },
  methods: {
    shortContent(content) {
      if (content.length > 150) {
        return content.substring(0, 147) + "...";
      }
      return content;
    },
  },
};
</script>
<style>
section{
  background-color: rgb(78, 153, 110);
}
</style>

