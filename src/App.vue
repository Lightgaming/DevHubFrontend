<template>
  <v-app id="inspire" app color="primary">
    <v-navigation-drawer v-model="drawer" app clipped>
      <v-list dense>
        <router-link to="/Dahsboard">
          <v-list-item link>
            <v-list-item-action>
              <v-icon>dashboard</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title>Dashboard</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </router-link>
        <router-link to="/Login" v-if="!this.isLoggedIn">
          <v-list-item link>
            <v-list-item-action>
              <v-icon>face</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title>Login</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </router-link>
        <router-link to="/Register" v-if="!this.isLoggedIn">
          <v-list-item link>
            <v-list-item-action>
              <v-icon>face</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title>Register</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </router-link>
        <v-list-item link @click="logout" v-if="this.isLoggedIn">
          <v-list-item-action>
            <v-icon>exit_to_app</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Logout</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar app clipped-left>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
      <v-toolbar-title>DevHub</v-toolbar-title>
    </v-app-bar>

    <v-content>
      <v-container class="fill-height" fluid>
        <notifications group="auth" />
        <router-view></router-view>
      </v-container>
    </v-content>

    <v-footer app>
      <span>Florian Lotzz &copy; 2020</span>
    </v-footer>
  </v-app>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "App",
  props: {
    source: String
  },
  computed: mapState(["isLoggedIn"]),
  data: () => ({
    drawer: null
  }),
  created() {
    this.$vuetify.theme.dark = true;
  },
  methods: {
    logout() {
      this.$store.dispatch("logout").then(() => {
        this.$notify({
          group: "auth",
          title: "Success!",
          text: "You are now logged out",
          type: "success"
        });
      });
    }
  }
};
</script>
