import Vue from "vue";
import store from "./store/index";
import App from "./App.vue";
import vuetify from "./plugins/vuetify";
import "@babel/polyfill";
import "roboto-fontface/css/roboto/roboto-fontface.css";
import "@mdi/font/css/materialdesignicons.css";
import "animate.css";
import "./plugins/registerComponents";

Vue.config.productionTip = false;
Vue.config.devtools = true;

new Vue({
	vuetify,
	store,
	render: (h) => h(App),
}).$mount("#app");
