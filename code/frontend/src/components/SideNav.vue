<template>
  <div class="side-nav">
    <ul>
      <li>
        <a v-on:click="dropdownCategory" class="sidenav__items">Categoria</a>
        <ul v-if="categoryDropdown">
          <li class="sidenav__item" v-on:click="emitCreateCategory">Criar categoria</li>
          <li class="sidenav__item" v-on:click="emitListCategory">Listar categorias</li>
        </ul>
      </li>
      <li>
        <a v-on:click="dropdownProducts" class="sidenav__items">Produtos</a>
        <ul v-if="productDropdown">
          <li class="sidenav__item" v-on:click="emitCreateProduct">Criar produto</li>
          <li class="sidenav__item" v-on:click="emitListProduct">Listar produtos</li>
          <li class="sidenav__item" v-on:click="emitProductSellList">Listar vendas de produtos</li>
        </ul>
      </li>
    </ul>
  </div>
</template>
<script>
export default {
  name: 'SideNav',
  data() {
    return {
      name: 'Christopher',
      categoryDropdown: false,
      productDropdown: false
    };
  },
  methods: {
    dropdownCategory() {
      this.categoryDropdown = !this.categoryDropdown;
    },
    dropdownProducts() {
      this.productDropdown = !this.productDropdown;
    },
    emitCreateCategory() {
      this.$emit('emitCreateCategory');
    },
    emitListCategory() {
      this.$emit('emitListCategory');
    },
    emitCreateProduct() {
      this.$emit('emitCreateProduct');
    },
    emitListProduct() {
      this.$emit('emitListProduct');
    },
    emitProductSellList() {
      this.$emit('emitProductSellList');
    }
  }
};
</script>

<style scoped>
/* Estito do NAV */
.side-nav {
  position: relative;
  width: 25vw;
  left: 0;
  top: 0;
  margin: 0;
  height: 83.5vh;
  padding-bottom: 60px;
  background-color: #fff;
  z-index: 999;
  overflow-y: auto;
  will-change: transform;
  box-shadow: none;
  border-right: 1px solid rgba(0, 0, 0, 0.14);
}
@media (max-width: 1024px) {
  .side-nav {
    width: 100vw;
  }
}
/* *********************************** */
.side-nav ul li {
  text-align: start;
  padding-left: 1.5em;
}
/* ****************** */
.side-nav ul .sidenav__items {
  font-size: 1.2em;
  line-height: 44px;
  padding: 0 0 15px 0;
  color: rgba(0, 0, 0, 0.87);
  font-weight: 500;
  text-align: start;
  transition: 500ms;
  user-select: none;
}
.side-nav ul .sidenav__items:hover,
.side-nav ul .sidenav__items:focus {
  text-decoration: underline;
  cursor: pointer;
}
/* **************************** */
.sidenav__item {
  padding-bottom: 5px;
  margin: 5px 0;
  transition: 500ms;
  user-select: none;
}
.sidenav__item:hover,
.sidenav__item:focus {
  text-decoration: underline;
  cursor: pointer;
}
</style>
