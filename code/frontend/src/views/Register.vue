<template>
  <div class="container">
    <form v-on:submit.prevent="postForm(username, email, password)" class="form">
      <input type="text" placeholder="Nome" v-model="username" />
      <input type="email" placeholder="E-mail" v-model="email" />
      <input type="password" placeholder="Password" v-model="password" />
      <button class="button" type="submit" >Criar Conta</button>
    </form>
  </div>
</template>

<script>
import api from '../services/api';
import router from "@/router";

export default {
  name: 'Register',
  data: () => {
    return {
      username: '',
      email: '',
      password: null
    };
  },
  methods: {
    async postForm(username, email, password) {
      const data = {
        name: username,
        email: email,
        password: password
      };
      try {
        const response = await api.post('users', data);
        router.push("/");
        console.log(`A resposta da API foi: ${response.data}`);
      } catch (error) {
        console.log(`Erro ao cadastrar: ${error}`);
      }
    }
  }
};
</script>
