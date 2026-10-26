<template>
  <div class="container-md my-5 py-5">
    <div class="row">
      <user-menu @changeComponent="$router.push($event)"></user-menu>
      <div class="col-lg-9">
        <component :is="component[getRoute]"></component>
      </div>
    </div>
  </div>
</template>

<script setup>
import UserMenu from "../user/UserMenu.vue";
import FavoriteRecipe from "../user/FavoriteRecipe.vue";
import PersonalInfo from "../user/PersonalInfo.vue";
import UserRecipe from "../user/UserRecipe.vue";
import Cookies from "js-cookie";
import { useRoute } from "vue-router";
import { computed, onMounted } from "vue";
import { useStore } from "vuex";

const store = useStore();
const route = useRoute();

const userData = computed(() => store.state.auth.userLogin || {});

const component = {
  "personal-info": PersonalInfo,
  "favorite-recipes": FavoriteRecipe,
  "user-recipe": UserRecipe,
};

const getRoute = computed(() => route.params.component);

// Setelah refresh, userLogin kosong. Ambil ulang dari database.
onMounted(() => {
  const uid = Cookies.get("UID");
  if (!userData.value.firstname && store.state.auth.token && uid) {
    store.dispatch("auth/getUser", uid);
  }
});
</script>