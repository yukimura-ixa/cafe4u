<template>
  <div style="background-color: rgb(78, 153, 110)">
    <section class="hero">
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

    <section class="container">
      <div class="card mb-3">
        <div class="card-content">
          <div class="content">
            <template v-if="editCafeToggle">
              <div class="columns">
                <div class="column">
                  <div class="field">
                    <label class="label">ชื่อร้าน</label>
                    <div class="control">
                      <input
                        class="input"
                        type="text"
                        placeholder="Cafe Name"
                        v-model="editCafeName"
                      />
                    </div>
                  </div>
                </div>

                <div class="column">
                  <div class="field">
                    <label class="label">ธีมร้าน</label>
                    <div class="control">
                      <input
                        class="input"
                        type="text"
                        placeholder="Theme"
                        v-model="editCafeTheme"
                      />
                    </div>
                  </div>
                </div>

                

                <div class="column">
                  <div class="field">
                    <label class="label">ที่ตั้ง</label>
                    <div class="control">
                      <input
                        class="input"
                        type="text"
                        placeholder="Google Map Coordinate"
                        v-model="editCafeLoc"
                      />
                    </div>
                  </div>
                </div>
                
              </div>
              <div class="columns">
                <div class="column">
                  <div class="field">
                    <label class="label">รายละเอียด</label>
                    <div class="control">
                      <textarea
                        class="textarea"
                        placeholder="Detail"
                        v-model="editCafeDesc"
                      ></textarea>
                    </div>
                  </div>
                </div>
              </div>
            </template>
            <template v-else>
              <p class="title is-4">
                {{ cafe.cafe_name }}
                <span class="is-pulled-right"
                  ><span class="mx-2">{{ averageRating }}</span>
                  <font-awesome-icon icon="fa-solid fa-star"
                /></span>
              </p>
              <div class="tags">
                <span class="tag is-capitalized">{{ cafe.cafe_theme }}</span>
              </div>
              <div class="block">
                {{ cafe.cafe_desc }}
              </div>
            </template>
          </div>
        </div>
      </div>

      <div class="level">
        <div class="level-left">
          <div class="level-item">
            <div class="buttons are-large">
              <button class="button is-primary is-light is-outlined">
                <font-awesome-icon
                  icon="fa-solid fa-cart-shopping"
                />สั่งเมนูเลย
              </button>
              <button class="button is-link is-light is-outlined">
                <font-awesome-icon icon="fa-solid fa-map-location-dot" />
                ดูเส้นทางไปร้าน
              </button>
            </div>
          </div>
        </div>
        <div class="level-right" v-if="isEmployee">
          <div class="level-item">
            <button
              @click="editCafeToggle = true"
              class="button is-warning is-light is-right is-outlined is-large"
            >
              <font-awesome-icon icon="fa-regular fa-pen-to-square" />
              แก้ไขรายละเอียด
            </button>
          </div>
        </div>
      </div>

      <div class="card">
        <header class="card-header">
          <p class="card-header-title">รีวิว</p>
        </header>
        <div class="list">
          <div class="list-item">
            <div class="list-item-content">
              <div class="list-item-title">
                <div class="columns is-vcentered">
                  <div class="column is-half">
                    <input
                      class="input is-primary"
                      type="text"
                      v-model="newComment"
                      placeholder="เขียนรีวิวของคุณ"
                    />
                  </div>
                  <div class="column">
                    <div class="fa-2x">
                      <template>
                        <font-awesome-icon
                          v-show="newStar <= 1"
                          icon="fa-regular fa-star"
                          @click="(newStarClicked = true), (newStar = 1)"
                        />
                        <font-awesome-icon
                          v-show="newStar <= 2"
                          icon="fa-regular fa-star"
                          @click="(newStarClicked = true), (newStar = 2)"
                        />
                        <font-awesome-icon
                          v-show="newStar <= 3"
                          icon="fa-regular fa-star"
                          @click="(newStarClicked = true), (newStar = 3)"
                        />
                        <font-awesome-icon
                          v-show="newStar <= 4"
                          icon="fa-regular fa-star"
                          @click="(newStarClicked = true), (newStar = 4)"
                        />
                        <font-awesome-icon
                          v-show="newStar < 5"
                          icon="fa-regular fa-star"
                          @click="(newStarClicked = true), (newStar = 5)"
                        />
                      </template>
                      <span> {{ newStar }}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div class="list-item-controls">
              <div class="buttons is-right">
                <button class="button" @click="addComment()">
                  <span class="icon is-small">
                    <font-awesome-icon icon="fa-solid fa-plus" />
                  </span>
                  <span>Add</span>
                </button>
              </div>
            </div>
          </div>

          <div
            class="list-item"
            v-for="(review, index) in reviews"
            :key="review.id"
          >
            <div class="list-item-content">
              <div class="columns is-vcentered" v-if="index === editToggle">
                <div class="column is-half">
                  <input
                    class="input is-primary"
                    type="text"
                    v-model="editComment"
                    placeholder="แก้ไขรีวิวของคุณ"
                  />
                </div>
                <div class="column">
                  <div class="fa-2x">
                    <template>
                      <font-awesome-icon
                        v-show="newStar <= 1"
                        icon="fa-regular fa-star"
                        @click="(newStarClicked = true), (newStar = 1)"
                      />
                      <font-awesome-icon
                        v-show="newStar <= 2"
                        icon="fa-regular fa-star"
                        @click="(newStarClicked = true), (newStar = 2)"
                      />
                      <font-awesome-icon
                        v-show="newStar <= 3"
                        icon="fa-regular fa-star"
                        @click="(newStarClicked = true), (newStar = 3)"
                      />
                      <font-awesome-icon
                        v-show="newStar <= 4"
                        icon="fa-regular fa-star"
                        @click="(newStarClicked = true), (newStar = 4)"
                      />
                      <font-awesome-icon
                        v-show="newStar < 5"
                        icon="fa-regular fa-star"
                        @click="(newStarClicked = true), (newStar = 5)"
                      />
                    </template>
                    <span> {{ newStar }}</span>
                  </div>
                </div>
              </div>
              <template v-else>
                <div class="list-item-title">
                  <template v-for="star in review.rating">
                    <font-awesome-icon icon="fa-solid fa-star" :key="star" />
                  </template>
                  <template v-for="nostar in 5 - review.rating">
                    <font-awesome-icon
                      icon="fa-regular fa-star"
                      :key="nostar"
                    />
                  </template>
                </div>
                <div class="list-item-title">{{ review.comment }}</div>
                <div class="list-item-description">
                  {{ review.review_user }}
                </div>
                <div class="is-size-7 subtitle">
                  {{ review.datetime }}
                </div>
              </template>
            </div>

            <!-- v-if="isCommentOwner()" -->
            <div class="list-item-controls">
              <div class="buttons is-right">
                <template v-if="index === editToggle">
                  <button class="button">
                    <span class="icon is-small">
                      <font-awesome-icon icon="fa-regular fa-floppy-disk" />
                    </span>
                    <span>Save</span>
                  </button>

                  <button class="button">
                    <span class="icon is-small">
                      <font-awesome-icon icon="fa-solid fa-xmark" />
                    </span>
                    <span>ลบ</span>
                  </button>

                  <button
                    class="button"
                    @click="(editToggle = -1), (editComment = null)"
                  >
                    <span class="icon is-small">
                      <font-awesome-icon
                        icon="fa-solid fa-arrow-right-from-bracket"
                      />
                    </span>
                    <span>Cancel</span>
                  </button>
                </template>

                <button
                  class="button"
                  @click="
                    editToggle = index;
                    editComment = review.comment;
                  "
                >
                  <span class="icon is-small">
                    <font-awesome-icon icon="fa-regular fa-pen-to-square" />
                  </span>
                  <span>Edit</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import { Splide, SplideSlide } from "@splidejs/vue-splide";
