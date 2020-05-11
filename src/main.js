import Vue from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router";
import store from "./store";
import vuetify from "./plugins/vuetify";
import Notifications from "vue-notification";
import * as firebase from "firebase";

Vue.use(Notifications);

Vue.config.productionTip = false;

const firebaseConfig = {
  apiKey: process.env.apiKey,
  authDomain: "devhub-1f83a.firebaseapp.com",
  databaseURL: "https://devhub-1f83a.firebaseio.com",
  projectId: "devhub-1f83a",
  storageBucket: "devhub-1f83a.appspot.com",
  messagingSenderId: "102795335369",
  appId: "1:102795335369:web:ac02288be3586e12a19f18",
  measurementId: "G-Q20DMXW8B2"
};

firebase.initializeApp(firebaseConfig);

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount("#app");
