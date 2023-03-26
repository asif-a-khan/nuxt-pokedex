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
</template>

<script setup lang="ts">
    const { selectedPokemon, statColour, typeColour } = usePokemon()
</script>

<style lang="scss">
.stats-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-gap: 10px;
}
</style>