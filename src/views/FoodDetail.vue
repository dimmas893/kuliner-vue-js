<template>
  <NavbarComponent :updateKeranjang="keranjangs" />
  <div class="">
    <div class="container">
      <!-- breadcrumb -->
      <div class="row">
        <div class="col">
          <nav aria-label="breadcrumb">
            <ol class="breadcrumb">
              <li class="breadcrumb-item">
                <router-link to="/" class="text-dark">Home</router-link>
              </li>
              <li class="breadcrumb-item">
                <router-link to="/food" class="text-dark">Foods</router-link>
              </li>
              <li class="breadcrumb-item active" aria-current="page">
                Food Order
              </li>
            </ol>
          </nav>
        </div>
      </div>

      <div class="row">
        <div class="col-md-6">
          <img
            :src="product.gambar"
            class="img-fluid shadow"
            :alt="'Gambar ' + product.nama"
          />
        </div>
        <div class="col-md-6">
          <h2>
            <strong>{{ product.nama }}</strong>
          </h2>
          <hr />
          <h4>
            Harga :
            <strong>Rp. {{ product.harga }}</strong>
          </h4>
          <form class="mt-4" v-on:submit.prevent>
            <div class="form-group">
              <label for="jumlah_pemesanan">Jumlah Pesan</label>
              <input
                type="number"
                class="form-control"
                v-model="pesan.jumlah_pemesanan"
              />
            </div>
            <div class="form-group">
              <label for="keterangan">Keterangan</label>
              <textarea
                v-model="pesan.keterangan"
                class="form-control"
                placeholder="Keterangan spt : Pedes, Nasi Setengah .."
              ></textarea>
            </div>

            <button
              type="submit"
              class="btn btn-success mt-3"
              @click="pemesanan"
            >
              <i class="bi bi-cart"></i>Pesan
            </button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import NavbarComponent from "@/components/Navbar.vue";
export default {
  name: "FoodDetailView",
  components: {
    NavbarComponent,
  },
  data() {
    return {
      product: {},
      pesan: {},
    };
  },
  methods: {
    setProduct(data) {
      this.product = data;
    },
    pemesanan() {
      this.pesan.product_id = this.product.id;
      axios
        .post(
          "https://anandadimmasbudiarto.my.id/kuliner/api/keranjangs",
          this.pesan
        )
        .then((response) => {
          this.$router.push({ path: "/keranjang" });
          this.$toast.success(response.data.message, {
            type: "success",
            position: "top-right",
            duration: 3000,
            dismissible: true,
          });
        })
        .catch((error) => {
          if (error.response && error.response.status === 422) {
            // Respons dengan status error 422 (Unprocessable Entity) diterima dari server
            const validationErrors = error.response.data.errors;
            let errorMessage = "Terjadi kesalahan validasi:<br>";
            for (const field in validationErrors) {
              errorMessage += `- ${validationErrors[field].join(", ")}<br>`;
            }
            this.$toast.error(errorMessage, {
              type: "error",
              position: "top-right",
              duration: 3000,
              dismissible: true,
            });
          } else if (error.response) {
            // Respons dengan status error lainnya diterima dari server
            this.$toast.error(error.response.data.message, {
              type: "error",
              position: "top-right",
              duration: 3000,
              dismissible: true,
            });
          } else {
            // Terjadi kesalahan lainnya
            this.$toast.error("Terjadi kesalahan: " + error.message, {
              type: "error",
              position: "top-right",
              duration: 3000,
              dismissible: true,
            });
          }
        });
    },
  },
  mounted() {
    axios
      .get(
        "https://anandadimmasbudiarto.my.id/kuliner/api/products/" +
          this.$route.params.id
      )
      .then((response) => this.setProduct(response.data))
      .catch((error) => console.log(error));
  },
};
</script>
