<script setup>
import WebHeader from "./components/header/WebHeader.vue";
import WebFooter from "./components/footer/WebFooter.vue";
</script>

<template>
  <div>
    <web-header></web-header>
    <router-view></router-view>
    <web-footer></web-footer>
  </div>
</template>

<style>
html {
  scroll-behavior: smooth;
}
</style>