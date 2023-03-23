import { storeToRefs } from "pinia"
import { usePokemonStore } from "~~/store/pokemon"

export const usePokemon = () => {
    const pokemonStore = usePokemonStore()

    const { allPokemon } = storeToRefs(pokemonStore)

    return {
        allPokemon
    }
}