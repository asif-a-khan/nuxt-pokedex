<template>
    <v-card color="#1C1B22" v-if="selectedPokemon">
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
                                        @click="handleAbility(item)"
                                        prepend-icon="mdi-gesture-tap"
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
                                        @click="handleAbility(item)"
                                        prepend-icon="mdi-gesture-tap"
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
        <v-expand-transition>
            <v-card
                v-show="overlay"
                :class="`${overlay ? 'expand-reveal' : 'expand-close'}`"
                class="d-flex flex-column justify-space-between"
                style="height: 100%;"
            >   
                <v-card-title class="text-h4 text--primary mb-2 py-2">{{ firstLetterCapital(abilityName) }}</v-card-title>
                <v-card-text>
                    <p>{{ firstLetterCapital(abilityDescription) }}</p>
                </v-card-text>
                <v-card-actions class="py-4 d-flex">
                    <v-btn
                        variant="text"
                        color="teal-accent-4"
                        @click="handleOverlayClose"
                    >
                        Close
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-expand-transition>
    </v-card>
</template>

<script setup lang="ts">
    const { selectedPokemon, statColour, typeColour } = usePokemon()

    // Ability expand overlay
    //  --> State
    const overlay = ref(false)
    const abilityName = ref<string>('')
    const abilityDescription = ref<string>('')

    //  --> Methods
    const handleOverlay = () => overlay.value = !overlay.value

    const handleOverlayClose = () => {
        abilityName.value = ''
        abilityDescription.value = ''
        overlay.value = !overlay.value
    }

    const handleAbility = async (item: any) => {
        try {
            const res = await $fetch(item.ability.url)
            const name: string = item.ability.name
            const description = res.effect_entries.find((x: any) => x.language.name === 'en').effect
            abilityName.value = name
            abilityDescription.value = description
            handleOverlay()
        } catch(e) {
            console.log("Error fetching ability")
        }
    }

    const firstLetterCapital = (text: string) => {
        if (text) return text.charAt(0).toUpperCase() + text.slice(1);
    }
</script>

<style lang="scss">
.stats-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-gap: 10px;
}

.expand-reveal {
    bottom: 0;
    opacity: 1 !important;
    position: absolute;
    width: 100%;
    height: 100%;
    animation-name: expand;
    animation-duration: 0.2s;
    animation-fill-mode: forwards;
}

.expand-close {
    bottom: 0;
    opacity: 1 !important;
    position: absolute;
    width: 100%;
    height: 0%;
    animation-name: expand-close;
    animation-duration: 0.2s;
    animation-fill-mode: forwards;
}

@keyframes expand {
    0%   {height: 0%;}
    100% {height: 100%;}
}

@keyframes expand-close {
    0%   {height: 100%;}
    100% {height: 0%;}
}
</style>