<style scoped>
  .login-root {
    max-width: 320px;
  }
</style>

<template>
  <div class="container login-root">
    <div class="panel">
      <div class="panel-heading" align="center">
        <h3>Sign In</h3>
        <p class="text-muted">Avon Old Farms School Event System Portal</p>
      </div>
      <div class="panel-body">
        <form v-on:submit.prevent="handleSubmit">
          <input type="text" v-model="username" class="form-control"
                 placeholder="username" required>
          <br>
          <input type="password" v-model="password" class="form-control"
                 placeholder="password" required>
          <br>
          <button type="submit" class="btn btn-block btn-primary" v-bind:class="{ 'btn-danger': error }">
            Sign In
          </button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        username: '',
        password: ''
      }
    }
  }
</script>
