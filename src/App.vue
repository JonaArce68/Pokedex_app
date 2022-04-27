<template>
  <div id="app">
    <b-container fluid >
      
      <b-row>
        
        <b-navbar-brand href="/home" class="bg-danger" toggleable="sm" >
          <img src="@/assets/pokemon.svg" class="poke-logo mt-1 mb-1 mx-1" alt="" />
        </b-navbar-brand>
      </b-row>
      <router-view />
    </b-container>
  </div>
</template>



<style>
.poke-logo{
  width: 100%;
  max-width: 80px;
}

</style>