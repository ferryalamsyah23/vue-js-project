<template>
  <div class="col-lg-3 mb-4">
    <ul class="list-group">
      <li class="list-group-item">
        <div class="d-flex align-items-center">
          <img
            :src="userData.imageLink || defaultProfile"
            alt="Profile"
            width="36"
            height="36"
            class="rounded-circle"
            style="object-fit: cover"
          />
          <div class="ps-3">
            <p class="my-0 fs-5 fw-semibold">{{ userData.firstname }} {{ userData.lastname }}</p>
            <p class="my-0 fs-6 text-secondary">{{ userData.email }}</p>
          </div>
        </div>
      </li>
      <li
        class="list-group-item"
        style="cursor: pointer"
        :class="{ active: route.params.component === 'personal-info' }"
        @click="$emit('changeComponent', '/user/personal-info')"
      >
        Personal Info
      </li>
      <li
        class="list-group-item"
        style="cursor: pointer"
        :class="{ active: route.params.component === 'favorite-recipes' }"
        @click="$emit('changeComponent', '/user/favorite-recipes')"
      >
        Favorited Recipes
      </li>
      <li
        class="list-group-item"
        style="cursor: pointer"
        :class="{ active: route.params.component === 'user-recipe' }"
        @click="$emit('changeComponent', '/user/user-recipe')"
      >
        My Recipe
      </li>
    </ul>
  </div>
</template>

<script setup>
import { computed } from "vue";
import { useStore } from "vuex";
import { useRoute } from "vue-router";
import defaultProfile from "../../assets/images/Profile.png";

defineEmits(["changeComponent"]);

const store = useStore();
const route = useRoute();
const userData = computed(() => store.state.auth.userLogin || {});
</script>