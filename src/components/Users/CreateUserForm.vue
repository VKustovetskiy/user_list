<template>
  <users-base-user-form
    :submit-handler="createAction"
    :cancel-handler="cancelHandler"
    :is-loading="isLoading"
    form-title="Create"
    submit-btn-title="create" />
</template>

<script>
import { mapActions, mapGetters, mapMutations } from 'vuex'

export default {
  name: 'CreateUserForm',
  props: {
    cancelHandler: {
      type: Function,
      default: () => {}
    }
  },
  data: () => ({}),
  computed: {
    ...mapGetters('app', ['isLoading'])
  },
  methods: {
    ...mapActions('users', ['createUser']),
    ...mapMutations({
      setLoadingState: 'app/SET_LOADING_STATE'
    }),

    async createAction (formData) {
      try {
        this.setLoadingState(true)
        await this.createUser(formData)
        this.setLoadingState(false)
      } catch (e) {
        this.setLoadingState(false)
      }
    }
  }
}
</script>

<style>

</style>