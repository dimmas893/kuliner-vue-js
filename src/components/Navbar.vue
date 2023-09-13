<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-light fixed-top">
    <div class="container">
      <a class="navbar-brand" href="#">Kuliner</a>
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarSupportedContent"
        aria-controls="navbarSupporteFdContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
        @click="toggleNavbar"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div
        class="collapse navbar-collapse"
        :class="{ show: navbarOpen }"
        id="navbarSupportedContent"
      >
        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
          <li class="nav-item">
            <router-link to="/" class="nav-link" @click="closeNavbar"
              >Home</router-link
            >
          </li>
          <li class="nav-item">
            <router-link to="/food" class="nav-link" @click="closeNavbar"
              >Food</router-link
            >
          </li>
        </ul>
        <div class="navbar-nav ml-auto">
          <li class="nav-item">
            <router-link to="/keranjang" class="nav-link"
              >Keranjang<i class="bi bi-bag"></i>
              <span class="badge bg-success">{{
                updateKeranjang
                  ? updateKeranjang.length
                  : jumlah_pesanans.length
              }}</span>
            </router-link>
          </li>
          <li class="nav-item">
            <router-link
              :to="{ name: 'login' }"
              v-if="!loggedIn"
              class="nav-link"
              >login</router-link
            >
            <!-- Add a logout button for logged-in users -->
            <button
              @click="logout"
              v-if="loggedIn"
              class="btn btn-danger mx-2 my-2 my-sm-0"
            >
              LOGOUT
            </button>
          </li>
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
import axios from "axios";
export default {
  name: "NavbarComponent",
  data() {
    return {
      navbarOpen: false,
      loggedIn: null,
      jumlah_pesanans: [],
    };
  },
  props: ["updateKeranjang"],
  methods: {
    toggleNavbar() {
      this.navbarOpen = !this.navbarOpen;
    },
    setJumlah(data) {
      this.jumlah_pesanans = data;
    },
    closeNavbar() {
      this.navbarOpen = false;
    },
    getLoggedIn() {
      this.loggedIn = localStorage.getItem("loggedIn");
    },
    logout() {
      axios.get("http://localhost:8000/api/logout").then(() => {
        //remove localStorage
        localStorage.removeItem("loggedIn");

        //redirect
        return this.$router.push({ name: "login" });
      });
    },
  },
  watch: {
    $route: {
      immediate: true,
      handler() {
        this.getLoggedIn();
      },
    },
  },
  mounted() {
    axios
      .get(this.$api + "/keranjangs")
      .then((response) => this.setJumlah(response.data))
      .catch((error) => console.log(error));
  },
};
</script>
