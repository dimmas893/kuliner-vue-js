<template>
  <div>
    <NavbarComponent :updateKeranjang="keranjangs" />
    <div class="container">
      <div class="content-below-navbar">
        <div class="row mt-4">
          <div class="col">
            <h2>
              Daftar
              <strong>Makanan</strong>
            </h2>
          </div>
        </div>

        <div class="row mt-3">
          <div class="col">
            <div class="input-group mb-3">
              <input
                v-model="search"
                type="text"
                class="form-control"
                placeholder="Cari Makanan Kesukaan Anda .."
                aria-label="Cari"
                aria-describedby="basic-addon1"
                @keyup="searchFood"
              />

              <div class="input-group-prepend">
                <span class="input-group-text" id="basic-addon1">
                  <i class="bi bi-search"></i>
                </span>
              </div>
            </div>
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
        <div class="text-center" v-if="loading && products.length === 0">
          Loading...
        </div>
        <div class="text-center" v-if="!loading && products.length === 0">
          Data tidak ditemukan.
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import CardProduct from "@/components/componentFE/CardProduct.vue";
import axios from "axios";
import NavbarComponent from "@/components/componentFE/Navbar.vue";

export default {
  name: "FoodView",
  components: {
    CardProduct,
    NavbarComponent,
  },
  data() {
    return {
      products: [],
      search: "",
      loading: true, // Tambahkan properti loading
    };
  },
  methods: {
    setProducts(data) {
      this.products = data;
      this.loading = false; // Setelah data diterima, atur loading menjadi false
    },
    searchFood() {
      this.loading = true; // Ketika mencari, atur loading menjadi true
      axios
        .get(this.$api + "/api/products?search=" + this.search)
        .then((response) => this.setProducts(response.data))
        .catch((error) => console.log(error));
    },
  },
  mounted() {
    axios
      .get(this.$api + "/api/products")
      .then((response) => this.setProducts(response.data.data))
      .catch((error) => console.log(error));
  },
};
</script>
