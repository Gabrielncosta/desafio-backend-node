<template>
  <div class="container">
    <form v-on:submit.prevent="postLogin(email, password)" class="form">
      <input type="email" placeholder="E-mail" v-model="email" />
      <input type="password" placeholder="Password" v-model="password" />
      <button class="button" id="login-btn" v-on:click="postLogin(email, password)">Acessar</button>
      <router-link to="/register" class="create-account" v-on:click="postRegister">Criar nova conta</router-link>
      <router-link to="/recover" id="recover-account">Recuperar senha</router-link>
    </form>
  </div>

</template>

<script>
import api from "../services/api";
import router from "@/router";

export default {
  name: "Login",
  data: () => {
    return {
      email: "",
      password: null
    };
  },
  methods: {
    async postLogin(email, password) {
      const data = {
        email: email,
        password: password
      };
      try {
        const response = await api.post("sessions", data);
        const token = response.data.token;

        sessionStorage.setItem("token", token);
        router.push("/admin/criar-categorias");
      } catch (error) {
        console.log("Erro ao logar no servidor");
      }
    },
    postRegister: () => {
      console.log("Mandando você para tela de registro...");
    }
  }
};
</script>

<style>
 
  #login-btn {
    margin-bottom: 1px;
  }
  
  .create-account {
    text-decoration: none;
    color: #2c3e50;
    margin-top: 10px;
  }

  .create-account:hover {
    cursor: pointer;
    text-decoration: underline;
  }

  #recover-account {
    text-decoration: none;
    color: #2c3e50;
    margin-top: 10px;
  }

  #recover-account:hover {
    cursor: pointer;
    text-decoration: underline;
  }
</style>
