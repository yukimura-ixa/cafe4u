<template>
  <div class="container is-fluid mt-5">
    <div class="container is-fluid mt-5">
      <div class="card-content column is-3 is-offset-9">
        <div class="card title is-5">User Point:</div>
      </div>
    </div>
    <section>
      <div class="container is-fluid">
        <div class="columns is-multiline">
          <template v-for="cafe in cafeList">
            <div class="column is-one-quarter" :key="cafe.id">
              <div class="card">
                <div class="card-image">
                  <figure class="image is-4by3">
                    <img :src="cafe.image" alt="Placeholder image" />
                  </figure>
                </div>
                <div class="card-content" style="min-height: 30vh">
                  <div class="media">
                    <div class="media-content">
                      <p class="title is-4">{{ cafe.name }}</p>
                      <p class="subtitle is-6">{{ cafe.themes }}</p>
                    </div>
                  </div>

                  <div class="content">
                    {{ cafe.desc }}
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
export default {
  name: "PromotionPage",
  props: [],
  data() {
    return {
      name: "Nook",
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
  methods: {},
};
</script>
<style>
body {
  background-color: rgb(78, 153, 110);
  height: 300;
}
</style>

