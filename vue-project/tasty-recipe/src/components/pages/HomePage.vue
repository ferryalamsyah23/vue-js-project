<template>
  <div>
    <div class="container-md my-5 py-5">
      <div class="recipe_title text-center">
        <h2>All Recipe</h2>
        <p style="font-size: 15px">
          Find and share everyday cooking inspiration on Allrecipes. Discover recipes, cooks, videos, and how-tos based on the food you love and the friends you follow.
        </p>
      </div>

      <!-- Letakkan component RecipeList di sini -->
      <recipe-list :recipes="recipeList" v-if="recipeListStatus"></recipe-list>
    </div>

    <!-- Form signup di bawah daftar resep -->
    <web-sign-up></web-sign-up>
  </div>
</template>

<script setup>
import RecipeList from "../recipe/RecipeList.vue";
import WebSignUp from "../auth/WebSignUp.vue";
import { onMounted, ref } from "vue";
import { useStore } from "vuex";

const store = useStore();
const recipeListStatus = ref(false);
const recipeList = ref();

onMounted(async () => {
  try {
    await store.dispatch("recipe/getRecipeData");
    recipeList.value = store.state.recipe.recipes;
    recipeListStatus.value = true;
  } catch (error) {
    console.log(error);
  }
});
</script>