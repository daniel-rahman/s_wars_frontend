const BASE_URL = 'https://swapi.dev/api';

export const searchEntity = async (entity: string, query: string) => {
    const response = await fetch(`${BASE_URL}/${entity}/?search=${query}`);
    if (!response.ok) {
        throw new Error(`Failed to fetch ${entity}`);
    }
    const data = await response.json();
    return data.results;
};

export const searchAllEntities = async (query: string) => {
    const entities = ['people', 'films', 'planets', 'species', 'starships', 'vehicles'];
    const requests = entities.map((entity) => searchEntity(entity, query));
    const results = await Promise.all(requests);

    return {
        people: results[0],
        films: results[1],
        planets: results[2],
        species: results[3],
        starships: results[4],
        vehicles: results[5],
    };
};
