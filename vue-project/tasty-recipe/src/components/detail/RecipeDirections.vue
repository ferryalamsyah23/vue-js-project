<template>
  <div class="my-3">
    <div class="card">
      <div class="card-header">
        <p class="fs-4 my-0 fw-semibold">Directions</p>
      </div>
      <div class="card-body">
        <div v-for="(direction, index) in directions" :key="index">
          <p class="my-2 fs-5 fw-semibold">Step {{ index + 1 }}</p>
          <p class="my-2">{{ direction }}</p>
        </div>
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

const directions = computed(() =>
  toList(
    recipeDetail.value.directions ??
      recipeDetail.value.steps ??
      recipeDetail.value.instructions
  )
);
</script>