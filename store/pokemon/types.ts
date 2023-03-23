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