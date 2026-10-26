<template>
  <div class="row border p-4 rounded">
    <div class="col-md-9">
      <recipe-description
        :title="recipe.name"
        :description="recipe.description"
      ></recipe-description>

      <recipe-ingredients></recipe-ingredients>
      <recipe-directions></recipe-directions>

      <div
        class="d-flex rounded p-3 my-3"
        style="background-color: #f0f0ff; border: 1px solid #c8c8ee"
      >
        <div class="flex-fill pe-3" style="border-right: 1px solid #c8c8ee">
          <div>Preptime</div>
          <div>{{ recipe.prepTime ?? "..." }} Mins</div>
        </div>
        <div class="flex-fill px-3" style="border-right: 1px solid #c8c8ee">
          <div>Cooktime</div>
          <div>{{ recipe.cookTime ?? "..." }} Mins</div>
        </div>
        <div class="flex-fill ps-3">
          <div>Total</div>
          <div>{{ recipe.totalTime ?? "..." }} Mins</div>
        </div>
      </div>

      <p>Recipe By {{ recipe.username || "..." }}</p>

      <button
        type="button"
        class="btn rounded-pill px-4"
        style="color: #4c4ddc; border: 1px solid #4c4ddc"
      >
        ♡ Add To Favorite
      </button>
    </div>

    <div class="col-md-3 text-end">
      <img :src="recipe.imageLink" :alt="recipe.name" class="img-fluid rounded" />
    </div>
  </div>
</template>

<script setup>
import RecipeDescription from "./RecipeDescription.vue";
import RecipeIngredients from "./RecipeIngredients.vue";
import RecipeDirections from "./RecipeDirections.vue";

defineProps({
  recipe: { type: Object, required: true },
});
</script>