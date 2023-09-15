<template>
  <NavbarComponent :updateKeranjang="keranjangs" />
  <div class="content-below-navbar">
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
                Keranjang
              </li>
            </ol>
          </nav>
        </div>
      </div>

      <div class="row">
        <div class="col">
          <h2>
            Keranjang
            <strong>Saya</strong>
          </h2>
          <div class="table-responsive mt-3">
            <table class="table">
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Foto</th>
                  <th scope="col">Makanan</th>
                  <th scope="col">Keterangan</th>
                  <th scope="col">Jumlah</th>
                  <th scope="col">Harga</th>
                  <th scope="col">Total Harga</th>
                  <th scope="col">Hapus</th>
                </tr>
              </thead>
              <tbody>
                <tr
                  v-for="(keranjang, index) in keranjangs"
                  :key="keranjang.id"
                >
                  <th>{{ index + 1 }}</th>
                  <td>
                    <img
                      :src="keranjang.products.gambar"
                      class="img-fluid shadow"
                      :alt="'Gambar ' + keranjang.products.gambar"
                      style="width: 100%; height: 50px"
                    />
                  </td>
                  <td>
                    <strong>{{ keranjang.products.nama }}</strong>
                  </td>
                  <td>
                    {{ keranjang.keterangan ? keranjang.keterangan : "-" }}
                  </td>
                  <td>{{ keranjang.jumlah_pemesanan }}</td>
                  <td align="right">Rp. {{ keranjang.products.harga }}</td>
                  <td align="right">
                    <strong
                      >Rp.
                      {{
                        keranjang.products.harga * keranjang.jumlah_pemesanan
                      }}</strong
                    >
                  </td>
                  <td align="center" class="text-danger">
                    <i
                      class="bi bi-trash"
                      @click="hapusKeranjang(keranjang.id)"
                      style="cursor: pointer"
                    ></i>
                  </td>
                </tr>

                <tr>
                  <td colspan="6" align="right">
                    <strong>Total Harga :</strong>
                  </td>
                  <td align="right">
                    <strong>Rp. {{ totalHarga }}</strong>
                  </td>
                  <td></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <!-- Form Checkout -->
      <div class="row justify-content-end">
        <div class="col-md-4">
          <form class="mt-4" v-on:submit.prevent>
            <div class="form-group">
              <label for="nama">Nama :</label>
              <input
                type="text"
                class="form-control"
                placeholder="Masukan nama pemesan"
                v-model="pesan.nama"
              />
            </div>
            <div class="form-group">
              <label for="noMeja">Nomor Meja :</label>
              <input
                type="text"
                placeholder="Masukan nomor meja"
                class="form-control"
                v-model="pesan.noMeja"
              />
            </div>

            <button
              type="submit"
              class="btn btn-success float-right mt-3"
              @click="checkout"
            >
              <div v-if="!loading">
                <!-- Tambahkan v-if="!loading" di sini -->
                <i class="bi bi-cart"></i>Pesan
              </div>
              <div v-else>
                <img
                  src="../../assets/loading.gif"
                  style="width: 50px; height: 30px"
                />
              </div>
            </button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import NavbarComponent from "@/components/componentFE/Navbar.vue";
import axios from "axios";
export default {
  name: "KeranjangView",
  components: {
    NavbarComponent,
  },
  data() {
    return {
      keranjangs: [],
      pesan: {},
      loading: false,
    };
  },
  methods: {
    setKeranjangs(data) {
      this.keranjangs = data;
    },
    hapusKeranjang(id) {
      axios
        .delete(this.$api + "/api/keranjangs/" + id)
        .then((response) => {
          // Tambahkan parameter response di sini
          this.$toast.error(response.data.message, {
            type: "error",
            position: "top-right",
            duration: 3000,
            dismissible: true,
          });

          // Update Data keranjang
          axios
            .get(this.$api + "/api/keranjangs")
            .then((response) => this.setKeranjangs(response.data))
            .catch((error) => console.log(error));
        })
        .catch((error) => console.log(error));
    },

    checkout() {
      this.loading = true; // Aktifkan loading
      this.pesan.keranjangs = this.keranjangs;
      axios
        .post(this.$api + "/api/pesanans", this.pesan)
        .then(() => {
          // Hapus Semua Keranjang
          this.keranjangs.map(function (item) {
            return axios
              .delete(this.$api + "/api/keranjangs/" + item.id)
              .catch((error) => console.log(error));
          });
          this.$router.push({ path: "/pesanan-sukses" });
          this.$toast.success("Sukses Dipesan", {
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
        })
        .finally(() => {
          this.loading = false; // Matikan loading setelah selesai
        });
    },
  },
  mounted() {
    axios
      .get(this.$api + "/api/keranjangs")
      .then((response) => this.setKeranjangs(response.data))
      .catch((error) => console.log(error));
  },
  computed: {
    totalHarga() {
      return this.keranjangs.reduce(function (items, data) {
        return items + data.products.harga * data.jumlah_pemesanan;
      }, 0);
    },
  },
};
</script>
