import { fetchUserList, fetchUser, createUser, updateUser, deleteUser } from '@/services/api/users'

const initialState = () => ({
  userList: [],
  selectedUser: {}
})

const users = {
  namespaced: true,
  state: initialState(),
  mutations: {
    SET_USER_LIST (state, payload) {
      state.userList = payload
    },

    SET_USER (state, payload) {
      state.selectedUser = payload
    },

    APPEND_USER_TO_LIST (state, user) {
      state.userList.push(user)
    },

    UPDATE_USER_AT_LIST (state, user) {
      const index = state.userList.findIndex(item => item.id === user.id)

      if (index !== -1) {
        state.userList.splice(index, 1, user)
      }
    },

    REMOVE_USER_FROM_LIST (state, userId) {
      state.userList.splice(state.userList.findIndex(user => user.id === userId), 1)
    }
  },
  actions: {
    async fetchUserList ({ commit }) {
      const data = await fetchUserList()

      commit('SET_USER_LIST', data)
    },

    async fetchUser ({ commit }, userId) {
      const data = await fetchUser(userId)

      commit('SET_USER', data)
    },

    async createUser ({ commit }, payload) {
      const data = await createUser(payload)

      commit('APPEND_USER_TO_LIST', data)
      // dispatch('fetchUserList')
    },

    async updateUser ({ commit }, payload) {
      const data = await updateUser(payload)

      commit('UPDATE_USER_AT_LIST', data)
      // dispatch('fetchUserList')
    },

    async deleteUser ({ commit }, userId) {
      await deleteUser(userId)
      commit('REMOVE_USER_FROM_LIST', userId)
      // dispatch('fetchUserList')
    }
  },
  getters: {
    getUserList: state => state.userList,
    getSelectedUser: state => state.selectedUser
  }
}

export default users
