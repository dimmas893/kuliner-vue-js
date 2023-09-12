<template>
  <div class="hero">
    <!-- Desktop -->
    <div class="d-none d-md-block">
      <div class="row mt-4">
        <div class="col-md-6">
          <div class="d-flex h-100">
            <div class="justify-content-center align-self-center">
              <h2>
                <strong>Delicious Food Menu,</strong>
                <br />in Your Gadget
              </h2>
              <p>Ayo segera pilih dan pesan makanan favorit Anda</p>
              <router-link class="btn btn-lg btn-success" to="/food">
                <i class="bi bi-arrow-right"></i>Pesan
              </router-link>
            </div>
          </div>
        </div>
        <div class="col-md-6">
          <img src="../assets/images/hero.png" />
        </div>
      </div>
    </div>

    <!-- Mobile -->
    <div class="d-sm-block d-md-none">
      <div class="row mt-4">
        <div class="col-md-6 mb-3">
          <img src="../assets/images/hero.png" style="width: 100%" />
          <!-- Tambahkan style di sini -->
        </div>
        <div class="col-md-6">
          <div class="d-flex h-100">
            <div class="justify-content-center align-self-center">
              <h2>
                <strong>Delicious Food Menu,</strong>
                <br />in Your Gadget
              </h2>
              <p>Ayo segera pilih dan pesan makanan favorit Anda</p>
              <button class="btn btn-lg btn-success">
                <router-link class="btn btn-lg btn-success" to="/food">
                  <i class="bi bi-arrow-right"></i>Pesan
                </router-link>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "HeroComponent",
};
</script>

<style></style>
