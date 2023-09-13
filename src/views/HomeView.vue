<template>
  <NavbarComponent :updateKeranjang="keranjangs" />
  <div class="home">
    <div class="container">
      <Hero />
      <div class="row mt-5">
        <div class="col">
          <h2>
            Best
            <strong>Foods</strong>
          </h2>
        </div>
        <div class="col">
          <router-link to="/food" class="btn btn-success float-right">
            <i class="bi bi-eye-fill"></i> Lihat Semua
          </router-link>
        </div>
      </div>

      <div class="row mb-4">
        <div
          class="col-md-4 mt-4"
          v-for="product in products"
          :key="product.id"
        >
          <CardProduct :product="product" />
        </div>
      </div>

      <div class="text-center" v-if="products.length === 0">
        <b-spinner label="Loading..." type="grow" variant="success"></b-spinner>
      </div>
    </div>
  </div>
</template>

<script>
import Hero from "@/components/Hero.vue";
import axios from "axios";
import CardProduct from "@/components/CardProduct.vue";
import NavbarComponent from "@/components/Navbar.vue";
export default {
  name: "HomeView",
  components: {
    Hero,
    CardProduct,
    NavbarComponent,
  },
  data() {
    return {
      products: [],
    };
  },
  methods: {
    setProducts(data) {
      this.products = data;
    },
  },
  mounted() {
    axios
      .get(this.$api + "/best-products")
      .then((response) => {
        this.setProducts(response.data);
      })
      .catch((error) => {
        console.error("Gagal mengambil data:", error);
        // Tambahkan logika atau pesan kesalahan yang sesuai untuk pengguna
      });
  },
};
</script>
