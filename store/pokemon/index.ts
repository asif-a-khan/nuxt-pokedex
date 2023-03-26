import { 
    pokeApiResultsType,
    selectedPokemonType,
    selectedPokemonSpeciesType,
    selectedPokemonEvolutionChainType
} from "./types"

const allSpecies: pokeApiResultsType = await $fetch('https://pokeapi.co/api/v2/pokemon/?limit=1500')

export const usePokemonStore = defineStore('pokemonStore', () => {
    const allPokemon = ref([...allSpecies.results])

    const selectedPokemon = ref<selectedPokemonType | null>(null)

    const selectedPokemonSpecies = ref<selectedPokemonSpeciesType | null>(null)
    
    const selectedPokemonEvolutionChain = ref<selectedPokemonEvolutionChainType | null>(null)
    
    const setSelectedPokemon = (newPokemon: selectedPokemonType) => selectedPokemon.value = {...newPokemon}
    
    const setSelectedPokemonSpecies = (newPokemonSpecies: selectedPokemonSpeciesType) => selectedPokemonSpecies.value = {...newPokemonSpecies}

    const setSelectedPokemonEvolutionChain = (newPokemonEvolutionChain: selectedPokemonEvolutionChainType) => selectedPokemonEvolutionChain.value = {...newPokemonEvolutionChain}

    return {
        allPokemon,
        selectedPokemon,
        selectedPokemonSpecies,
        selectedPokemonEvolutionChain,
        setSelectedPokemon,
        setSelectedPokemonSpecies,
        setSelectedPokemonEvolutionChain
    }
})