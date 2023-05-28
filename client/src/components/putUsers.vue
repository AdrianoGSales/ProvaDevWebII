<template>
 <div class="container">
    <h2>Registro de Usuário</h2>
    <form @submit.prevent="registerUser" class="form">
      <label for="name">Nome:</label>
      <input type="text" id="name" v-model="name" required>
      <label for="email">E-mail:</label>
      <input type="email" id="email" v-model="email" required>
      <label for="password">Senha:</label>
      <input type="password" id="password" v-model="password" required>
      <button type="submit">Cadastrar</button>
    </form>

    <h2>Lista de Usuários</h2>
    <ul class="user-list">
      <li v-for="user in users" :key="user.id" class="user-item">
        {{ user.nome }} - {{ user.email }}
        <button @click="editUser(user)" class="btn-edit">Editar</button>
        <button @click="deleteUser(user.id)" class="btn-delete">Excluir</button>
      </li>
    </ul>
  </div>


  </template>
  
  <script>
  export default {
    data() {
      return {
        name: '',
        email: '',
        password: '',
        users: []
      };
    },
    methods: {
      async registerUser() {
        try {
          const response = await fetch('http://localhost:3000/api/registerUser', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              name: this.name,
              email: this.email,
              password: this.password
            })
          });
          
          if (response.ok) {
            alert('Usuário cadastrado com sucesso!');
            this.name = '';
            this.email = '';
            this.password = '';
            this.getUsers();
          } else {
            alert('Erro ao cadastrar usuário.');
          }
        } catch (error) {
          console.error(error);
          alert('Erro de conexão com o servidor.');
        }
      },
      async getUsers() {
        try {
          const response = await fetch('http://localhost:3000/api/getUsers');
          
          if (response.ok) {
            this.users = await response.json();
          } else {
            alert('Erro ao obter lista de usuários.');
          }
        } catch (error) {
          console.error(error);
          alert('Erro de conexão com o servidor2.');
        }
      },
      async editUser(user) {
        const newName = prompt('Digite o novo nome:', user.name);
        const newEmail = prompt('Digite o novo email:', user.email);
        const newPassword = prompt('Digite a nova senha:',user.password)
        
        if (newName) {
          try {
            const response = await fetch(`http://localhost:3000/api/putUsers/${user.id}`, {
              method: 'PUT',
              headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify({
                name: newName,
                email: newEmail,
                password: newPassword
              })
            });
            
            if (response.ok) {
              alert('Usuário atualizado com sucesso!');
              this.getUsers();
            } else {
              alert('Erro ao atualizar usuário.');
            }
          } catch (error) {
            console.error(error);
            alert('Erro de conexão com o servidor.');
          }
        }
      },
      async deleteUser(userId) {
        const confirmDelete = confirm('Tem certeza que deseja excluir este usuário?');
        
        if (confirmDelete) {
          try {
            const response = await fetch(`http://localhost:3000/api/deleteUsers/${userId}`, {
              method: 'DELETE'
            });
            
            if (response.ok) {
              alert('Usuário excluído com sucesso!');
              this.getUsers();
            } else {
              alert('Erro ao excluir usuário.');
            }
          } catch (error) {
            console.error(error);
            alert('Erro de conexão com o servidor.');
          }
        }
      }
    },
    mounted() {
      this.getUsers();
    }
  };
  </script>
  