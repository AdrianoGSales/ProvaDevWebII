<template>
  <img id="logo" alt="logo" src="./assets/logo.png">
  <putUsers></putUsers>
</template>

<script>

import putUsers from './components/putUsers.vue';

export default {
  name: 'App',
  components: {
    putUsers
}
}
</script>

<style>
.container {
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
}

h2 {
  margin-bottom: 10px;
}

.form label {
  display: block;
  margin-bottom: 5px;
}

.form input {
  width: 100%;
  padding: 5px;
  margin-bottom: 10px;
}

.form button {
  padding: 5px 10px;
  background-color: #007bff;
  color: #fff;
  border: none;
  cursor: pointer;
}

.user-list {
  list-style-type: none;
  padding: 0;
}

.user-item {
  margin-bottom: 10px;
}

.btn-edit, .btn-delete {
  padding: 2px 5px;
  background-color: #ccc;
  color: #fff;
  border: none;
  cursor: pointer;
}

.btn-delete {
  background-color: #dc3545;
}
#logo{
  width: 200px;
  height: 200px;
  position: relative;
  left: 50%;
  max-width: 100%;
  max-height: 100%;
}
</style>

