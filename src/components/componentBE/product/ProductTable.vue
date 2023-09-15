<template>
  <div class="container">
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
    <div class="row">
      <div class="col-4">
        <!-- Dropdown filter untuk bestseller -->
        <select
          v-model="bestsellerFilter"
          @change="searchFood"
          class="form-control"
        >
          <option value="">---bestseller---</option>
          <option value="true">Bestseller</option>
          <option value="false">Bukan Bestseller</option>
        </select>
      </div>
      <div class="col-4">
        <select
          v-model="isReadyFilter"
          @change="searchFood"
          class="form-control"
        >
          <option value="">---ready barang---</option>
          <option value="true">Ready</option>
          <option value="false">Tidak Ready</option>
        </select>
      </div>

      <div class="col-4">
        <select v-model="perPage" @change="searchFood" class="form-control">
          <option value="">---per page---</option>
          <option value="10">10</option>
          <option value="20">20</option>
        </select>
      </div>
    </div>

    <table class="table">
      <thead>
        <tr>
          <th scope="col">No</th>
          <th scope="col">Nama</th>
          <th scope="col">Harga</th>
          <th scope="col">Bastseller</th>
          <th scope="col">Ready</th>
          <th scope="col">Gambar</th>
          <th scope="col">Action</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(productData, index) in products.data" :key="productData.id">
          <th scope="row">{{ calculateItemNumber(index) }}</th>
          <!-- Menggunakan calculateItemNumber untuk nomor urutan -->
          <td>{{ productData.nama }}</td>
          <td>{{ productData.harga }}</td>
          <td>{{ productData.bestseller }}</td>
          <td>{{ productData.is_ready }}</td>
          <td>
            <img
              :src="getProductImageUrl(productData.gambar)"
              class="card-img-top"
              alt="..."
              style="width: 50px; height: 50px"
            />
          </td>
          <td>
            <button
              @click="deleteProduct(productData.id)"
              class="btn btn-danger"
            >
              Delete
            </button>
          </td>
        </tr>
      </tbody>
    </table>
    <nav aria-label="Halaman">
      <ul class="pagination">
        <!-- Tombol Previous -->
        <li class="page-item" :class="{ disabled: !products.prev_page_url }">
          <a
            class="page-link"
            href="#"
            aria-label="Previous"
            @click="goToPage(products.current_page - 1)"
          >
            <span aria-hidden="true">&laquo;</span>
          </a>
        </li>

        <!-- Nomor Halaman -->
        <li
          v-for="pagination in getVisiblePages()"
          :key="pagination"
          class="page-item"
          :class="{ active: pagination === products.current_page }"
        >
          <a class="page-link" href="#" @click="goToPage(pagination)">{{
            pagination
          }}</a>
        </li>

        <!-- Tombol Next -->
        <li class="page-item" :class="{ disabled: !products.next_page_url }">
          <a
            class="page-link"
            href="#"
            aria-label="Next"
            @click="goToPage(products.current_page + 1)"
          >
            <span aria-hidden="true">&raquo;</span>
          </a>
        </li>
      </ul>

      <div class="text-center mt-3">
        Halaman {{ products.current_page }} dari {{ products.last_page }}
      </div>
    </nav>
  </div>
</template>

<script>
import axios from "axios";
import Swal from "sweetalert2/dist/sweetalert2.js";
import "sweetalert2/dist/sweetalert2.min.css";
export default {
  name: "productTable",
  props: ["product", "index"],
  data() {
    return {
      products: [], // Ubah ke array kosong
      search: "",
      currentPage: 1, // Tambahkan currentPage untuk melacak halaman saat ini
      selectOption: "",
      bestsellerFilter: "", // Filter bestseller
      isReadyFilter: "", // Filter is_ready
      perPage: 10,
      previousPage: 1,
    };
  },
  methods: {
    getProductImageUrl(gambar) {
      // Gantilah "URL_BASE" dengan URL dasar gambar yang Anda inginkan
      const URL_BASE = this.$api + "/assets/images/"; // Sesuaikan dengan URL dasar Anda
      // Gabungkan URL dasar dengan nama gambar dari respons API
      return URL_BASE + gambar;
    },
    setProducts(data) {
      this.products = data; // Perbarui seluruh array produk
    },
    searchFood() {
      // Your existing code for searching data here
      axios
        .get(
          this.$api +
            "/api/products?page=" +
            this.currentPage +
            "&search=" +
            this.search +
            "&bestseller=" +
            this.bestsellerFilter +
            "&is_ready=" +
            this.isReadyFilter +
            "&perPage=" +
            this.perPage
        )
        .then((response) => this.setProducts(response.data))
        .catch((error) => console.log(error));
    },
    goToPage(page) {
      // Memastikan page tidak kurang dari 1 dan tidak lebih dari last_page
      if (page >= 1 && page <= this.products.last_page) {
        this.currentPage = page;
        this.searchFood();
      }
    },

    calculateItemNumber(index) {
      // Menghitung nomor urutan item sesuai dengan halaman
      return (this.currentPage - 1) * this.products.per_page + index + 1;
    },
    getVisiblePages() {
      const total = this.products.last_page;
      const current = this.products.current_page;
      const maxVisiblePages = 5;

      // Menentukan halaman pertama yang akan ditampilkan
      let startPage = Math.max(current - Math.floor(maxVisiblePages / 2), 1);

      // Menentukan halaman terakhir yang akan ditampilkan
      let endPage = Math.min(startPage + maxVisiblePages - 1, total);

      // Pastikan tidak melewati batas
      if (endPage - startPage + 1 < maxVisiblePages) {
        startPage = Math.max(endPage - maxVisiblePages + 1, 1);
      }

      const pages = [];
      for (let i = startPage; i <= endPage; i++) {
        pages.push(i);
      }

      return pages;
    },
    deleteProduct(productId) {
      Swal.fire({
        title: "Konfirmasi",
        text: "Apakah Anda yakin ingin menghapus produk ini?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#d33",
        cancelButtonColor: "#3085d6",
        confirmButtonText: "Ya, Hapus",
        cancelButtonText: "Tidak",
      }).then((result) => {
        if (result.isConfirmed) {
          axios
            .delete(this.$api + "/api/products/" + productId)
            .then((response) => {
              if (response.status === 200) {
                this.$toast.success(response.data.message, {
                  type: "success",
                  position: "top-right",
                  duration: 3000,
                  dismissible: true,
                });
                // Refresh daftar produk setelah menghapus
                this.searchFood();
              } else {
                Swal.fire("Gagal!", "Gagal menghapus produk.", "error");
              }
            })
            .catch((error) => {
              console.error(error);
              Swal.fire(
                "Error!",
                "Terjadi kesalahan saat menghapus produk.",
                "error"
              );
            });
        }
      });
    },
  },

  mounted() {
    // Di dalam mounted, Anda akan mengambil data untuk halaman pertama secara default
    this.searchFood();
  },
};
</script>
