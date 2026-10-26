<template>
  <div id="signup" class="container-fluid py-5" style="background-color: #f5f5f5">
    <div style="background-color: #ffffff" class="p-5 m-auto signup-form">
      <div class="text-center">
        <img src="../../assets/images/Logo.png" alt="Logo" />
        <h2 class="mt-4">Create your account</h2>
        <p>Enter your details to use all the app features.</p>
      </div>

      <form class="mt-3" @submit.prevent="register">
        <div class="row">
          <div class="col-md-6">
            <base-input type="text" identity="firstname" placeholder="Ex: Jack" label="Firstname" v-model="signupData.firstname" />
          </div>
          <div class="col-md-6">
            <base-input type="text" identity="lastname" placeholder="Ex: Smith" label="Lastname" v-model="signupData.lastname" />
          </div>
        </div>

        <div class="my-4">
          <base-input type="text" identity="username" placeholder="Ex: jacksmith" label="Username" v-model="signupData.username" />
        </div>
        <div class="my-4">
          <base-input type="email" identity="email" placeholder="Ex: jack@mail.com" label="Email" v-model="signupData.email" />
        </div>

        <div class="my-4">
          <base-input type="password" identity="password" placeholder="Enter password" label="Password" v-model="signupData.password" @keyInput="passwordCheck" />
          <p v-if="passwordError" class="text-danger mt-1 mb-0" style="font-size: 12px">The password field must be at least 8 characters</p>
        </div>

        <div class="my-4">
          <base-input type="password" identity="confirm-password" placeholder="Same with password" label="Confirm Password" v-model="signupData.confirmationPassword" @keyInput="confirmPasswordCheck" />
          <p class="text-danger mt-1 mb-0 fw-medium" style="font-size: 11px" :style="{ display: confirmPasswordDoesNotMacth }">The password confirmation does not match</p>
          <p class="text-success mt-1 mb-0 fw-medium" style="font-size: 11px" :style="{ display: confirmPasswordMacth }">The password confirmation does match</p>
        </div>

        <!-- Foto profil -->
        <div class="my-4">
          <base-input type="file" identity="recipeImage" label="Profile Photo" :is-image="true" @input="checkImage">
            <div style="width: 150px">
              <div class="border p-1 mt-2 rounded-circle">
                <img :src="signupData.imageLink" class="rounded-circle" width="140" height="150" style="object-fit: cover" />
              </div>
              <div class="text-center" style="transform: translateY(-24px)">
                <span class="d-inline-flex bg-white rounded-circle p-2" style="color: #212529">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M9 3 7.17 5H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-3.17L15 3H9zm3 15a5 5 0 1 1 0-10 5 5 0 0 1 0 10zm0-2a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" />
                  </svg>
                </span>
              </div>
            </div>
          </base-input>
        </div>

        <button type="submit" class="btn btn-primary w-100">Register</button>
      </form>

      <div class="text-center mt-4">
        <p class="fw-semibold">
          Already have account?
          <span style="color: #4c4ddc">
            <router-link to="/login" class="text-decoration-none">Login</router-link>
          </span>
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { reactive, ref } from "vue";
import BaseInput from "@/components/ui/BaseInput.vue";
import defaultProfile from "../../assets/images/Profile.png";
import { useStore } from "vuex";
import { useRouter } from "vue-router";

const store = useStore();
const router = useRouter();
const register = async () => {
  // Jalankan validasi pengecekan terlebih dahulu
  passwordCheck();
  confirmPasswordCheck();

  // Jika password error atau konfirmasi tidak cocok, hentikan proses
  if (passwordError.value || signupData.password !== signupData.confirmationPassword) {
    return;
  }

  try {
    await store.dispatch("auth/getRegisterData", signupData);
    router.push("/");
  } catch (err) {
    console.log(err);
  }
};

const signupData = reactive({
  firstname: "",
  lastname: "",
  username: "",
  email: "",
  password: "",
  confirmationPassword: "",
  isLogin: false,
  imageLink: "",
});

const passwordError = ref(false);
const imagePreview = ref(defaultProfile);
const confirmPasswordDoesNotMacth = ref("none");
const confirmPasswordMacth = ref("none");

const passwordCheck = () => {
  passwordError.value = signupData.password.length < 8;
  if (signupData.confirmationPassword) confirmPasswordCheck();
};

const confirmPasswordCheck = () => {
  if (signupData.confirmationPassword === "") {
    confirmPasswordDoesNotMacth.value = "none";
    confirmPasswordMacth.value = "none";
    return;
  }
  if (signupData.password !== signupData.confirmationPassword) {
    confirmPasswordDoesNotMacth.value = "block";
    confirmPasswordMacth.value = "none";
    return;
  }
  confirmPasswordDoesNotMacth.value = "none";
  confirmPasswordMacth.value = "block";
};

const checkImage = (e) => {
  const file = e.target.files[0];
  const reader = new FileReader();
  reader.readAsDataURL(file);
  reader.addEventListener("load", () => {
    signupData.imageLink = reader.result;
  });
};

const handleSubmit = () => {
  passwordCheck();
  confirmPasswordCheck();
  if (passwordError.value || signupData.password !== signupData.confirmationPassword) return;
  // TODO: kirim signupData ke proses pendaftaran (Firebase)
};
</script>

<style scoped>
.signup-form {
  max-width: 540px;
}
</style>
