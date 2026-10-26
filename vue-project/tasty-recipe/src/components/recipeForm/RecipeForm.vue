<template>
  <ul class="list-group">
    <recipe-form-header></recipe-form-header>
    <recipe-form-body :isEdit="isEdit"></recipe-form-body>
  </ul>
</template>

<script setup>
import RecipeFormBody from "./RecipeFormBody.vue"; // sesuaikan lokasi file
import RecipeFormHeader from "./RecipeFormHeader.vue"; // sesuaikan lokasi file

defineProps({
  isEdit: { type: Boolean, default: false },
});
</script>
