<template>
  <b-container >
    <b-row>
      <b-col  md-12>
        <b-container fluid>
        <b-table  hover :items="pokemonList" >
          <template #cell(imagen)="data">
               <a href="/pokemon_cards/:id">
               <b-card-img :src="data.item.imagen" class="img-fluid" style="height:100px;width:100px" alt=""></b-card-img>
            </a>
          </template>
          <template #cell(tipo)="data">
              <p v-for="(type, index) in data.item.tipo" :key="index" class="badge bg-secondary">{{ type }}</p>
          </template>
        </b-table>
        </b-container>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>

// @ is an alias to /src
//import HelloWorld from '@/components/HelloWorld.vue'

import { http } from "@/utils/axios";

export default {
  name:'Home',

  data(){
    return{
      pokemonList:{},
      pokemonData:{},
    };
  },
  methods: {
    async getItems() {
      try {
        const response = await http.get("/pokemon/"); //digo que espere hasta que se se carguen los elementos 15 elementos de la api
        const pokemonRawList = response.data.results; //carga los  resultados a la lista pokemonRawList
        const fullList = await Promise.all(   // espera a que todos las promesas se carguen para poder seguir
          pokemonRawList.map((pokemonInfo) => {
            return http.get(`/pokemon/${pokemonInfo.name}`);
          })
        );
        this.pokemonList = fullList
          .map((el) => el.data)
          .map((el) => ({
            imagen: el.sprites.other.dream_world.front_default,
            nombre: el.name,
            tipo: el.types.map((type) => type.type.name),
            peso:el.weight
          }));
      } catch (error) {
        console.log(error);
      }
    },
  },
  created() {
    this.getItems();
  },
};
</script>

<style>
.testmode{
    display: flex;
    overflow-y: auto;
}
</style>>

