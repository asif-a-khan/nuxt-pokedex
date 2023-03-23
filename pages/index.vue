<template>
    <div>
        <header id="headerTag" class="fullHeight" ref="headerTag">
            <!-- Preloader -->
            <Transition name="fade">
                <div class="preloader fullHeight" ref="preloader" v-if="showPreloader">
                    <img src="../assets/white-pokeball.png" alt="">
                </div>
            </Transition>
    
            <!-- Searchbox -->
            <img class="pokemon-logo" src="../assets/pokemon-logo-black.png" alt="pokemon logo">
            <img class="catchphrase" src="../assets/pokemon-catch-black.png" alt="gotta catch em all">
            <form id="search-box" class="search-box" action="" style="position: absolute;">
                <label for="search" class="sr-only">Search</label>
                <v-menu offset="10" location="bottom center">
                    <template v-slot:activator="{ props }">
                        <input 
                            id="search-text" 
                            type="text" 
                            list="poke-list" 
                            name="poke-list" 
                            placeholder="Find pokemon" 
                            class="search-text"
                            v-bind="props"
                            v-model="searchQuery"
                        >
                    </template>
                    <v-list>
                        <v-list-item
                            v-for="(item, index) in matchedPokemon"
                            :key="index"
                            :value="index"
                        >
                            <v-list-item-title @click="(e) => handleSubmit(e, item)">{{ item.name.toUpperCase() }}</v-list-item-title>
                        </v-list-item>
                    </v-list>
                </v-menu>
                <button id="pokeball" class="pokemon-search" value="submit">
                    <img src="../assets/white-pokeball.png" alt="pokeball" class="pkmImage">
                </button>
            </form>
    
            <!-- Direction arrows to the search bar -->
            <div class="arrow">
                <span></span>
                <span></span>
                <span></span>
            </div>
        
        </header>
        <section 
            id="resultsSection" 
            class="fullHeight resultsSection w-100"
            ref="resultsSection" 
            v-show="selectedPokemon"
        >   
            <v-container>
                <v-row justify="center" align="center" class="pt-6 mb-4" v-if="selectedPokemon">
                    <div class="text-h2">You chose... {{ selectedPokemon.name.toUpperCase() }}!</div>
                </v-row>
                <v-row v-if="selectedPokemon">
                    <v-col :cols="12">
                        <v-card color="#1C1B22">
                            <v-container fluid>
                                <v-row>
                                    <v-col cols="6" :style="`background-color: ${typeColour(selectedPokemon.types[0].type.name)}`">
                                        <v-card-text class="d-flex align-center justify-space-between pa-0" style="height: 250px;">
                                            <div class="d-flex flex-column align-center">
                                                <v-img 
                                                    :src="selectedPokemon.sprites.other['official-artwork'].front_default"
                                                    width="200px"
                                                    aspect-ratio="1"
                                                />
                                                <v-card-title class="d-flex align-center justify-center pb-4">{{ selectedPokemon.name.toUpperCase() }}</v-card-title>
                                            </div>
                                            <div class="d-flex flex-column  align-center h-100">
                                                <div class="d-flex flex-column w-100 mb-4">
                                                    <div class="text-h6">Type:</div>
                                                    <div class="stats-grid w-100">
                                                        <v-chip 
                                                            v-for="item in selectedPokemon.types" 
                                                            :color="typeColour(item.type.name)"
                                                            variant="elevated"
                                                            class="text-white"
                                                        >
                                                            {{ item.type.name }}
                                                        </v-chip>
                                                    </div>
                                                </div>
                                                <div class="d-flex flex-column w-100">
                                                    <div class="text-h6">Stats:</div>
                                                    <div class="stats-grid">
                                                        <v-chip 
                                                            v-for="item in selectedPokemon.stats" 
                                                            :color="statColour(item.stat.name)"
                                                            variant="elevated"
                                                        >
                                                            {{ item.stat.name }}: {{ item.base_stat }}
                                                        </v-chip>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="d-flex flex-column align-center h-100">
                                                <div class="d-flex flex-column w-100 mb-4">
                                                    <div class="text-h6">Ablities:</div>
                                                    <div class="stats-grid w-100">
                                                        <v-chip 
                                                            v-for="item in selectedPokemon.abilities.filter((ability: any) => !ability.is_hidden)"
                                                            color="#1C1B22"
                                                            variant="elevated"
                                                            class="text-white"
                                                        >
                                                            {{ item.ability.name }}
                                                        </v-chip>
                                                    </div>
                                                </div>
                                                <div class="d-flex flex-column w-100">
                                                    <div class="text-h6">Hidden Ablities:</div>
                                                    <div class="stats-grid w-100">
                                                        <v-chip 
                                                            v-for="item in selectedPokemon.abilities.filter((ability: any) => ability.is_hidden)"
                                                            color="#1C1B22"
                                                            variant="elevated"
                                                            class="text-white"
                                                        >
                                                            {{ item.ability.name }}
                                                        </v-chip>
                                                    </div>
                                                </div>
                                            </div>
                                        </v-card-text>
                                        
                                    </v-col>
                                    <v-col cols="6">
                                    </v-col>
                                </v-row>
                            </v-container>
                        </v-card>
                    </v-col>
                </v-row>
                <v-row>
                    <v-col v-for="pokemon in relatedPokemon" cols="4">
                        <v-card color="#1C1B22" >
                            <v-card-text class="d-flex align-center justify-center" style="height: 100px;">
                                <v-img 
                                    src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/132.png"
                                    width="100px"
                                    aspect-ratio="1"
                                />
                            </v-card-text>
                            <v-card-title class="d-flex align-center justify-center">{{ pokemon.name }}</v-card-title>
                        </v-card>
                    </v-col>
                </v-row>
            </v-container>
            <v-row class="py-8" justify="center">
                <v-col cols="2" class="d-flex align-end justify-center">
                    <div class="arrow2" @click="scrollToTop">
                        <span></span>
                        <span></span>
                        <span></span>
                    </div>
                </v-col>
            </v-row>
        </section>
    </div>
