import { pokeApiResultsType } from "./types"

const allSpecies: pokeApiResultsType = await $fetch('https://pokeapi.co/api/v2/pokemon/?limit=1500')

export const usePokemonStore = defineStore('pokemonStore', () => {
    const allPokemon = ref([...allSpecies.results])

    return {
        allPokemon
    }
})