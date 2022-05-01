<template>
  <div>
    <section class="hero is-fullheight">
    <Splide class="is-fluid" :options="{ cover: true, type:'loop', heightRatio: 0.4, autoplay: true, arrows: false }">
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
  </div>
</template>


<script>
import { Splide, SplideSlide } from "@splidejs/vue-splide";

export default {
  name: "HomePage",
  components: {
    Splide,
    SplideSlide,
  },
  data() {
    return {
      name: "Nook Nut Art",
      carousel_items: [],
    };
  },
};
</script>

