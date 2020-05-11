import Vue from "vue";
import Vuex from "vuex";
import firebase from "firebase";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    status: "",
    user: {},
    isLoggedIn: false
  },
  mutations: {
    auth_request(state) {
      state.status = "loading";
    },
    auth_success(state, user) {
      state.status = "success";
      state.user = user;
      state.isLoggedIn = true;
    },
    auth_error(state) {
      state.status = "error";
      state.isLoggedIn = false;
    },
    logout(state) {
      state.status = "";
      state.isLoggedIn = false;
    }
  },
  actions: {
    login({ commit }, user) {
      return new Promise((resolve, reject) => {
        console.log(user);
        commit("auth_request");
        firebase
          .auth()
          .signInWithEmailAndPassword(user.email, user.password)
          .then(data => {
            commit("auth_success", user);
            resolve(data);
          })
          .catch(err => {
            commit("auth_error");

            this.error = err.message;
            reject(err);
          });
      });
    },
    register({ commit }, user) {
      return new Promise((resolve, reject) => {
        commit("auth_request");
        firebase
          .auth()
          .createUserWithEmailAndPassword(user.email, user.password)
          .then(data => {
            data.user
              .updateProfile({
                displayName: user.name
              })
              .then(() => {
                commit("auth_success", user);
                resolve(data);
              });
          })
          .catch(err => {
            commit("auth_error", err);
            reject(err);
          });
      });
    },
    logout({ commit }) {
      return new Promise(resolve => {
        commit("logout");
        firebase
          .auth()
          .signOut()
          .then(resolve());
      });
    }
  },
  getters: {
    isLoggedIn: state => state.isLoggedIn,
    authStatus: state => state.status
  }
});
