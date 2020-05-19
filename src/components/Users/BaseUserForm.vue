<template>
    <v-form
      v-model="isFormValid"
      ref="userForm"
      lazy-validation
      @submit.prevent.stop="handleSubmit">
      <v-card elevation="3">
        <v-card-title
          v-if="formTitle.length"
          class="headline grey lighten-3"
        >
          {{ formTitle }}
        </v-card-title>

        <v-card-text>
          <v-subheader class="grey--text text--darken-4 subtitle-2">Main</v-subheader>

          <v-row>
            <v-col>
              <v-text-field
                v-model.trim="formData.name"
                :rules="rules.name"
              >
                <template #label>
                  <span>Name <span class="red--text">*</span></span>
                </template>
              </v-text-field>
            </v-col>
          </v-row>

          <v-row>
            <v-col>
              <v-text-field
                v-model.trim="formData.email"
                :rules="rules.email"
                label="Email"
              >
                <template #label>
                  <span>Email <span class="red--text">*</span></span>
                </template>
              </v-text-field>
            </v-col>
          </v-row>

          <v-subheader class="grey--text text--darken-4 subtitle-2">Address</v-subheader>

          <v-row>
            <v-col>
              <v-text-field
                v-model.trim="formData.address.city"
                label="City"
              ></v-text-field>
            </v-col>

            <v-col>
              <v-text-field
                v-model.trim="formData.address.street"
                label="Street"
              ></v-text-field>
            </v-col >

            <v-col>
              <v-text-field
                v-model.trim="formData.address.suite"
                label="Block"
              ></v-text-field>
            </v-col>
          </v-row>

          <v-divider class="mt-5"></v-divider>

        </v-card-text>
        
        <v-card-actions class="justify-center justify-sm-end">
              <v-btn
                :disabled="isBtnDisabled"
                :loading="isLoading"
                color="success"
                height="45"
                min-width="100"
                type="submit"
              >
                {{ submitBtnTitle }}
              </v-btn>
              <v-btn
                color="error"
                height="45"
                min-width="100"
                @click.stop="handleCancel"
              >
                cancel
              </v-btn>
        </v-card-actions>
      </v-card>
    </v-form>
</template>

<script>
import { required, validateEmail } from '@/utils'

export default {
  name: 'BaseUserForm',
  props: {
    isLoading: {
      type: Boolean,
      default: false
    },
    userData: {
      type: Object,
      default: () => {}
    },
    formTitle: {
      type: String,
      default: ''
    },
    submitBtnTitle: {
      type: String,
      default: 'submit'
    },
    submitHandler: {
      type: Function,
      default: () => {}
    },
    cancelHandler : {
      type: Function,
      default: () => {}
    }
  },
  data: () => ({
    isFormValid: false,
    formData: {
      name: '',
      email: '',
      address: {
        city: '',
        street: '',
        suite: ''
      }
    },
    rules: {
      name: [
        required
      ],
      email: [
        required,
        validateEmail
      ]
    }
  }),
  watch: {
    userData: {
      handler (newVal) {
        this.setFormData(newVal)
      }
    }
  },
  computed: {
    isBtnDisabled () {
      return this.isLoading || !this.isFormValid
    }
  },
  methods: {
    async handleSubmit () {
      if (this.$refs.userForm.validate()) {
        await this.submitHandler(this.formData)
        this.cancelHandler()
      }
    },
  
    setFormData () {
      this.formData = { ...this.formData, ...this.userData }
    },

    handleCancel () {
      this.cancelHandler()
    }
  }
}
</script>

<style>

</style>