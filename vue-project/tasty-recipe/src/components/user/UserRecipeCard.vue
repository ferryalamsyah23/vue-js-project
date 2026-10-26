<template>
  <div class="col-md-6 col-12 my-2">
    <div class="card">
      <div class="card-body">
        <div class="d-flex justify-content-between">
          <div>
            <p class="mb-0">{{ recipe.category }}</p>
            <div class="h-50">
              <h4 class="fs-5 mb-0">{{ recipe.name }}</h4>
            </div>
            <slot></slot>
          </div>
          <div class="d-flex">
            <img :src="recipe.imageLink" :alt="recipe.name" width="90" height="80" class="rounded" style="object-fit: cover" />
          </div>
        </div>
        <div class="d-flex justify-content-between mt-3 pt-3 border-top">
          <button class="btn delete-btn px-3 py-2 rounded-pill" @click="$emit('btnRemowe')">{{ buttonName[0] }}</button>
          <button class="btn edit-btn px-3 py-2 rounded-pill" @click="editRecipe">{{ buttonName[1] }}</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from "vue-router";

const props = defineProps({
  recipe: { type: Object, required: true },
  buttonName: { type: Array, required: true },
});

defineEmits(["btnRemowe"]);

const router = useRouter();

const editRecipe = () => {
  router.push("/edit-recipe/" + props.recipe.id);
};
</script>

<style scoped>
.delete-btn {
  color: #cb3a31;
  border: 1px solid #cb3a31;
  min-width: 120px;
}
.edit-btn {
  color: #4c4ddc;
  border: 1px solid #4c4ddc;
  min-width: 120px;
}
</style>