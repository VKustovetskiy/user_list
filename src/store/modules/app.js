const initialState = () => ({
  isLoading: false
})

const app = {
  namespaced: true,
  state: initialState(),
  mutations: {
    SET_LOADING_STATE (state, payload) {
      state.isLoading = payload
    }
  },
  getters: {
    isLoading: state => state.isLoading
  }
}

export default app
