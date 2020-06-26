<template>
  <div class="categories">
    <ul>
      <li v-for="categorie in categories" :key="categorie.name">
        <span v-on:click="categorie.show = !categorie.show">{{ categorie.name }}</span>
        <button>Modificar</button>
        <button>Deletar</button>
        <Product v-if="categorie.show" :product-name="categorie.name"></Product>
      </li>
    </ul>
  </div>
</template>

<script>
import Product from '@/components/Product.vue';
export default {
  name: 'Categories',
  data() {
    return {
      categories: [
        { name: 'eletronic', show: false },
        { name: 'food', show: false },
        { name: 'clothes', show: false }
      ]
    };
  },
  methods: {
    openCategorie() {}
  },
  components: {
    Product
  }
};
</script>

<style scoped>
.categories ul {
  list-style-type: none;
  text-align: start;
  padding: 0;
}
.categories ul li {
  margin: 15px 0;
  padding: 15px 0;
  border: 1px solid black;
  width: 80vw;
}
.categories ul li button {
  padding: 10px 25px;
  margin: 5px;
}
li span {
  padding-left: 10px;
  margin-right: 15px;
}
</style>