import axios from "axios";

export default {
  name: "CafePage",
  props: ["user", "cart"],
  components: {
    Splide,
    SplideSlide,
  },
  data() {
    return {
      cafe: {},
      reviews: [],
      images: [],
      editToggle: -1,
      editComment: "",
      newComment: "",
      newStar: 0,
      newStarClicked: false,

      isEmployee: true,
      editCafeToggle: false,
      editCafeName: "",
      editCafeDesc: "",
      editCafeLoc: "",
      editCafeTheme: "",
    };
  },
  mounted() {
    this.getCafe(this.$route.params.id);
  },
  computed: {
    averageRating() {
      return (
        this.reviews.reduce((prev, next) => prev + next.rating, 0) /
        this.reviews.length
      ).toFixed(1);
    },
  },
  methods: {
    isCommentOwner() {
      //   if (!this.user) return false;
      //   if (this.user.role === "admin") return true;
      //   return comment.comment_by_id === this.user.id;
    },
    isCafeOwner() {},
    getCafe(cafe_id) {
      axios
        .get(`http://localhost:3000/cafe/${cafe_id}`)
        .then((res) => {
          this.cafe = res.data.cafe;
          this.reviews = res.data.reviews;
          this.images = res.data.images;
        })
        .catch((err) => {
          this.error = err.response.data.message;
        });
    },
    addComment() {
      this.reviews.push({
        id: this.reviews.length + 1,
        comment: this.newComment,
        rating: this.newStar,
        review_user: "this.user",
        datetime: new Date(),
      });
      this.newComment = "";
    },
  },
};
</script>