</template>

<script setup lang="ts">
    const headerTag = ref<null | HTMLDivElement>(null)
    const resultsSection = ref<null | HTMLDivElement>(null)
    const showPreloader = ref(true)

    const { allPokemon } = usePokemon()

    const matchedPokemon = ref<any>([])
    const selectedPokemon = ref<any>(null)
    const selectedPokemonSpecies = ref<any>(null)
    const selectedPokemonEvolutionChain = ref<any>(null)

    const relatedPokemon = ref([
        { name: 'Charizard', type: 'Fire' },
        { name: 'Bulbasaur', type: 'Grass' },
        { name: 'Gyarados', type: 'Water' },
    ])

    const searchQuery = ref("")

    watch(searchQuery, (newVal, oldVal) => {
        if (newVal.length > 0) {
            matchedPokemon.value = allPokemon.value.filter(pokemon => pokemon.name.toLowerCase().includes(newVal.toLowerCase())).slice(0, 5)
        }
        if (newVal.length === 0) matchedPokemon.value = []
    })

    async function handleSubmit (e: any, pokemon: any) {
        try {
            e.preventDefault()
            selectedPokemon.value = await $fetch(pokemon.url)
            selectedPokemonSpecies.value = await $fetch(selectedPokemon.value.species.url)
            selectedPokemonEvolutionChain.value = await $fetch(selectedPokemonSpecies.value.evolution_chain.url)
            console.log("Selected pokemon", toRaw(selectedPokemon.value))
            console.log("Selected pokemon species", toRaw(selectedPokemonSpecies.value))
            console.log("Selected pokemon evolution chain", toRaw(selectedPokemonEvolutionChain.value))
            if (resultsSection.value) {
                resultsSection.value.scrollIntoView({ behavior: 'smooth'})
            }
        } catch(e) {
            console.log("Error after submitting pokemon", e)
        }
        
    }

    async function getEvolutions(speciesUrl: string) {
        try {
            
        } catch(e) {
            console.log("Error getting evolution chain")
        }
    }

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

    const scrollToTop = (e: any) => {
        e.preventDefault
        if (headerTag.value) headerTag.value.scrollIntoView({ behavior: 'smooth'})
    }
    
    onMounted(() => {
        setTimeout(function () {
            showPreloader.value = false
        }, 4000);
    })
</script>

<style lang="scss" scoped>
$white: #fff;
$red: #e84118;
$black: #1e1e1e;

@mixin fontStyling($sizeValue, $weightValue: 400) {
    font-size: $sizeValue;
    font-weight: $weightValue;
}

