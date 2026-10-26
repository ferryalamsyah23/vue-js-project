<template>
  <div class="recipe-description">
    <h2>{{ title }}</h2>
    <p>{{ description }}</p>
  </div>
</template>

<script setup>
import { computed, reactive } from "vue";
import { useStore } from "vuex";

const store = useStore()
const recipeDetail = computed(() => {
return store.state.recipe.recipeDetail
})

defineProps({
  title: { type: String, required: true },
  description: { type: String, default: "" },
});
</script>