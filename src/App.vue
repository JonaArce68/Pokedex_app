<template>
  <div id="app">
    <b-row>
      <b-navbar toggleable="md" type="dark" variant="danger">
          <b-container fluid>
              <b-col cols="5" md= "2">
                <b-navbar-brand href="/">
                  <img src="@/assets/pokemon.svg" class="img-fluid " alt="">
                  </b-navbar-brand>
              </b-col>
              <b-col cols="3" md= "2">
                <b-row aling-self="center">
                    <b-col cols="3" md= "2">
                    <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
                  <b-collapse id="nav-collapse" is-nav>
                    <b-navbar-nav>
                      <b-nav-item :to="{name:'home'}" exact>Pokemons</b-nav-item>
                      <b-nav-item :to="{name:'pokemon_cards'}" exact>info</b-nav-item>
                    </b-navbar-nav>
                  </b-collapse>
                  </b-col>
                </b-row>
             </b-col>
          </b-container>
        </b-navbar>
        <b-container>
          <router-view/>
        </b-container>
    </b-row>
  </div>
</template>



