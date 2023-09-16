<template>
  <div class="container">
    <div class="row">
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
              @keyup="initializeDataTable"
            />

            <div class="input-group-prepend">
              <span class="input-group-text" id="basic-addon1">
                <i class="bi bi-search"></i>
              </span>
            </div>
          </div>
        </div>
      </div>
      <!-- Dropdown filter untuk bestseller -->
      <div class="col-4">
        <select
          v-model="bestsellerFilter"
          @change="initializeDataTable"
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
          @change="initializeDataTable"
          class="form-control"
        >
          <option value="">---ready barang---</option>
          <option value="true">Ready</option>
          <option value="false">Tidak Ready</option>
        </select>
      </div>
      <div class="col-4" id="myTable_length">
        <select
          v-model="itemperPagefilter"
          @change="initializeDataTable"
          class="form-control"
        >
          <option value="10" selected>10</option>
          <option value="20">20</option>
          <option value="30">30</option>
        </select>
      </div>
    </div>
    <table
      id="myTable"
      class="table table-striped table-bordered"
      style="width: 100%"
    >
      <thead>
        <tr>
          <th>ID</th>
          <th>Nama</th>
          <th>Harga</th>
          <th>Bestseller</th>
          <th>Ready</th>
          <th>Action</th>
        </tr>
      </thead>
    </table>
  </div>
</template>

<script>
import axios from "axios";
import Swal from "sweetalert2/dist/sweetalert2.js";
import "sweetalert2/dist/sweetalert2.min.css";
import $ from "jquery";
import "bootstrap/dist/css/bootstrap.css";
import "datatables.net-bs4";

export default {
  name: "productTable",
  props: ["product", "index"],
  data() {
    return {
      flickrData: {
        items: [],
      },
      products: [],
      bestsellerFilter: "",
      isReadyFilter: "",
      perPage: 10,
      loading: false,
      destroying: false,
      currentPage: 1,
      itemsPerPage: 0,
      search: "",
      itemperPagefilter: "10", // Default to 20 items per page
    };
  },
  methods: {
    getProductImageUrl(gambar) {
      const URL_BASE = this.$api + "/assets/images/";
      return URL_BASE + gambar;
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

                // After successful deletion, refresh the table on page 2
                this.initializeDataTable();
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
    initializeDataTable() {
      const self = this;
      // const currentEntriesFilter = self.itemperPagefilter;
      axios
        .get(
          this.$api +
            "/api/products?bestseller=" +
            this.bestsellerFilter +
            "&is_ready=" +
            this.isReadyFilter +
            "&search=" +
            this.search
        )
        .then((response) => {
          const table = $("#myTable").DataTable({
            destroy: true,
            paging: true,
            lengthChange: false,
            searching: false,
            order: [0, "asc"],
            data: response.data, // Use the response data here
            columns: [
              { data: "id" },
              { data: "nama" },
              { data: "harga" },
              { data: "bestseller" },
              { data: "is_ready" },
              {
                data: null,
                render: function (data, type, row) {
                  return `
              <button data-id="${row.id}" class="btn btn-danger btn-delete">Delete</button>
            `;
                },
              },
            ],
          });

          table.page.len(self.itemperPagefilter).draw();
          // Tambahkan event listener untuk event "draw.dt"
          table.on("draw.dt", function () {
            const pageInfo = table.page.info();
            const currentPage = pageInfo.page; // Halaman saat ini (indeks berbasis 0)
            const pageSize = table.page.len(); // Jumlah item per halaman

            let dataStart = currentPage * pageSize; // Indeks awal data pada halaman saat ini
            let dataEnd = dataStart + pageSize; // Indeks akhir data pada halaman saat ini

            // Jika ini halaman terakhir, hitung ulang dataEnd
            if (currentPage === pageInfo.pages - 1) {
              dataEnd = pageInfo.recordsTotal; // Total data dalam tabel
            }

            self.itemsPerPage = dataEnd - dataStart; // Set itemsPerPage dengan nilai yang sesuai
            self.currentPage = currentPage + 1; // Set currentPage dengan nilai yang sesuai
          });
          if (self.itemsPerPage === 1) {
            self.goToPage(self.currentPage - 1);
          } else {
            self.goToPage(self.currentPage);
          }
          $("#myTable").on("click", ".btn-delete", function () {
            const productId = $(this).data("id");
            self.deleteProduct(productId);
          });
        });
    },
    goToPage(page) {
      const table = $("#myTable").DataTable();
      table.page(page - 1).draw(false);
    },
  },

  mounted() {
    this.initializeDataTable();
    // Set the initial page to 3 (or any other page you want to start with)
  },
};
</script>
