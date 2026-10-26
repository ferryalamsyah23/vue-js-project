import axios from "axios";
import RECIPE_DATA from "../recipe.js";

const DB_URL = import.meta.env.VITE_FIREBASE_DB_URL;

export default {
  namespaced: true,
  state() {
    return {
      recipes: [],
      recipeDetail: {},
    };
  },
  mutations: {
    setRecipes(state, recipes) {
      state.recipes = recipes;
    },
    setRecipeDetail(state, payload) {
      state.recipeDetail = payload;
    },
    setNewRecipe(state, payload) {
      state.recipes.push(payload);
    },
    removeRecipe(state, id) {
      state.recipes = state.recipes.filter((recipe) => recipe.id !== id);
    },
  },
  actions: {
    async getRecipeData({ commit }) {
      let remote = [];
      try {
        const { data } = await axios.get(`${DB_URL}/recipes.json`);
        if (data) {
          remote = Object.keys(data).map((key) => ({ id: key, ...data[key] }));
        }
      } catch (err) {
        console.log(err.response ? err.response.data : err);
      }
      commit("setRecipes", [...RECIPE_DATA, ...remote]);
    },
    async getRecipeDetail({ commit }, payload) {
      const local = RECIPE_DATA.find((r) => String(r.id) === String(payload));

      // pakai data lokal kalau sudah punya bahan dan langkah
      if (local && local.ingredients && local.directions) {
        commit("setRecipeDetail", local);
        return;
      }

      try {
        const { data } = await axios.get(`${DB_URL}/recipes/${payload}.json`);
        if (data) {
          commit("setRecipeDetail", { ...local, ...data });
          return;
        }
      } catch (err) {
        console.log(err.response ? err.response.data : err);
      }

      commit("setRecipeDetail", local || {});
    },
    async addNewRecipe({ commit, rootState }, payload) {
      const newData = {
        ...payload,
        username: rootState.auth.userLogin.username,
        createdAt: Date.now(),
        likes: ["null"],
        userId: rootState.auth.userLogin.userId,
      };

      try {
        const { data } = await axios.post(`${DB_URL}/recipes.json?auth=${rootState.auth.token}`, newData);
        commit("setNewRecipe", { id: data.name, ...newData });
      } catch (err) {
        console.log(err.response ? err.response.data : err);
      }
    },
    async deleteRecipe({ commit, rootState }, id) {
      try {
        await axios.delete(`${DB_URL}/recipes/${id}.json?auth=${rootState.auth.token}`);
        commit("removeRecipe", id);
      } catch (err) {
        console.log(err.response ? err.response.data : err);
      }
    },
    async updateRecipe({ dispatch, rootState }, { id, newRecipe }) {
      try {
        const { data } = await axios.put(
          `https://recipe-vue-batch2-default-rtdb.firebaseio.com/recipes/${id}.json?auth=${rootState.auth.token}`,
          newRecipe,
        );
        await dispatch("getRecipeData");
      } catch (error) {
        console.log(error);
      }
    },
  },
};
