import Vue from "vue";
import VueRouter from "vue-router";
import Dashboard from "../views/Dashboard.vue";
import Login from "../views/Login.vue";
import Register from "../views/Register.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    redirect: "/Dashboard"
  },
  {
    path: "/Login",
    name: "Login",
    component: Login
  },
  {
    path: "/Dashboard",
    name: "Dashboard",
    component: Dashboard
  },
  {
    path: "/Register",
    name: "Register",
    component: Register
  }
];

const router = new VueRouter({
  routes
});

export default router;

// component: () =>
//       import(/* webpackChunkName: "about" */ "../views/About.vue")
