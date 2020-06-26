<template>
    <div>
      <button type="button" @click.stop.prevent="toggle()">Categorias</button>
      <div v-show="isOpen">
        <ul>
          <li>Televisões</li>
          <li>Comidas</li>
          <li>Chinelos</li>
        </ul>
      </div>
    </div>
</template>

<style>
    div button {
      padding:3vh;
      border:none;
    }
    div div ul{
      background-color:white;
      position:absolute;
    }
    div div ul li{
      font-size:0.9rem;
      list-style-type: none;
      padding:1vh 1.4vw;
    }
</style>
<script>
export default {
    name: 'Dropdown',
    data(){
      return{
        isOpen: false,
      };
    },
    methods: {
      toggle(){
        this.isOpen = !this.isOpen;
      },
    }
};
</script>