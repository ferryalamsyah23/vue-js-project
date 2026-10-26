<template>
  <li class="list-group-item">
    <form @submit.prevent="addNewRecipe">
      <!-- General Information Start -->
      <div>
        <p class="my-3 fs-5 fw-semibold">General Information</p>
        <div>
          <!-- Photo Recipe -->
          <div class="mb-3">
            <label for="recipeImage" class="form-label fw-semibold">
              Photo Recipe <span class="text-danger">*</span>
            </label>
            <input id="recipeImage" type="file" accept="image/*" class="form-control" @change="checkImage" />
            <img
              v-if="recipeData.imageLink"
              :src="recipeData.imageLink"
              alt="Preview"
              class="mt-2 rounded"
              style="max-height: 150px; object-fit: cover"
            />
          </div>

          <div class="mb-3">
            <base-input type="text" identity="recipeTitle" placeholder="Give your recipe a title" label="Recipe Title" v-model="recipeData.name"></base-input>
          </div>

          <div class="mb-3">
            <base-text-area identity="recipeDescription" label="Description" placeholder="Share story behind recipe and what is make it special" v-model="recipeData.description"></base-text-area>
          </div>

          <div class="mb-3">
            <base-select :data="['Breakfast', 'Lunch', 'Dinner', 'Meals', 'Snacks']" v-model="recipeData.category"></base-select>
          </div>
        </div>
      </div>
      <!-- General Information End -->

      <!-- Time Setting Start -->
      <div class="border-top py-1">
        <p class="my-3 fs-5 fw-semibold">Time Setting</p>
        <div>
          <div class="mb-3">
            <base-input type="number" identity="prepTime" placeholder="0" label="Prep Time" v-model="recipeData.prepTime" @input="totalTime"></base-input>
          </div>
          <div class="mb-3">
            <base-input type="number" identity="cookTime" placeholder="0" label="Cook Time" v-model="recipeData.cookTime" @input="totalTime"></base-input>
          </div>
          <div class="mb-3">
            <base-input type="number" identity="totalTime" placeholder="0" label="Total Time" v-model="recipeData.totalTime"></base-input>
          </div>
        </div>
      </div>
      <!-- Time Setting End -->

      <!-- Ingredients Start -->
      <div class="border-top py-1">
        <p class="my-3 fs-5 fw-semibold">Ingredients</p>
        <p>
          Enter one ingredient per line. Include the quantity (i.e. cups, tablespoons) and any special preparation
          (i.e. sifted, softened, chopped). Use optional headers to organize the different parts of the recipe
          (i.e. Cake, Frosting, Dressing).
        </p>
        <div>
          <div class="mb-3 row" v-for="(item, index) in ingredientCount" :key="'ing-' + index">
            <div class="col-lg-11 col-11">
              <base-input type="text" :identity="'ingredient' + index" placeholder="Ex: 1 cup sugar" v-model="recipeData.ingredients[index]"></base-input>
            </div>
            <div
              class="col-lg-1 col-1 col-form-label align-self-end delete-ingredient"
              style="color: #cb3a31; cursor: pointer"
              @click="deleteIngredient(index)"
            >
              <i class="fa-regular fa-trash-can px-1"></i><span class="d-none d-md-inline">Delete</span>
            </div>
          </div>
        </div>
        <base-button class="new-ingredient-btn px-3 py-2" type="button" @click="addIngredient">Add More</base-button>
      </div>
      <!-- Ingredients End -->

      <!-- Direction Start -->
      <div class="border-top my-3">
        <p class="my-3 fs-5 fw-semibold">Directions</p>
        <p>
          Explain how to make your recipe, including oven temperatures, baking or cooking times, and pan sizes, etc.
          Use optional headers to organize the different parts of the recipe
        </p>
        <div>
          <div class="mb-3 row" v-for="(item, index) in directionCount" :key="'dir-' + index">
            <div class="col-lg-11 col-11">
              <base-input type="text" :identity="'direction' + index" placeholder="Ex: 1 cup sugar" v-model="recipeData.directions[index]"></base-input>
            </div>
            <div
              class="col-lg-1 col-1 col-form-label align-self-end delete-ingredient"
              style="color: #cb3a31; cursor: pointer"
              @click="deleteDirection(index)"
            >
              <i class="fa-regular fa-trash-can px-1"></i><span class="d-none d-md-inline">Delete</span>
            </div>
          </div>
        </div>
        <base-button class="new-ingredient-btn px-3 py-2" type="button" @click="addDirection">Add More</base-button>
      </div>
      <!-- Direction End -->

      <!-- Form Button Start -->
      <div class="border-top py-3 d-flex my-4 justify-content-end">
        <base-button class="cancel-btn px-3 py-2 ms-1" type="button" @click="router.push('/user/user-recipe')">Cancel</base-button>
        <base-button class="submit-recipe-btn px-3 py-2 ms-1" type="submit">Submit</base-button>
      </div>
      <!-- Form Button End -->
    </form>
  </li>
</template>

<script setup>
import BaseInput from "@/components/ui/BaseInput.vue";
import BaseTextArea from "@/components/ui/BaseTextArea.vue";
import BaseSelect from "@/components/ui/BaseSelect.vue";
import BaseButton from "@/components/ui/BaseButton.vue";
import { onMounted, reactive, ref } from "vue";
import { useStore } from "vuex";
import { useRoute, useRouter } from "vue-router";

const props = defineProps({
  isEdit: { type: Boolean, default: false },
});

const store = useStore();
const route = useRoute();
const router = useRouter();

const recipeData = reactive({
  imageLink: "",
  name: "",
  description: "",
  category: "Breakfast",
  prepTime: 0,
  cookTime: 0,
  totalTime: 0,
  ingredients: [],
  directions: [],
});

const ingredientCount = ref(1);
const directionCount = ref(1);

const addNewRecipe = async () => {
  if (props.isEdit) {
    await store.dispatch("recipe/updateRecipe", {
      id: route.params.id,
      newRecipe: recipeData,
    });
  } else {
    await store.dispatch("recipe/addNewRecipe", recipeData);
  }
  router.push("/user/user-recipe");
};

const addIngredient = () => {
  ingredientCount.value++;
};

const addDirection = () => {
  directionCount.value++;
};

const deleteIngredient = (index) => {
  recipeData.ingredients.splice(index, 1);
  if (ingredientCount.value > 1) ingredientCount.value--;
};

const deleteDirection = (index) => {
  recipeData.directions.splice(index, 1);
  if (directionCount.value > 1) directionCount.value--;
};

const checkImage = (event) => {
  const file = event.target.files && event.target.files[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = () => {
    recipeData.imageLink = reader.result;
  };
  reader.readAsDataURL(file);
};

const totalTime = () => {
  recipeData.totalTime = (Number(recipeData.prepTime) || 0) + (Number(recipeData.cookTime) || 0);
};

onMounted(() => {
  if (!props.isEdit) return;

  const detail = store.state.recipe.recipeDetail || {};
  const fields = ["imageLink", "name", "description", "category", "prepTime", "cookTime", "totalTime"];

  fields.forEach((field) => {
    if (detail[field] !== undefined) recipeData[field] = detail[field];
  });

  recipeData.ingredients = Array.isArray(detail.ingredients) ? [...detail.ingredients] : [];
  recipeData.directions = Array.isArray(detail.directions) ? [...detail.directions] : [];

  ingredientCount.value = Math.max(1, recipeData.ingredients.length);
  directionCount.value = Math.max(1, recipeData.directions.length);
});
</script>