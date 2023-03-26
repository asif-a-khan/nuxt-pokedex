export type pokeApiResultsType = {
    count: number,
    prev: string,
    next: string,
    results: Array<pokemonSpeciesType>
}

export type pokemonSpeciesType = {
    name: string,
    url: string
}

export type pokemonAbilityType = {
    ability: {

    },
    is_hidden: boolean,
    slot: number
}

export type selectedPokemonType = {
    abilities: Array<any>,
    base_experience: number | string,
    forms: Array<any>,
    game_indices: Array<any>,
    height: number,
    held_items: Array<any>,
    id: number,
    is_default: boolean,
    location_area_encounters: string,
    moves: Array<any>,
    name: string,
    order: number,
    species: any,
    sprites: any,
    past_types: Array<any>,
    stats: Array<any>,
    types: Array<any>,
    weight: number
}

export type selectedPokemonSpeciesType = {
    base_happiness: number,
    capture_rate: number,
    color: any,
    egg_groups: Array<any>,
    evolution_chain: any,
    evolves_from_species: any,
    flavor_text_entries: Array<any>,
    form_descriptions: Array<any>,
    forms_switchable: boolean,
    gender_rate: number,
    genera: Array<any>,
    generation: any,
    growth_rate: any,
    habitat: any,
    has_gender_differences: boolean,
    hatch_counter: number,
    id: number,
    is_baby: boolean,
    is_legendary: boolean,
    is_mythical: boolean,
    name: string,
    names: Array<any>,
    order: number,
    pal_park_encounters: Array<any>,
    pokedex_numbers: Array<any>,
    shape: any,
    varieties: Array<any>
}

export type selectedPokemonEvolutionChainType = {
    baby_trigger_item: any,
    chain: any,
    id: number | null
}