<template>
  <div>
    <loading :active.sync="isLoading" />
    <div class="container-fuild bg-light overflow-hidden">
      <div class="row vh-100 justify-content-center align-items-center">
        <div class="w-75 p-5 border border-white bg-white shadow rounded">
          <validationObserver v-slot="{ invalid }">
            <form
              @submit.prevent="login"
              class="form"
            >
              <legend class="text-center">Sign In</legend>
              <validationProvider
                :key="item + key"
                :rules="item.rules"
                v-for="(item, key) in validForm"
                v-slot="{ errors, classes }"
              >
                <div class="form-group">
                  <label :id="item.id">{{ item.name }}</label>
                  <input
                    :class="classes"
                    :id="item.id"
                    :type="item.type"
                    class="form-control"
                    v-model="item.validation"
                  />
                  <span class="invalid-feedback">{{ errors[0] }}</span>
                </div>
              </validationProvider>
              <button
                :disabled="invalid"
                class="btn btn-primary btn-block rounded-pill"
                type="submit"
              >sign in</button>
            </form>
          </validationObserver>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { apiLogin } from '@/utils/api';

export default {
  name: 'Login',
  data() {
    return {
      isLoading: false,
      validForm: [
        {
          name: 'Email',
          id: 'userEmail',
          type: 'email',
          validation: '',
          rules: 'email|required',
        },
        {
          name: 'Passowrd',
          id: 'userPassowrd',
          type: 'password',
          validation: '',
          rules: 'required',
        },
      ],
      user: {
        email: '',
        password: '',
      },
    };
  },
  methods: {
    login() {
      this.isLoading = true;
      this.user.email = this.validForm[0].validation;
      this.user.password = this.validForm[1].validation;
      apiLogin(this.user)
        .then((res) => {
          const { token, expired } = res.data;
          document.cookie = `token=${token}; expires =${new Date(
            expired * 1000,
          )}`;
          this.user = {
            email: '',
            passowrd: '',
          };
          this.isLoading = false;
          this.$router.push('/admin/products');
        })
        .catch((rej) => {
          this.isLoading = false;
          throw rej;
        });
    },
  },
};
</script>

<style lang="scss"></style>
