<template>
  <div class="nav-bar">
    <div>
      <router-link to="/admin/">Dashboard</router-link>
      <router-link to="/store">Loja</router-link>
    </div>
   
  </div>
</template>

<script>
export default {
  name: 'NavBar',
}
</script>

<style scoped>
.nav-bar {
  position: relative;
  display: flex;
  justify-content: center;
  align-content: center;
  background: rgb(0, 206, 206);;
  width: 100vw;
  height: 100%;
  padding: 20px 0px;
}

div {
  display: flex;
  justify-content: space-around;
  align-items: center;
  width: 50vw;
}
.nav-bar a {
  font-weight: 700 !important;
  font-size: 2em;
  color: azure;
  font-weight: 300;
  text-decoration: none;
}

</style>
