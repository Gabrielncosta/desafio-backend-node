<template>
  <div class="container">
    <!-- Tela inicial -->
    <form 
      v-on:submit.prevent="postRecover(email, redirect_url)" 
      v-if="!recoverySent && !linkSent" class="form"
    > 
      <p>Insira seu e-mail e verifique o código enviado para recuperar sua senha. </p>
      <input type="email" placeholder="E-mail" v-model="email" />
      <button class="button" type="submit">Recuperar senha</button>
    </form>
    <!-- Tela após enviar o código para o email. -->
    <div v-if="linkSent">
      <p>Um e-mail foi enviado com a instruções para a criação de sua nova conta.</p>
      <p class="not-recived">
        Não recebeu o código?
        <span v-on:click="tryAgain">Clique aqui</span> para enviar novamente.
      </p>
    </div>
    <!-- Tela quando clica do email -->
    <form
    v-on:submit.prevent="changePassword" 
    v-if="recoverySent && !linkSent" class="recovery-container">
      <i class="fas fa-arrow-left fa-2x" id="return" v-on:click="recoverySent = !recoverySent"></i>
      <p>Digite sua nova senha.</p>
      <input type="password" v-model="password" />
      <button class="button" type="submit">Enviar</button>
    </form>
  </div>
</template>

<script>
import api from "../services/api";
import router from "@/router";

export default {
  name: "Recover",
  data() {
    return {
      username: "",
      email: "",
      redirect_url: "localhost:8080/recover",
      password: null,
      recoverySent: false,
      linkSent: false
    };
  },
  beforeMount() {
    if (this.$route.query.token !== undefined) {
      this.token = this.$route.query.token.replace(/^"(.*)"$/, "$1");
      this.recoverySent = true;
    }
  },
  methods: {
    async postRecover(email, redirect_url) {
      const data = {
        email,
        redirect_url,
      };
      try {
        const response = await api.post("passwords", data);
        console.log(response);
        this.linkSent = !this.linkSent;
      } catch (error) {
        console.log(`There was an error...${error}`);
      }
    },
    tryAgain() {
      this.email = null;
      this.linkSent = !this.linkSent;
    },
    async changePassword() {
      const data = {
        token: this.token,
        password: this.password
      };

      try {
        console.log(this.token);
        const response = await api.put("passwords", data);
        router.push("/");
        console.log(response.data);
        console.log(`Your new password is: ${data.password}`);
      } catch (error) {
        console.log(error);
      }
    }
  }
};
</script>

<style>


.recovery-container {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}

#return:hover,
#return:focus {
  cursor: pointer;
}
.not-recived span {
  color: rgb(106, 158, 75);
}
.not-recived span:hover {
  text-decoration: underline;
  cursor: pointer;
}
</style>
