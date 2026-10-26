<template>
  <div class="my-3">
    <div class="card">
      <div class="card-header">
        <p class="fs-4 my-0 fw-semibold">Ingredients</p>
      </div>
      <div class="card-body">
        <ul class="mb-0">
          <li v-for="(ingredient, index) in ingredients" :key="index">
            {{ ingredient }}
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from "vue";
import { useStore } from "vuex";

const store = useStore();
const recipeDetail = computed(() => store.state.recipe.recipeDetail || {});

const toList = (v) => {
  if (Array.isArray(v)) return v.filter(Boolean);
  if (v && typeof v === "object") return Object.values(v).filter(Boolean);
  if (typeof v === "string") return v.split("\n").filter(Boolean);
  return [];
};

const ingredients = computed(() =>
  toList(recipeDetail.value.ingredients ?? recipeDetail.value.ingredient)
);
</script>