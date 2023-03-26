import { storeToRefs } from "pinia"
import { usePokemonStore } from "~~/store/pokemon"

export const usePokemon = () => {
    const pokemonStore = usePokemonStore()

    const { 
        allPokemon,
        selectedPokemon,
        selectedPokemonSpecies,
        selectedPokemonEvolutionChain
    } = storeToRefs(pokemonStore)

    const {
        setSelectedPokemon,
        setSelectedPokemonSpecies,
        setSelectedPokemonEvolutionChain
    } = pokemonStore

    function statColour(statName: string) {
        if (statName === 'hp') return 'green'
        if (statName === 'attack') return 'red'
        if (statName === 'special-attack') return 'pink'
        if (statName === 'defense') return 'blue'
        if (statName === 'special-defense') return 'indigo'
        if (statName === 'speed') return 'teal'
    }

    function typeColour(typeName: string) {
        if (typeName === 'grass') return '#2E7D32'
        if (typeName === 'fire') return '#E53935'
        if (typeName === 'psychic') return '#EC407A'
        if (typeName === 'water') return '#2196F3'
        if (typeName === 'ice') return '#B3E5FC'
        if (typeName === 'dragon') return '#3F51B5'
        if (typeName === 'electric') return '#FBC02D'
        if (typeName === 'poison') return '#9C27B0'
        if (typeName === 'ghost') return '#311B92'
        if (typeName === 'dark') return '#212121'
        if (typeName === 'ground') return '#4E342E'
        if (typeName === 'rock') return '#8D6E63'
        if (typeName === 'steel') return '#607D8B'
        if (typeName === 'fairy') return '#F06292'
        if (typeName === 'normal') return '#BDBDBD'
        if (typeName === 'fighting') return '#BF360C'
    }

    return {
        allPokemon,
        selectedPokemon,
        selectedPokemonSpecies,
        selectedPokemonEvolutionChain,
        setSelectedPokemon,
        setSelectedPokemonSpecies,
        setSelectedPokemonEvolutionChain,
        statColour,
        typeColour
    }
}