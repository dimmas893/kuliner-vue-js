<template>
  <div id="app">
    <div class="container">
      <div class="content-below-navbar">
        <router-view />
      </div>
    </div>
    <FooterComponent />
  </div>
</template>

<script>
import FooterComponent from "@/components/Footer.vue";

export default {
  name: "HomeView",
  components: {
    FooterComponent,
  },
};
</script>
<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
.content-below-navbar {
  margin-top: 30px; /* Sesuaikan dengan ketinggian navbar Anda */
  padding-top: 20px; /* Sesuaikan dengan kebutuhan Anda */
}
nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}
nav a.router-link-exact-active,
nav a.router-link-exact-active:visited {
  /* Setelah diklik, warna tetap hijau */
  color: #42b983;
}
</style>
