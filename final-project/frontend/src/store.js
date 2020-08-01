import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        user: null,
    },
    mutations: {
        SET_USER(state, user) {
            state.user = user
        }
    },
    getters: {
        user(state) {
            return state.user
        },
    },
    actions: {
        setUser({ commit }, user) {
            if (user && user.token) {
                localStorage.setItem('token', user.token);
            } else {
                localStorage.removeItem('token');
            }

            commit('SET_USER', user)
        }
    }
})