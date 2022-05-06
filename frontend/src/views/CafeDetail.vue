<template>
  <div style="background-color: rgb(78, 153, 110)">
    <section class="hero">
      <vue-flux
        :options="{ autoplay: true }"
        :images="vfImages"
        :transitions="['slide']"
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
                    <label class="label">ที่อยู่</label>
                    <div class="control">
                      <input
                        class="input"
                        type="text"
                        placeholder="Location"
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
                <router-link :to="'/'" class="mr-1 has-text-info">
                  <font-awesome-icon icon="fa-solid fa-angle-left" />
                </router-link>
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
              <router-link :to="`/cafe/${this.cafe.cafe_branchid}/product`">
                <button class="button is-primary is-light is-outlined">
                  <font-awesome-icon
                    icon="fa-solid fa-cart-shopping"
                  />สั่งเมนูเลย
                </button>
              </router-link>
              <router-link :to="`/cafe/${this.cafe.cafe_branchid}/map`">
                <button class="button is-link is-light is-outlined">
                  <font-awesome-icon icon="fa-solid fa-map-location-dot" />
                  ดูเส้นทางไปร้าน
                </button>
              </router-link>
            </div>
          </div>
        </div>
        <div class="level-right" v-if="isCafeEmployee(cafe)">
          <div class="level-item" v-if="!editCafeToggle">
            <button
              @click="editCafeInfo()"
              class="button is-warning is-light is-right is-outlined is-large"
            >
              <font-awesome-icon icon="fa-regular fa-pen-to-square" />
              แก้ไขรายละเอียด
            </button>
          </div>

          <div class="level-item" v-if="editCafeToggle">
            <button
              @click="openManageImg = true"
              class="button is-info is-light is-right is-outlined is-large"
            >
              <font-awesome-icon icon="fa-regular fa-image" />
              จัดการรูปภาพ
            </button>
          </div>

          <div class="level-item" v-if="editCafeToggle">
            <button
              @click="confirmUpdate()"
              class="button is-success is-light is-right is-outlined is-large"
            >
              <font-awesome-icon icon="fa-regular fa-floppy-disk" />
              บันทึก
            </button>
          </div>

          <div class="level-item" v-if="editCafeToggle">
            <button
              @click="editCafeToggle = false"
              class="button is-right is-outlined is-large"
            >
              <font-awesome-icon icon="fa-solid fa-xmark" />
              ยกเลิก
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
                      <font-awesome-icon
                        icon="fa-regular fa-star"
                        @click="newStar = 1"
                      />
                      <font-awesome-icon
                        icon="fa-regular fa-star"
                        @click="newStar = 2"
                      />
                      <font-awesome-icon
                        icon="fa-regular fa-star"
                        @click="newStar = 3"
                      />
                      <font-awesome-icon
                        icon="fa-regular fa-star"
                        @click="newStar = 4"
                      />
                      <font-awesome-icon
                        icon="fa-regular fa-star"
                        @click="newStar = 5"
                      />
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
                  <span>เพิ่มรีวิว</span>
                </button>
              </div>
            </div>
          </div>

          <div
            class="list-item"
            v-for="(review, index) in reviews"
            :key="review.review_id"
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
                    <font-awesome-icon
                      icon="fa-regular fa-star"
                      @click="editStar = 1"
                    />
                    <font-awesome-icon
                      icon="fa-regular fa-star"
                      @click="editStar = 2"
                    />
                    <font-awesome-icon
                      icon="fa-regular fa-star"
                      @click="editStar = 3"
                    />
                    <font-awesome-icon
                      icon="fa-regular fa-star"
                      @click="editStar = 4"
                    />
                    <font-awesome-icon
                      icon="fa-regular fa-star"
                      @click="editStar = 5"
                    />
                    <span> {{ editStar }}</span>
                  </div>
                </div>
              </div>
              <template v-else>
                <div class="list-item-title">
                  <template v-if="review.review_score > 0">
                    <template v-for="(star, index) in review.review_score">
                      <font-awesome-icon icon="fa-solid fa-star" :key="index" />
                    </template>
                    <template
                      v-for="(nostar, index) in 5 - review.review_score"
                    >
                      <font-awesome-icon
                        icon="fa-regular fa-star"
                        :key="index"
                      />
                    </template>
                  </template>
                </div>
                <div class="list-item-title">{{ review.review_comment }}</div>
                <div class="list-item-description">
                  {{ review.fname + " " + review.lname }}
                </div>
                <div class="is-size-7 subtitle">
                  {{ new Date(review.review_datetime).toLocaleString() }}
                </div>
              </template>
            </div>

            <div class="list-item-controls" v-if="isReviewOwner(review)">
              <div class="buttons is-right">
                <template v-if="index === editToggle">
                  <button @click="confirmUpdateReview(review)" class="button">
                    <span class="icon is-small">
                      <font-awesome-icon icon="fa-regular fa-floppy-disk" />
                    </span>
                    <span>บันทึก</span>
                  </button>

                  <button @click="deleteReview(review)" class="button">
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
                    <span>ยกเลิก</span>
                  </button>
                </template>

                <button
                  class="button"
                  v-if="editToggle == -1"
                  @click="
                    editToggle = index;
                    editComment = review.review_comment;
                    editStar = review.review_score;
                  "
                >
                  <span class="icon is-small">
                    <font-awesome-icon icon="fa-regular fa-pen-to-square" />
                  </span>
                  <span>แก้ไข</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <div
      class="modal"
      :class="{ 'is-active': openManageImg }"
      style="z-index: 100000"
    >
      <div @click="openManageImg = false" class="modal-background"></div>
      <div class="modal-card" style="width: 90%">
        <header class="modal-card-head">
          <p class="modal-card-title">จัดการรูปภาพ</p>
          <button
            @click="openManageImg = false"
            class="delete"
            aria-label="close"
          ></button>
        </header>
        <section class="modal-card-body">
          <div class="columns is-multiline">
            <div
              class="column is-4"
              v-for="(image, index) in images"
              :key="image.image_id"
            >
              <figure class="image is-5by3">
                <img :src="'http://localhost:3000' + image.image_path" />
              </figure>
              <div class="buttons mt-3 is-centered">
                <button @click="deleteImage(index)" class="button is-danger">
                  ลบรูป
                </button>
              </div>
            </div>
          </div>
        </section>

        <footer class="modal-card-foot">
          <div class="file">
            <label class="file-label">
              <input
                multiple
                class="file-input"
                type="file"
                @change="onFileChange"
              />
              <span class="file-cta">
                <span class="file-icon">
                  <font-awesome-icon icon="fa-solid fa-upload" />
                </span>
                <span class="file-label"> อัพโหลดรูป </span>
              </span>
            </label>
          </div>
        </footer>
      </div>
    </div>
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
// import axios from 'axios';

