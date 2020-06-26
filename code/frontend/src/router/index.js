import Vue from 'vue';
import VueRouter from 'vue-router';

import Login from '@/views/LogIn.vue';
import Register from '@/views/Register.vue';
import Recover from '@/views/Recover.vue';
import AdminView from '@/views/Admin.vue';
import Store from '@/views/Store.vue';

import NavBar from '@/components/NavBar'
import CriarCategoria from "@/components/CreateCategory";
import ListarProduto from "@/components/ProductsList"
import ListarCategorias from "@/components/ListCategories";
import CriarProduto from "@/components/CreateProduct.vue";
import ListarVendas from "@/components/ListSales";


import '../assets/styles/global.css';
Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Login',
    component: Login
  }, 
  {
    path: '/register',
    name: 'Register',
    component: Register
  },
  {
    path: '/recover',
    name: 'Recover',
    component: Recover
  },
  {
    path: '/admin',
    name: 'AdminView',
    component: AdminView,
    children: [
      {
        path: '',
        name: 'navbar',
        component: NavBar,
      },
      {
        path: "criar-categorias",
        component: CriarCategoria,
      },
      {
        path: "listar-categorias",
        component: ListarCategorias,
      },
      {
        path: "criar-produto",
        component: CriarProduto,
      },
      {
        path: "listar-produto",
        component: ListarProduto
      },
      {
        path: "listar-vendas",
        component: ListarVendas,
      },
    ]
  },
  {
    path: '/store',
    name: 'Store',
    component: Store,
    children: [
      {
        path: '',
        name: 'navbar',
        component: NavBar,
      },
    ]
  }
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
});

export default router;
