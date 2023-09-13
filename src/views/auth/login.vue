<template>
  <NavbarComponent />
  <section class="vh-100">
    <div class="container-fluid h-custom">
      <div class="row d-flex justify-content-center align-items-center h-100">
        <div class="col-md-9 col-lg-6 col-xl-5">
          <img
            src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp"
            class="img-fluid"
            alt="Sample image"
          />
          <h3>Selamat datang di Kuliner</h3>
        </div>
        <div class="col-md-8 col-lg-6 col-xl-4 offset-xl-1">
          <form @submit.prevent="login">
            <!-- Email input -->
            <div class="form-outline mb-4">
              <input
                type="email"
                v-model="user.email"
                class="form-control form-control-lg"
                placeholder="Masukan email"
              />
            </div>

            <!-- Password input -->
            <div class="form-outline mb-3">
              <input
                type="password"
                class="form-control form-control-lg"
                placeholder="Enter password"
                v-model="user.password"
              />
            </div>

            <div class="text-center text-lg-start mt-4 pt-2">
              <button
                type="submit"
                class="btn btn-primary btn-lg"
                style="padding-left: 2.5rem; padding-right: 2.5rem"
              >
                Login
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import axios from "axios";
import NavbarComponent from "@/components/Navbar.vue";

export default {
  name: "LoginPage",

  components: {
    NavbarComponent,
  },
  data() {
    return {
      //state loggedIn with localStorage
      loggedIn: localStorage.getItem("loggedIn"),
      //state token
      token: localStorage.getItem("token"),
      //state user
      user: {
        email: "admin@gmail.com",
        password: "password",
      },
      //state validation
      validation: [],
      //state login failed
      loginFailed: null,
    };
  },
  // mounted() {
  //   axios
  //     .get(this.$api + "/keranjangs")
  //     .then((response) => this.setKeranjangs(response.data))
  //     .catch((error) => console.log(error));
  // },
  methods: {
    login() {
      if (this.user.email && this.user.password) {
        axios
          .get("http://localhost:8000/sanctum/csrf-cookie")
          .then((response) => {
            //debug cookie
            console.log(response);

            axios
              .post("http://localhost:8000/api/login", {
                email: this.user.email,
                password: this.user.password,
              })
              .then((res) => {
                //debug user login
                console.log(res);

                if (res.data.success) {
                  //set localStorage
                  localStorage.setItem("loggedIn", true);

                  //set localStorage Token
                  localStorage.setItem("token", res.data.token);

                  //change state
                  this.loggedIn = true;

                  //redirect dashboard
                  return this.$router.push({ name: "dashboard" });
                } else {
                  //set state login failed
                  this.loginFailed = true;
                }
              })
              .catch((error) => {
                console.log(error);
              });
          });
      }

      this.validation = [];

      if (!this.user.email) {
        this.validation.email = true;
      }

      if (!this.user.password) {
        this.validation.password = true;
      }
    },
  },
};
</script>
<style>
.divider:after,
.divider:before {
  content: "";
  flex: 1;
  height: 1px;
  background: #eee;
}
.h-custom {
  height: calc(100% - 73px);
}
@media (max-width: 450px) {
  .h-custom {
    height: 80%;
  }
}
</style>
