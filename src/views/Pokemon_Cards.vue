<template #cell(image)="data">
 <div>
   <b-row class="imgPokemon">
      <b-card
    title='{data.item.name}'
    img-src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/2.png"
    img-alt="Image"
    img-top
    tag="article"
    style="max-width: 20rem;"
    class="mb-2"
  >
    <b-card-text>
      Some quick example text to build on the card title and make up the bulk of the card's content.
    </b-card-text>

    <b-button href="#" variant="primary">Go somewhere</b-button>
  </b-card>
   </b-row>
 
</div>
</template>
