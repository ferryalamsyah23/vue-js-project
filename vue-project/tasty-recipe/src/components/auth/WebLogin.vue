<template>
  <div class="container-fluid py-5" style="background-color: #f5f5f5">
    <div style="background-color: #ffffff" class="p-5 m-auto login-form">
      <div class="text-center">
        <img src="../../assets/images/Logo.png" alt="Logo" />
        <h2 class="mt-4">Log in to your account</h2>
        <p>Welcome back! Please enter your details.</p>
      </div>

      <form @submit.prevent="login">
        <div class="my-4">
          <label for="email" class="form-label fw-semibold"> Email <span class="text-danger">*</span> </label>
          <input id="email" v-model="loginData.email" type="email" class="form-control" placeholder="Your username" />
        </div>

        <div class="my-4">
          <label for="password" class="form-label fw-semibold"> Password <span class="text-danger">*</span> </label>
          <input id="password" v-model="loginData.password" type="password" class="form-control" placeholder="Your password" />
        </div>

        <p v-if="errorMessage" class="text-danger mb-2" style="font-size: 13px">
          {{ errorMessage }}
        </p>

        <button type="submit" class="btn w-100 text-white" style="background-color: #4c4ddc; border-radius: 50px" :disabled="loading">
          {{ loading ? "Loading..." : "Login" }}
        </button>
      </form>

      <div class="text-center mt-4">
        <p class="fw-semibold">
          Don't have an account?
          <router-link to="/signup" class="text-decoration-none">Signup</router-link>
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { reactive, ref } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";

const store = useStore();
const router = useRouter();

const loginData = reactive({ email: "", password: "" });
const errorMessage = ref("");
const loading = ref(false);

const login = async () => {
  errorMessage.value = "";

  if (!loginData.email || !loginData.password) {
    errorMessage.value = "Email dan password wajib diisi";
    return;
  }

  loading.value = true;
  try {
    await store.dispatch("auth/getLoginData", loginData);
    router.push("/");
  } catch (err) {
    errorMessage.value = "Email atau password salah";
  } finally {
    loading.value = false;
  }
};

</script>

<style scoped>
.login-form {
  max-width: 540px;
}
</style>
