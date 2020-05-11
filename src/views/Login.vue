<template>
  <v-row align="center" justify="center">
    <v-col cols="12" sm="8" md="4">
      <v-card class="elevation-12">
        <v-toolbar color="primary" dark flat>
          <v-toolbar-title>Login</v-toolbar-title>
        </v-toolbar>
        <v-card-text>
          <v-form
            @submit="submit"
            ref="form"
            v-model="valid"
            :lazy-validation="lazy"
          >
            <v-text-field
              v-model="email"
              :rules="emailRules"
              label="E-mail"
              required
              type="text"
              aria-autocomplete="email"
            ></v-text-field>

            <v-text-field
              v-model="password"
              :rules="passwordRules"
              label="Password"
              required
              type="password"
              aria-autocomplete="password"
            ></v-text-field>
            <v-spacer></v-spacer>
            <v-btn color="primary" type="submit">Login</v-btn>
          </v-form>
        </v-card-text>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
export default {
  data: () => ({
    valid: true,
    email: "",
    emailRules: [
      v => !!v || "E-mail is required",
      v => /.+@.+\..+/.test(v) || "E-mail must be valid"
    ],
    password: "",
    passwordRules: [
      v => !!v || "Password is required",
      v => (v && v.length <= 16) || "Password must be less than 16 characters"
    ],
    select: null,
    items: ["Item 1", "Item 2", "Item 3", "Item 4"],
    checkbox: false,
    lazy: false
  }),

  methods: {
    validate() {
      this.$refs.form.validate();
    },
    reset() {
      this.$refs.form.reset();
    },
    resetValidation() {
      this.$refs.form.resetValidation();
    },
    submit() {
      this.$store
        .dispatch("login", {
          email: this.email,
          password: this.password
        })
        .then(data => {
          console.log(data);
          this.$router.push("/Dashboard");
          this.$notify({
            group: "auth",
            title: "Success!",
            text: "You are now logged in as " + data.user.displayName,
            type: "success"
          });
        })
        .catch(err => {
          this.$notify({
            group: "auth",
            title: "Error",
            text: err.message,
            type: "error"
          });
        });
    }
  }
};
</script>
