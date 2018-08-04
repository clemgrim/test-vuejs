<template>
  <div class="Login">
    <h1>Login</h1>
    <form class="Login__form" novalidate @submit.prevent="login()">
      <div :class="{ 'is-invalid': $v.user.username.$error }" class="Login__form__group">
        <label class="Login__form__label">Username</label>
        <input
          v-model="user.username"
          required
          type="email"
          maxlength="255"
          class="Login__form__input"
        >
      </div>
      <div :class="{ 'is-invalid': $v.user.password.$error }" class="Login__form__group">
        <label class="Login__form__label">Password</label>
        <input
          v-model="user.password"
          required
          type="password"
          minlength="4"
          maxlength="255"
          class="Login__form__input"
        >
      </div>
      <input class="Login__button" type="submit" value="Login">
    </form>
  </div>
</template>

<script>
import { required, minLength, maxLength, email } from 'vuelidate/lib/validators';

export default {
  name: 'Login',
  data() {
    return {
      user: {},
    };
  },
  validations: {
    user: {
      username: {
        required,
        email,
      },
      password: {
        required,
        minLength: minLength(4),
        maxLength: maxLength(50)
      }
    }
  },
  methods: {
    login() {
      const { username, password } = this.user;
      
      this.$v.$touch();

      if (!this.$v.$invalid) {
        this.$store.dispatch('authentication/query_login', { username, password })
          .then(() => this.$router.replace({ name: 'home' }));
      }
    }
  },
  metaInfo() {
    return {
      title: 'Login',
    };
  }
}
</script>

<style lang="scss" scoped>
  .Login {
    &__form {
      text-align: left;
      max-width: 300px;
      margin: auto;

      &__label {
        display: block;
        font-weight: bold;
        margin-bottom: 5px;
      }

      &__input {
        padding: 5px 8px;
        border: 1px solid #ccc;
        width: 100%;
      }

      &__group {
        margin-bottom: 20px;
      }

      &__group.is-invalid &__input {
        border-color: #f00;
        outline: 0;
        box-shadow: none;
      }

      &__group.is-invalid &__label {
        color: #f00;
      }
    }

    &__button {
      border: 2px solid #333;
      color: #333;
      padding: 8px 12px;
      box-shadow: none;
      border-radius: 0;
      background: transparent;
      text-transform: uppercase;
      font-size: 14px;
      text-align: center;
      font-weight: bold;
      cursor: pointer;
    
      &:hover {
        background-color: #333;
        color: #fff;
      }
    }
  }
</style>
