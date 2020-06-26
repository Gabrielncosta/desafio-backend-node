<template>
  <div class="create-category">
    <form v-on:submit.prevent="createCategory" class="form category">
      <label>Crie uma nova categoria</label>
      <input type="text" placeholder="Name" v-model="name" />
      <button class="button" type="submit">Criar</button>
    </form>
  </div>
</template>

<script>
import api from '@/services/api';
export default {
  name: 'CreateCategory',
  data() {
    return {
      name,
    };
  },
  methods: {
    async createCategory() {
      const vm = this;
      const data = {
        name: vm.name
      };
      try {
        const response = await api.post('category', data, {
        });
        console.log(response)
        console.log(`Category name: ${response.data.name} and ID: ${response.data.id}`);
        vm.$emit('categoryCreated', vm.$options.name);
      } catch (error) {
        console.log(`There was a error:${error}`);
      }
    }
  }
};
</script>
