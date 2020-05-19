<template>
  <v-container fluid>
    <v-card elevation="5" class="pa-5">
      <v-text-field
        v-model="filter"
        append-icon="mdi-magnify"
        label="Search"
        solo
        hide-details
        class="pb-3"></v-text-field>
      <v-data-table
        :items="userList"
        :headers="headers"
        :search="filter"
        :loading="isLoading"
        :custom-filter="searchByName"
        loading-text="Loading... Please wait"
      >

      <template v-slot:top>
        <v-toolbar flat color="white">
          <v-spacer></v-spacer>
          <v-btn
            color="primary"
            height="45"
            @click.stop="handleCreate"
          >
            add new user
          </v-btn>
        </v-toolbar>
      </template>

      <template
        v-slot:body="{ items }">
        <tbody>
         <tr v-for="item in items" :key="item.id">
          <td>{{ item.name }}</td>
          <td>{{ item.email }}</td>
          <td>{{ item.address.city || '-' }}</td>
          <td>{{ item.address.street || '-' }}</td>
          <td>{{ item.address.suite || '-' }}</td>
          <td>
            <v-icon
              small
              class="mr-2"
              @click.stop="handleEdit(item.id)">
              mdi-pencil
            </v-icon>
            <v-icon
              small
              @click.stop="handleDelete(item)">
              mdi-delete
            </v-icon>
          </td>
        </tr>
        </tbody>
      </template>

      <template v-slot:no-data>
        <v-btn color="primary" @click="init">Reload</v-btn>
      </template>
      </v-data-table>
    </v-card>

    <v-dialog
      v-if="createDialogVisible"
      v-model="createDialogVisible"
      max-width="650px"
      persistent
    >
      <users-create-user-form
        :cancel-handler="toggleCreateDialog" />
    </v-dialog>

    <v-dialog
      v-if="editDialogVisible"
      v-model="editDialogVisible"
      max-width="650px"
      persistent
    >
      <users-edit-user-form
        :user-id="selectedUserId"
        :cancel-handler="toggleEditDialog" />
    </v-dialog>

    <v-dialog
      v-if="deleteDialogVisible"
      v-model="deleteDialogVisible"
      max-width="650px"
      persistent
    >
      <v-card>
        <v-card-title class="headline grey lighten-3">
          {{ `Delete: ${userToDelete.name}` }}
        </v-card-title>

        <v-card-text class="body-1 pt-5">Are you shure want to delete?</v-card-text>

        <v-divider></v-divider>

        <v-card-actions class="justify-end">
          <v-btn 
            :disabled="isLoading"
            :loading="isLoading"
            height="45"
            min-width="100"
            color="error"
            @click.stop="deleteAction(userToDelete.id)"
          >delete</v-btn>

          <v-btn
            height="45"
            min-width="100"
            class="grey--text text--darken-2 grey lighten-2"
            @click.stop="toggleDeleteDialog"
          >cancel</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
import { mapGetters, mapActions, mapMutations } from 'vuex'
export default {
  name: 'UserList',
  data: () => ({
    headers: [
      {
        text: 'Name',
        value: 'name',
        sortable: false
      },
      {
        text: 'Email',
        value: 'email',
        sortable: false
      },
      {
        text: 'City',
        value: 'address.city',
        sortable: false
      },
      {
        text: 'Street',
        value: 'address.street',
        sortable: false
      },
      {
        text: 'Block',
        value: 'address.suite',
        sortable: false
      },
      {
        text: 'Actions',
        sortable: false
      }
    ],
    filter: '',
    createDialogVisible: false,
    editDialogVisible: false,
    deleteDialogVisible: false,
    selectedUserId: null,
    userToDelete: null
  }),
  computed: {
    ...mapGetters({
      userList: 'users/getUserList',
      isLoading: 'app/isLoading'
    })
  },
  beforeMount() {
    this.init()
  },
  methods: {
    ...mapActions('users', [
      'fetchUserList',
      'deleteUser'
    ]),
    ...mapMutations({
      setLoadingState: 'app/SET_LOADING_STATE'
    }),

    async init () {
      this.setLoadingState(true)
      await this.fetchUserList()
      this.setLoadingState(false)
    },

    handleEdit (userId) {
      this.setSelectedUserId(userId)
      this.toggleEditDialog()
    },

    handleCreate () {
      this.toggleCreateDialog()
    },

    setSelectedUserId (userId) {
      this.selectedUserId = userId
    },

    toggleEditDialog () {
      this.editDialogVisible = !this.editDialogVisible
    },

    toggleCreateDialog () {
      this.createDialogVisible = !this.createDialogVisible
    },

    toggleDeleteDialog () {
      this.deleteDialogVisible = !this.deleteDialogVisible
    },
  
    handleDelete (user) {
      this.setUserToDelete(user)
      this.toggleDeleteDialog()
    },

    setUserToDelete (user) {
      this.userToDelete = user
    },

    searchByName (value, search, item) {
      return item != null &&
          search != null &&
          item.name.toString().toLowerCase().indexOf(search.toLowerCase()) !== -1
    },

    async deleteAction (userId) {
      try {
        this.setLoadingState(true)
        await this.deleteUser(userId)
        this.toggleDeleteDialog()
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
