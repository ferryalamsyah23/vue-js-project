<template>
  <div class="container-md my-5 py-5">
    <recipe-detail v-if="recipe && recipe.name" :recipe="recipe"></recipe-detail>
  </div>
</template>

<script setup>
import { computed, onMounted } from "vue";
import { useRoute } from "vue-router";
import { useStore } from "vuex";
import RecipeDetail from "../detail/RecipeDetail.vue";

const route = useRoute();
const store = useStore();

onMounted(async () => {
  await store.dispatch("recipe/getRecipeDetail", route.params.id);
});

const recipe = computed(() => store.state.recipe.recipeDetail);
</script>