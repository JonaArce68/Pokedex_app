
<template>
  <b-container>
    <div v-if="loading" class="text-center">
      <img
        src="@/assets/pokebola.svg"
        class="spinerPokeball d-block mx-auto"
        alt=""
      />
      <p class="h4 mt-5">Cargando Pokemon...</p>
    </div>
    <div v-else>
      <b-row class="poke-row mx-auto my-auto mt-3">
        <b-col cols="12" md="12" class="m-3">
          <p class="h3 text-capitalize">
            {{ pokemonData.orden }} - {{ pokemonData.name }}
          </p>
        </b-col>

        <b-col cols="12" md="8" align-self="center" class="text-center">
          <img :src="pokemonData.image" class="w-100 img-pokemon" />
        </b-col>

        <b-col cols="12" md="4">
          <b-list-group class="w-100">
            <p class="h6">Estadisticas</p>
            <div v-for="stat in pokemonData.stats" :key="stat.name">
              <div class="col-sm-12 text-start small">
                <img src="" alt="" />{{ stat.name }}:
              </div>
              <div class="col-sm-12">
                <b-progress
                  :value="stat.value"
                  show-value
                  :variant="barVariant(stat.name)"
                  class="bg-gray"
                ></b-progress>
              </div>
            </div>
          </b-list-group>
        </b-col>

        <b-col cols="12" md="12">
          <b-card-text class="mt-3">
            <span class="h6">- {{ pokemonData.description }}.</span>
          </b-card-text>
          <b-col
            cols="3"
            v-for="type in pokemonData.types"
            :key="type.name"
            variant="info"
            class="badge mb-2 mx-1"
            :class="type.name"
            >{{ type.name }}</b-col
          >
          <nav>
            <ul class="nav">
              <li class="nav-item mx-1 mb-2 border btn btn-outline-secondary">
                <a class="nav-link" href="#Habilidades"
                  ><p class="h6 mt-1 mb-1 color-txt">Habilidades</p></a
                >
              </li>
              <li class="nav-item mx-1 mb-2 border btn btn-outline-secondary">
                <a class="nav-link" href="#Movimientos"
                  ><p class="h6 mt-1 mb-1 color-txt">Movimientos</p></a
                >
              </li>
            </ul>
          </nav>
          <div
            class="mb-3"
            style="position: relative; overflow-y: auto; height: 250px"
            data-offset="0"
          >
            <div></div>
            <p class="h6" id="Habilidades">Habilidades</p>
            <p>
              <b-list-group-item
                v-for="ability in pokemonData.abilities"
                :key="ability.name"
                ><h6>{{ ability.name }}</h6>
                - {{ ability.description }}
              </b-list-group-item>
            </p>

            <p class="h6" id="Movimientos">Movimientos</p>
            <b-list-group-item
              v-for="move in pokemonData.moves"
              :key="move.name"
              ><p>- {{ move.name }}</p>
            </b-list-group-item>
          </div>
        </b-col>
      </b-row>
    </div>
  </b-container>
</template>




<script>
import { http, httpWithoutUrl } from "../utils/axios";

export default {
  data() {
    return {
      pokemonData: {},
      loading: false,
    };
  },

  methods: {
    barVariant(variant) {
      const variants = {
        PS: "danger opacity-75",
        Ataque: "black opacity-75",
        Defensa: "secondary opacity-75",
        "Ataque Especial": "success opacity-50",
        "Defensa Especial": "primary opacity-75",
        Velocidad: "warning",
      };

      return variants[variant];
    },
    async makeAbilities(rawData) {
      try {
        const resp = await Promise.all(
          rawData.map(async (raw) => {
            return await httpWithoutUrl.get(raw.ability.url);
          })
        );
        const abilityData = resp.map((el) => el.data);
        return abilityData.map((data) => {
          return {
            name: data.names.find((name) => name.language.name === "es").name,
            description: data.flavor_text_entries.find(
              (flavor) => flavor.language.name === "es"
            ).flavor_text,
          };
        });
      } catch (error) {
        console.log(error);
      }
    },
    async makeStats(stats) {
      try {
        const resp = await Promise.all(
          stats.map(async (stat) => {
            return await http.get(`/stat/${stat.stat.name}`);
          })
        );
        const statData = resp.map((el) => el.data);
        return statData.map((data, index) => {
          return {
            name: data.names.find((name) => name.language.name === "es").name,
            value: stats[index].base_stat,
          };
        });
      } catch (error) {
        console.log("Error: ", error);
      }
    },
    async makeTypes(types) {
      try {
        const resp = await Promise.all(
          types.map(async (type) => {
            return await httpWithoutUrl.get(type.type.url);
          })
        );
        const typeData = resp.map((el) => el.data);
        return typeData.map((data) => {
          return {
            name: data.names.find((name) => name.language.name === "es").name,
          };
        });
      } catch (error) {
        console.log(error);
      }
    },
    async makeMoves(moves) {
      try {
        const resp = await Promise.all(
          moves.map(async (move) => {
            return await httpWithoutUrl.get(move.move.url);
          })
        );
        const moveData = resp.map((el) => el.data);
        return moveData.map((data) => {
          return {
            name: data.names.find((name) => name.language.name === "es").name,
          };
        });
      } catch (error) {
        console.log(error);
      }
    },
  },
  async created() {
    this.loading = !false;
    setTimeout(() => {
      this.loading = !true;
    }, 2500);
    try {
      const [pokemonResp, characteristicResp] = await Promise.all([
        http.get(`/pokemon/${this.$route.params.id}`),
        await http.get(`/characteristic/${this.$route.params.id}`),
      ]);

      const pokemonRawData = pokemonResp.data;
      const abilities = await this.makeAbilities(pokemonRawData.abilities);
      const stats = await this.makeStats(pokemonRawData.stats);
      const types = await this.makeTypes(pokemonRawData.types);
      const moves = await this.makeMoves(pokemonRawData.moves);

      this.pokemonData = {
        id: pokemonRawData.id,
        orden: pokemonRawData.order,
        name: pokemonRawData.name,
        image: pokemonRawData.sprites.other.dream_world.front_default,
        abilities,
        exp: pokemonRawData.base_experience,
        stats,
        types,
        moves,
        description: characteristicResp.data.descriptions.find(
          (desc) => desc.language.name === "es"
        ).description,
      };
    } catch (error) {
      console.log(error);
    }
  },
};
</script>

<style>

.img-pokemon {
  max-width: 180px;
}
</style>