export default {
  name: "CafePage",
  props: ["user", "cart"],
  components: {
    VueFlux,
    FluxControls,
    FluxIndex,
    FluxPagination,
    FluxPreloader,
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

      editCafeToggle: false,
      editCafeName: "",
      editCafeDesc: "",
      editCafeLoc: "",
      editCafeTheme: "",
      openManageImg: false,
      editStar: 0,
    };
  },
  mounted() {
    this.getCafe(this.$route.params.id);
  },
  computed: {
    vfImages() {
      if (this.images.length > 0) {
        return this.images.map((ele) => {
          return "http://localhost:3000" + ele.image_path.replaceAll("\\", "/");
        });
      }
      return ["https://via.placeholder.com/1280x728.png?text=ImageNotFound"];
    },
    averageRating() {
      if (this.reviews.length > 0) {
        return (
          this.reviews.reduce((prev, next) => prev + next.review_score, 0) /
          this.reviews.length
        ).toFixed(1);
      }
      return 0;
    },
  },
  methods: {
    deleteReview(review) {
      if (confirm("ต้องการลบรีวิวนี้หรือไม่")) {
        axios
          .delete(`http://localhost:3000/cafe/review/${review.review_id}`)
          .then((res) => {
            console.log(res);
            this.editToggle = -1;
            this.$notify({ group: "app", text: "บันทึกการแก้ไขแล้ว" });
            this.$router.go();
          })
          .catch((err) => {
            this.error = err.response.data.message;
            this.$notify({ group: "danger", text: this.error });
          });
      }
    },
    confirmUpdateReview(review) {
      axios
        .put(`http://localhost:3000/cafe/review/${review.review_id}`, {
          comment: this.editComment,
          score: this.editStar,
        })
        .then((res) => {
          this.editToggle = -1;
          console.log(res);
          this.$notify({ group: "app", text: "บันทึกการแก้ไขแล้ว" });
          this.$router.go();
        })
        .catch((err) => {
          this.error = err.response.data.message;
          this.$notify({ group: "danger", text: this.error });
        });
    },
    confirmUpdate() {
      const data = {
        name: this.editCafeName,
        desc: this.editCafeDesc,
        location: this.editCafeLoc,
        theme: this.editCafeTheme,
      };
      axios
        .put(`http://localhost:3000/cafe/${this.cafe.cafe_branchid}`, data)
        .then(() => {
          this.cafe.cafe_name = this.editCafeName;
          this.cafe.cafe_desc = this.editCafeDesc;
          this.cafe.cafe_location = this.editCafeLoc;
          this.cafe.cafe_theme = this.editCafeTheme;
          this.editCafeToggle = false;
          this.$notify({ group: "app", text: "บันทึกการแก้ไขแล้ว" });
        })
        .catch((err) => {
          this.error = err.response.data.message;
          this.$notify({ group: "danger", text: this.error });
        });
    },
    editCafeInfo() {
      this.editCafeToggle = true;
      this.editCafeName = this.cafe.cafe_name;
      this.editCafeDesc = this.cafe.cafe_desc;
      this.editCafeLoc = this.cafe.cafe_location;
      this.editCafeTheme = this.cafe.cafe_theme;
    },
    isReviewOwner(review) {
      if (!this.user) return false;
      if (this.user.user_type === "admin") return true;
      return review.user_id === this.user.user_id;
    },
    isCafeEmployee(cafe) {
      if (!this.user) return false;
      if (this.user.user_type === "admin") return true;
      return (
        cafe.cafe_branchid === this.user.cafe_branchid &&
        this.user.user_type == "employee"
      );
    },
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
          this.$notify({ group: "danger", text: this.error });
        });
    },
    addComment() {
      let review = {
        comment: this.newComment,
        score: this.newStar,
      };

      axios
        .post(
          `http://localhost:3000/cafe/${this.cafe.cafe_branchid}/review`,
          review
        )
        .then(() => {
          this.$router.go();
          this.newComment = "";
          this.$notify({ group: "app", text: "เพิ่มรีวิวของคุณแล้ว" });
        })
        .catch((err) => {
          this.error = err.response.data.message;
          this.$notify({ group: "danger", text: this.error });
        });
    },
    onFileChange(e) {
      const file = e.target.files;
      console.log(file);
      let formData = new FormData();
      file.forEach((element) => {
        formData.append("cafeImage", element);
      });
      axios
        .post(
          `http://localhost:3000/image/${this.cafe.cafe_branchid}`,
          formData
        )
        // eslint-disable-next-line
        .then((res) => {
          this.$router.go();
          this.$notify({
            group: "app",
            text: `อัพโหลด ${file.length} รูปแล้ว`,
          });
        })
        .catch((err) => {
          this.error = err.response.data.message;
          this.$notify({ group: "danger", text: this.error });
        });
    },
    deleteImage(index) {
      if (confirm("คุณจะลบรูปนี้หรือใหม่")) {
        let delImg = this.images[index].image_id;
        axios
          .delete(`http://localhost:3000/image/${delImg}`)
          // eslint-disable-next-line
          .then((res) => {
            this.images.splice(index, 1);
            this.$notify({
              group: "app",
              text: `ลบรูปแล้ว`,
            });
          })
          .catch((err) => {
            this.error = err.response.data.message;
            this.$notify({ group: "danger", text: this.error });
          });
      }
    },
  },
};
</script>