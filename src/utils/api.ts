export async function fetchResults(query: string) {
    const endpoints = ['people', 'films', 'planets'];
    const results: any = {};

    await Promise.all(
        endpoints.map(async (endpoint) => {
            const response = await fetch(`https://swapi.dev/api/${endpoint}?search=${query}`);
            const data = await response.json();
            results[endpoint] = data.results;
        })
    );

    return results;
}
