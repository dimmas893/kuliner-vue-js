<template>
  <ProductComponentBE />
  <div class="container">
    <form class="row g-3 mt-3" v-on:submit.prevent>
      <div class="col-md-6">
        <label class="form-label">Nama</label>
        <input
          type="text"
          placeholder="masukan nama"
          class="form-control"
          v-model="dataCreate.nama"
        />
      </div>
      <div class="col-md-6">
        <label class="form-label">Harga</label>
        <input
          type="number"
          placeholder="Masukan harga"
          class="form-control"
          v-model="dataCreate.harga"
        />
      </div>
      <div class="col-md-6">
        <label class="form-label">Ready</label>
        <select class="form-select" v-model="dataCreate.is_ready">
          <option selected disabled value="">Choose...</option>
          <option value="true">Ya</option>
          <option value="false">Tidak</option>
        </select>
      </div>
      <div class="col-md-6">
        <label class="form-label">Bestseller</label>
        <select class="form-select" v-model="dataCreate.bestseller">
          <option selected disabled value="">Choose...</option>
          <option value="true">Ya</option>
          <option value="false">Tidak</option>
        </select>
      </div>

      <div class="col-12">
        <label class="form-label">gambar</label>
        <input type="file" class="form-control" @change="previewImage" />

        <img
          v-if="previewImageUrl"
          :src="previewImageUrl"
          alt="Preview"
          style="max-width: 200px; max-height: 200px; margin-top: 10px"
        />
      </div>
      <div class="col-12">
        <button type="submit" class="btn btn-primary" @click="checkout">
          Simpan
        </button>
      </div>
    </form>
  </div>
</template>

<script>
import axios from "axios";
import ProductComponentBE from "@/components/componentBE/Navbar.vue";
export default {
  name: "productAdminCreateView",
  components: {
    ProductComponentBE,
  },
  data() {
    return {
      dataCreate: {
        nama: "", // Default kosong
        harga: "", // Default kosong
        is_ready: "", // Default kosong
        bestseller: "", // Default kosong
        gambar: "", // Default kosong
      },
      selectedImage: null,
      previewImageUrl: null,
      // Data lainnya...
    };
  },
  methods: {
    previewImage(event) {
      // Dapatkan file yang dipilih dari event
      const selectedFile = event.target.files[0];

      if (selectedFile) {
        const reader = new FileReader();

        reader.onload = (e) => {
          this.previewImageUrl = e.target.result;
          this.selectedImage = selectedFile; // Simpan file yang dipilih
        };

        reader.readAsDataURL(selectedFile);
      } else {
        this.previewImageUrl = null;
        this.selectedImage = null; // Hapus file yang dipilih jika tidak ada yang dipilih
      }
    },
    checkout() {
      // Buat objek FormData untuk mengirim data formulir dan gambar
      const formData = new FormData();
      formData.append("nama", this.dataCreate.nama);
      formData.append("harga", this.dataCreate.harga);
      formData.append("is_ready", this.dataCreate.is_ready);
      formData.append("bestseller", this.dataCreate.bestseller);
      formData.append("gambar", this.selectedImage); // Menggunakan selectedImage yang telah diambil dari input file

      axios
        .post(this.$api + "/api/products", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then(() => {
          // Hapus Semua Keranjang
          this.$router.push({ path: "/product-admin" });
          this.$toast.success("Sukses Dipesan", {
            type: "success",
            position: "top-right",
            duration: 3000,
            dismissible: true,
          });
        })
        .catch((error) => {
          console.error("Error:", error);
          this.$toast.error("Gagal menyimpan data", {
            type: "error",
            position: "top-right",
            duration: 3000,
            dismissible: true,
          });
        });
    },
  },
};
</script>

<style></style>
