<template>
  <div class="Login">
    <h1>Login</h1>

    <LoginForm />
  </div>
</template>

<script>
import LoginForm from '../components/LoginForm.vue';

export default {
  name: 'Login',
  components: {
    LoginForm,
  },
  metaInfo() {
    return {
      title: 'Login',
    };
  }
}
</script>

<style lang="scss" scoped>
</style>
