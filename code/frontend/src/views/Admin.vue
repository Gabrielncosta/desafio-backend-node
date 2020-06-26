<template>
<div>
  <NavBar />
  <div class="index__layout">
    <aside class="index__layout-aside">
      <ul class="aside__menu">
  
        <li class="aside__menu-item">
          <span class="aside__menu-listTitle">
            Categoria
          </span>
          <ul>
            <li><router-link to="/admin/criar-categorias">Criar categoria</router-link></li>
            <li>
              <router-link to="/admin/listar-categorias"
                >Listar categorias</router-link
              >
            </li>
          </ul>
        </li>
        <li class="aside__menu-item">
          <span class="aside__menu-listTitle">
            Produtos
          </span>
          <ul>
            <li>
              <router-link to="/admin/criar-produto">Criar produto</router-link>
            </li>
            <li>
              <router-link to="/admin/listar-produto">Listar produtos</router-link>
            </li>
            <li>
              <router-link to="/admin/listar-vendas"
                >Listar vendas</router-link
              >
            </li>
          </ul>
        </li>
      </ul>
    </aside>

    <main class="index__layout-main">
      <div class="index__layout-main--routerWrapper">
        
        <!-- ROTA ANINHADA -->
        <router-view />
      </div>
    </main>
  </div>
</div>
</template>

<script>
import NavBar from '@/components/NavBar'

export default {
  name: "Admin",
  components: {
    NavBar
  },
};

</script>

<style scoped>
a {
  text-decoration: none;
  font-size: 1.2em;
}
.index__layout {
  height: 90vh;
  display: grid;
  grid-template-columns: auto 1fr;
  grid-template-rows: auto 1fr;
  grid-template-areas:
    "header header"
    "aside main";
}

.index__layout-header {
  grid-area: header;

  padding: 20px;
  color: white;
  background: #36b1a0;
  text-align: center;
}
.index__layout-aside {
  grid-area: aside;

  padding: 20px;
}

.aside__menu {
  padding: 0;
}

.aside__menu-item {
  margin-bottom: 2rem;
}

.aside__menu-listTitle {
  font-weight: bold;
  text-transform: uppercase;
  display: block;
  margin-bottom: 10px;
}

.index__layout-main {
  grid-area: main;

  background: #ccc;
  display: flex;
  justify-content: center;
  align-items: center;
}
.index__layout-main--routerWrapper {
  background: white;
  padding: 2rem;
  border-radius: 5px;
  box-shadow: 2px 4px 6px rgba(0, 0, 0, 0.05);
}

</style>