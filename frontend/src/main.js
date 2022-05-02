import Vue from "vue";
import App from "./App.vue";
import router from "./router";

import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { fab } from "@fortawesome/free-brands-svg-icons";
import { far } from "@fortawesome/free-regular-svg-icons";

import {
  FontAwesomeIcon,
  FontAwesomeLayers,
  FontAwesomeLayersText,
} from "@fortawesome/vue-fontawesome";

import "bulma-list/css/bulma-list.css";
import "bulma/css/bulma.css";
import "@splidejs/splide/dist/css/themes/splide-sea-green.min.css";

import Notifications from "vue-notification";

library.add(fas, fab, far);

Vue.component("font-awesome-icon", FontAwesomeIcon);
Vue.component("font-awesome-layers", FontAwesomeLayers);
Vue.component("font-awesome-layers-text", FontAwesomeLayersText);

Vue.use(Notifications);

Vue.config.productionTip = false;

new Vue({
  router,
  render: (h) => h(App),
}).$mount("#app");
