<template>
  <div class="header__signup col-8 col-sm-4 fw-semibold d-flex justify-content-evenly align-items-center text-decoration-none" style="text-align: right">
    <i class="fa-solid fa-user" style="color: #4c4ddc"></i>
    <ul class="navbar-nav">
      <li class="nav-item dropdown">
        <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown"> My Profile </a>
        <ul class="dropdown-menu">
          <li><router-link to="/user/personal-info" class="dropdown-item">My Profile</router-link></li>
          <li><router-link to="/user/favorite-recipes" class="dropdown-item">Favorited Recipes</router-link></li>
          <li><router-link to="/user/user-recipe" class="dropdown-item">My Recipes</router-link></li>
          <li><hr class="dropdown-divider" /></li>
          <li><a class="dropdown-item" href="#" @click.prevent="logout">Logout</a></li>
        </ul>
      </li>
    </ul>
  </div>
</template>

<script setup>
import { useRouter } from "vue-router";
import { useStore } from "vuex";

const store = useStore();
const router = useRouter();

const logout = () => {
  store.commit("auth/setUserLogout");
  router.push("/");
};
</script>