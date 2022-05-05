<template>
  <div id="app" class="paginaprincipal">
    <b-container fluid>
      <b-row>
        <b-navbar-brand class="bg-danger" toggleable="sm">
          <a href="/home">
            <img
              src="@/assets/pokemon.svg"
              class="poke-logo mt-1 mb-1 mx-1"
              alt=""
            />
          </a>
        </b-navbar-brand>
      </b-row>
      <router-view />
    </b-container>
  </div>
</template>



<style>
.poke-logo {
  width: 100%;
  max-width: 80px;
}

@keyframes load {
  50% {
    transform: scale(0.7);
  }
}
</style>