<template>
  <div class="card shadow card-product">
    <img
      :src="product.gambar"
      class="card-img-top"
      alt="..."
      style="width: 100%; height: 300px"
    />
    <div class="card-body">
      <h5 class="card-title">{{ product.nama }}</h5>
      <p class="card-text">Harga : Rp. {{ product.harga }}</p>
      <router-link class="btn btn-success" :to="'/food/' + product.id"
        ><i class="bi bi-cart"></i> Pesan</router-link
      >
    </div>
  </div>
</template>

<script>
export default {
  name: "CardProduct",
  props: ["product"],
};
</script>

<style></style>
