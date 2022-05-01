<template>
  <div>
      <h1 class="title">ผลการค้นหาคำว่า </h1>
    <section>
      <div class="container is-fluid">
        <div class="columns is-multiline">
          <template v-for="cafe in searchList">
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
export default {
  name: "SearchPage",
  props: ["user", "cart"],
  data() {
    return {
      searchList: [
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