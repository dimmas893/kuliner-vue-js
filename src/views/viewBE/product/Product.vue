<template>
  <ProductComponentBE />
  <router-link to="/product-admin-create">create</router-link>
  <TableProduct :product="products" />
</template>

<script>
// import axios from "axios";
import ProductComponentBE from "@/components/componentBE/Navbar.vue";
import TableProduct from "@/components/componentBE/product/ProductTable.vue";

export default {
  name: "productAdmin",
  components: {
    ProductComponentBE,
    TableProduct,
  },
};
</script>

<style></style>
