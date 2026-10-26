<template>
  <div class="header__navbar row justify-content-between align-items-center" style="width: 450px">
    <!-- Component SearchMenu -->
    <search-menu></search-menu>

    <!-- Component Dynamic SignupMenu / ProfileMenu -->
    <component :is="components[menuComponent]"></component>
  </div>
</template>

<script setup>
import { ref, computed, watch } from "vue";
import { useStore } from "vuex";
import SearchMenu from "@/components/header/SearchMenu.vue";
import SignupMenu from "@/components/header/SignupMenu.vue";
import ProfileMenu from "@/components/header/ProfileMenu.vue";

const store = useStore();
const menuComponent = ref("signup-menu");

const components = {
  "signup-menu": SignupMenu,
  "profile-menu": ProfileMenu,
};

const getToken = computed(() => {
  return store.state.auth.token;
});

if (!getToken.value) {
  menuComponent.value = "signup-menu";
} else {
  menuComponent.value = "profile-menu";
}

watch(getToken, (newValue) => {
  if (!newValue) {
    menuComponent.value = "signup-menu";
  } else {
    menuComponent.value = "profile-menu";
  }
});
</script>