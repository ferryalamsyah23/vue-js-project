<template>
  <div class="container-md my-5 py-5">
    <recipe-form v-if="loaded" :isEdit="true"></recipe-form>
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import { useStore } from "vuex";
import { useRoute } from "vue-router";
import RecipeForm from "../recipeForm/RecipeForm.vue";

const store = useStore();
const route = useRoute();
const loaded = ref(false);

onMounted(async () => {
  await store.dispatch("recipe/getRecipeDetail", route.params.id);
  loaded.value = true;
});
</script>