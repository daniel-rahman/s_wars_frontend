import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Search.css';

const pageMapping: { [key: string]: string } = {
    people: 'people',
    films: 'pages',
    planets: 'pages',
    species: 'pages',
    starships: 'pages',
    vehicles: 'pages'
};

// test
const Search: React.FC = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [debouncedSearchTerm, setDebouncedSearchTerm] = useState(searchTerm);
    const [results, setResults] = useState<{ [key: string]: any[] }>({});
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedSearchTerm(searchTerm);
        }, 500);

        return () => {
            clearTimeout(handler);
        };
    }, [searchTerm]);

    useEffect(() => {
        if (debouncedSearchTerm) {
            // setIsLoading(true);
            const categories = ['people', 'films', 'planets', 'species', 'starships', 'vehicles'];
            Promise.all(
                categories.map((category) =>
                    fetch(`https://swapi.dev/api/${category}/?search=${debouncedSearchTerm}`)
                        .then(response => response.json())
                        .then(data => ({ category, results: data.results.slice(0, 3) }))
                )
            ).then((data) => {
                const newResults: { [key: string]: any[] } = {};
                data.forEach((item) => {
                    newResults[item.category] = item.results;
                });
                setResults(newResults);
                setIsLoading(false);
            });
        } else {
            setResults({});
        }
    }, [debouncedSearchTerm]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(e.target.value);
        setIsLoading(true);
    };

    return (
        <div className="search-container">
            <input
                style={{ marginTop: '100px' }}
                type="text"
                placeholder="Search Star Wars..."
                value={searchTerm}
                onChange={handleChange}
            />
            {searchTerm && (
                <ul className="autocomplete-list">
                    {isLoading ?
                        (
                            <li className="loading">Loading...</li>
                        )
                        :
                        (
                            <>
                                {
                                    Object.keys(results).map((category) => {
                                        const pageName = pageMapping[category] || 'pages';
                                        // const pageName = category = 'people' ? 'people' : 'pages'
                                        return (<li key={category} className="category-section">
                                            <div className="category-header">
                                                <h3>{category.charAt(0).toUpperCase() + category.slice(1)}</h3>
                                                <button
                                                    className="view-all-button"
                                                    onClick={() => navigate(`/${pageName}?search=${debouncedSearchTerm}`)}
                                                >
                                                    View All
                                                </button>
                                            </div>
                                            <ul>
                                                {results[category].map((item: any) => (
                                                    <li key={item.url}>{item.name || item.title}</li>
                                                ))}
                                            </ul>
                                        </li>)
                                    }
                                    )
                                }
                            </>
                        )}
                </ul>
            )}
        </div>
    );
};

export default Search;