.fullHeight {
    height: 100vh;
}

.v-overlay__content {
    left: 10px !important;
}

.sr-only { 
    position: absolute; 
    width: 1px; 
    height: 1px; 
    margin: -1px; 
    border: 0; 
    padding: 0; 
    white-space: nowrap; 
    clip-path: inset(100%); 
    clip: rect(0 0 0 0); 
    overflow: hidden;
}

.pkmImage {
    object-fit: contain;
    max-width: 80px;
    max-height: 80px;
}
.fade-enter-active,
.fade-leave-active {
    transition: 
    opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
    opacity: 0;
}
header {
    background-color: $red;
    position: relative;
    min-height: 700px;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
}

.resultsSection {
    background-color: #1C1B22;
}

// bouncing pokemon animation
.preloader {
    width: 100vw;
    background-color: $red;
    position: fixed;
    z-index: 50;
    img {
        width: 80px;
        height: 80px;
        position: relative;
        z-index: 100;
        left: 0;
        top: 0;
        transform: translate(-50%, -50%);
        animation: bounce 3s linear forwards;
    }
}

@keyframes bounce {
    16%, 48%, 78%  {
        top: 50%;
        animation-timing-function: ease-out;
    }
    32% {
        top: 12.5%;
        animation-timing-function: ease-in;
    }
    62% {
        top: 25%;
        animation-timing-function: ease-in;
    }
    90% {
        top: 37.5%;
        animation-timing-function: ease-in;
    }
    100% {
        top: 50%;
        animation-timing-function: ease-out;
        left: 50%;
    }
}

// pokemon logo and catchphrase styling
.pokemon-logo,
.catchphrase {
    left: 50%;
    transform: translate(-50%, -50%);
}

.pokemon-logo {
    width: 400px;
    position: absolute;
    top: 100px;
}

.catchphrase {
    width: 350px;
    position: absolute;
    top: 220px;
}

// expanding searchbox styling
.search-box {
    box-sizing: content-box;
    background-color: $black;
    height: 80px;
    border-radius: 80px;
    padding: 10px;
    &:hover > .search-text,
    &:focus > .search-text {
        width: 400px;
        padding-left: 20px;
    }
    &:hover > .pokemon-search,
    &:focus > .pokemon-search {
        background-color: $red;
    }
}

.pokemon-search {
    float: right;
    width: 80px;
    height: 80px;
    border-radius: 50%;
    background-color: $black;
    display: flex;
    justify-content: center;
    align-items: center;
    transition: 1s;
}

.search-text {
    border: none;
    background: none;
    outline: none;
    float: left;
    padding: 0;
    color: $white;
    font-family: 'Raleway', sans-serif;
    line-height: 80px;
    width: 0px;
    transition: 1s;
    padding-right: 15px;
    @include fontStyling(4rem);
    &:focus-within {
        width: 400px;
        padding-left: 20px;
    }
}


// arrow animation styling
.arrow {
    text-align: center;
    position: absolute;
    bottom: 10%;
    left: 50%;
    span {
        display: block;
        width: 50px;
        height: 50px;
        padding: 0px;
        border-bottom: 10px solid $black;
        border-right: 10px solid $black;
        transform: translateX(-50%) rotate(225deg);
        animation: flash 3s 2s infinite;
        opacity: 0;
        &:nth-of-type(2) {
            animation: flash 3s 1s infinite;
        }
        &:nth-of-type(3) {
            animation: flash 3s 0s infinite;
        }
    }
}
.arrow2 {
    display: grid;
    place-items: center;
    cursor: pointer;
    span {
        display: block;
        width: 50px;
        height: 50px;
        padding: 0px;
        border-bottom: 10px solid $white;
        border-right: 10px solid $white;
        transform: translateX(-50%) rotate(225deg);
        animation: flash 3s 2s infinite;
        opacity: 0;
        &:nth-of-type(2) {
            animation: flash 3s 1s infinite;
        }
        &:nth-of-type(3) {
            animation: flash 3s 0s infinite;
        }
    }
}

.stats-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-gap: 10px;
}

@keyframes flash {
    0%, 50%, 75%, 100% {
        opacity: 0;
    }
    25% {
        opacity: 1;
    }
}

// if promise fails, this will print
.error {
    p {
        @include fontStyling(3rem);
        color: $white;
        padding: 40px 0;
    }
}
</style>