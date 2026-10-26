<template>
  <ul class="list-group">
    <li class="list-group-item">
      <div class="d-flex flex-sm-row flex-column justify-content-between align-items-sm-center">
        <div class="mb-3 mb-sm-0">
          <p class="my-0 fs-4 fw-semibold">My Recipe</p>
          <p class="my-0 text-secondary">Add your original recipe here</p>
        </div>
        <div>
          <router-link to="/new-recipe" class="btn text-white" style="background-color: #4c4ddc; border-radius: 50px"> + Add Recipe </router-link>
        </div>
      </div>
    </li>
    <li class="list-group-item">
      <p class="mt-2 mb-4 fs-5 fw-semibold">Recipe</p>
      <div class="row">
        <user-recipe-card v-for="recipe in recipes" :key="recipe.id" :recipe="recipe" :buttonName="['Delete', 'Edit']" @btnRemowe="deleteRecipe(recipe.id)">
          <p>{{ formatDate(recipe.createdAt) }}</p>
        </user-recipe-card>
      </div>
      <p v-if="recipes.length === 0" class="text-secondary">You have no recipe yet.</p>
    </li>
  </ul>
</template>

<script setup>
import { computed, onMounted } from "vue";
import { useStore } from "vuex";
import UserRecipeCard from "./UserRecipeCard.vue"; // sesuaikan lokasi file

const store = useStore();

onMounted(() => {
  if (store.state.recipe.recipes.length === 0) {
    store.dispatch("recipe/getRecipeData");
  }
});

const recipes = computed(() => {
  const userId = store.state.auth.userLogin.userId;
  if (!userId) return [];
  return store.state.recipe.recipes.filter((recipe) => recipe.userId === userId);
});

const formatDate = (timestamp) => (timestamp ? new Date(timestamp).toDateString() : "");

const deleteRecipe = async (id) => {
  await store.dispatch("recipe/deleteRecipe", id);
};
</script>
