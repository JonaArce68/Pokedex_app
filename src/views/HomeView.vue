<template>
  <div>
    <div v-if="loading" class="text-center">
      <img
        src="@/assets/pokebola.svg"
        class="spinerPokeball d-block mx-auto"
        alt=""
      />
      <p class="h4 mt-5">Cargando Lista de Pokemones...</p>
    </div>
    <div v-else>
      <b-row class="size mt-3 mx-auto my-auto poke-row">
        <div
          style="position: relative; overflow-y: auto; height: 700px"
          data-offset="0"
        >
          <p class="h4 mt-3 text-center">Lista de Pokemones</p>
          <b-col cols="12" class="text-capitalize text-center">
            <b-table
              responsive="md"
              :items="pokemonList"
              hover
              class="table-img"
              :fields="fields"
              @row-clicked="viewPokemonDetail"
            >
              <template #cell(imagen)="data">
                <img :src="data.item.imagen" class="img-poke" />
              </template>
              <template #cell(tipo)="data">
                <b-list-group class="align-items-center">
                  <p
                    v-for="(type, index) in data.item.tipo"
                    :key="index"
                    class="badge rounded-pill w-75"
                    :class="type"
                  >
                    {{ type }}
                  </p>
                </b-list-group>
              </template>
              <template #cell(peso)="data"> {{ data.item.peso }} kg </template>
            </b-table>
          </b-col>
        </div>
      </b-row>
    </div>
  </div>
</template>

<script>
import { http } from "@/utils/axios";

export default {
  name: "Home",

  data() {
    return {
      pokemonList: [],
      fields: ["imagen", "nombre", "tipo", "peso"],
      loading: false,
    };
  },
  methods: {
    // testColor(color, compareColor) {
    //   return color === compareColor;
    // },
    async getItems() {
      this.loading = !false;
      setTimeout(() => {
        this.loading = !true;
      }, 2000);
      try {
        const response = await http.get("/pokemon?limit=30");

        const pokemonRawList = response.data.results;

        const fullList = await Promise.all(
          pokemonRawList.map((pokemonInfo) => {
            return http.get(`/pokemon/${pokemonInfo.name}`);
          })
        );

        this.pokemonList = fullList
          .map((el) => el.data)
          .map((el) => ({
            id: el.id,
            imagen: el.sprites.other.dream_world.front_default,
            nombre: el.name,
            tipo: el.types.map((type) => type.type.name),
            peso: el.weight,
          }));
      } catch (error) {
        console.log(error);
      }
    },
    viewPokemonDetail(row) {
      this.$router.push({
        name: "pokemon",
        params: {
          id: row.id,
        },
      });
    },
  },

  created() {
    this.getItems();
  },
};
</script>

<style >
@import "@/compents/typeColours.css";
@import "@/compents/viewsimilcard.css";
@import "@/compents/scrollbar.css";
.img-poke {
  width: 100%;
  max-width: 80px;
}
.size {
  width: 100%;
  max-width: 700px;
}
.color-txt {
  color: rgb(0, 0, 0);
}
.spinerPokeball {
  width: 100%;
  max-width: 250px;
  animation: load 2s infinite;
  opacity: 90%;
}
</style>