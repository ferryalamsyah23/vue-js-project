import axios from "axios";
import Cookies from "js-cookie";

const AUTH_URL = "https://identitytoolkit.googleapis.com/v1/accounts";

export default {
  namespaced: true,
  state() {
    return {
      token: null,
      tokenExpirationDate: null,
      userLogin: {},
      isLogin: false,
    };
  },
  mutations: {
    setToken(state, { idToken, expiresIn }) {
      state.token = idToken;
      state.tokenExpirationDate = expiresIn;
      Cookies.set("tokenExpirationDate", expiresIn);
      Cookies.set("jwt", idToken);
    },
    setUserLogin(state, { userData, loginStatus }) {
      state.userLogin = userData;
      state.isLogin = loginStatus;
    },
    setUserLogout(state) {
      state.token = null;
      state.tokenExpirationDate = null;
      state.userLogin = {};
      state.isLogin = false;
      Cookies.remove("jwt");
      Cookies.remove("tokenExpirationDate");
      Cookies.remove("UID");
    },
  },
  actions: {
    async getRegisterData({ commit, dispatch }, payload) {
      const APIkey = import.meta.env.VITE_FIREBASE_API_KEY;
      try {
        const { data } = await axios.post(`${AUTH_URL}:signUp?key=${APIkey}`, {
          email: payload.email,
          password: payload.password,
          returnSecureToken: true,
        });

        commit("setToken", {
          idToken: data.idToken,
          expiresIn: new Date().getTime() + Number.parseInt(data.expiresIn) * 1000,
        });

        const newUserData = {
          userId: data.localId,
          firstname: payload.firstname,
          lastname: payload.lastname,
          username: payload.username,
          email: payload.email,
          imageLink: payload.imageLink,
        };

        Cookies.set("UID", newUserData.userId);
        await dispatch("addNewUser", newUserData);
      } catch (err) {
        console.log(err.response ? err.response.data : err);
      }
    },

    async addNewUser({ commit, state }, payload) {
      commit("setUserLogin", { userData: payload, loginStatus: true });
      try {
        const dbUrl = import.meta.env.VITE_FIREBASE_DB_URL;
        await axios.post(`${dbUrl}/user.json?auth=${state.token}`, payload);
      } catch (err) {
        console.log(err.response ? err.response.data : err);
      }
    },

    async getLoginData({ commit, dispatch }, payload) {
      const APIkey = import.meta.env.VITE_FIREBASE_API_KEY;
      try {
        const { data } = await axios.post(
          `${AUTH_URL}:signInWithPassword?key=${APIkey}`,
          {
            email: payload.email,
            password: payload.password,
            returnSecureToken: true,
          }
        );

        commit("setToken", {
          idToken: data.idToken,
          expiresIn: new Date().getTime() + Number.parseInt(data.expiresIn) * 1000,
        });
        Cookies.set("UID", data.localId);

        await dispatch("getUser", data.localId);
        return true;
      } catch (err) {
        console.log(err.response ? err.response.data : err);
        return false;
      }
    },

    async getUser({ commit, state }, userId) {
      // token valid berarti sudah login, jadi status langsung ditandai
      if (!state.isLogin) {
        commit("setUserLogin", { userData: { userId }, loginStatus: true });
      }

      try {
        const dbUrl = import.meta.env.VITE_FIREBASE_DB_URL;
        const { data } = await axios.get(`${dbUrl}/user.json`, {
          params: {
            orderBy: '"userId"',
            equalTo: `"${userId}"`,
            auth: state.token,
          },
        });
        const key = data ? Object.keys(data)[0] : null;
        if (key) {
          commit("setUserLogin", { userData: data[key], loginStatus: true });
        }
      } catch (err) {
        console.log(err.response ? err.response.data : err);
      }
    },
  },
};