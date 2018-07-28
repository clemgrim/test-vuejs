<template>
  <div class="Login">
    <h1>Login</h1>
    <form @submit.prevent="login()" class="Login__form" novalidate>
      <div class="form-group" :class="{ 'is-invalid': $v.user.username.$error }">
        <label>Username</label>
        <input v-model="user.username" required type="email" maxlength="255">
      </div>
      <div class="form-group" :class="{ 'is-invalid': $v.user.password.$error }">
        <label>Password</label>
        <input v-model="user.password" required type="password" minlength="4" maxlength="255">
      </div>
      <button class="Login__button" type="submit()">Login</button>
    </form>
  </div>
</template>

<script>
import { required, minLength, maxLength, email } from 'vuelidate/lib/validators';

export default {
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

      if (this.$v.$valid) {
        this.$store.dispatch('authentication/login', { username, password });
      }
    }
  },
  name: 'login',
}
</script>

<style lang="scss" scoped>
  .form-group {
    margin-bottom: 20px;
  }

  label {
    display: block;
    font-weight: bold;
    margin-bottom: 5px;
  }

  input {
    padding: 5px 8px;
    border: 1px solid #ccc;
    width: 100%;
  }

  .form-group.is-invalid {
    label {
      color: #f00;
    }

    input {
      border-color: #f00;
      outline: 0;
      box-shadow: none;
    }
  }

  .Login {
    &__form {
      text-align: left;
      max-width: 300px;
      margin: auto;
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
