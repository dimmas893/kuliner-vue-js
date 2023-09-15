<template>
  <div class="card shadow card-product">
    <img
      :src="getProductImageUrl(product.gambar)"
      class="card-img-top"
      alt="..."
      style="width: 100%; height: 300px"
    />
    <div class="card-body">
      <h5 class="card-title">{{ product.nama }}</h5>
      <p class="card-text" v-if="product">Harga : Rp. {{ product.harga }}</p>
      <router-link class="btn btn-success" :to="'/food/' + product.id">
        <i class="bi bi-cart"></i> Pesan
      </router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: "CardProduct",
  props: ["product"],
  methods: {
    getProductImageUrl(gambar) {
      console.log(gambar);
      // Gantilah "URL_BASE" dengan URL dasar gambar yang Anda inginkan
      const URL_BASE = this.$api + "/assets/images/"; // Sesuaikan dengan URL dasar Anda
      // Gabungkan URL dasar dengan nama gambar dari respons API
      return URL_BASE + gambar;
    },
  },
};
</script>

<style></style>
