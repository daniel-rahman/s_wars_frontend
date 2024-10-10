import React from 'react';
import { Link } from 'react-router-dom';

interface AutocompleteProps {
    results: {
        people: { name: string }[];
        films: { title: string }[];
        planets: { name: string }[];
    };
}

const Autocomplete: React.FC<AutocompleteProps> = ({ results }) => {
    return (
        <div className="autocomplete-container">
            <h3>People</h3>
            <ul>
                {results.people.slice(0, 3).map((person, index) => (
                    <li key={index}>{person.name}</li>
                ))}
                <li><Link to="/people">View All</Link></li>
            </ul>

            <h3>Films</h3>
            <ul>
                {results.films.slice(0, 3).map((film, index) => (
                    <li key={index}>{film.title}</li>
                ))}
                <li><Link to="/films">View All</Link></li>
            </ul>

            <h3>Planets</h3>
            <ul>
                {results.planets.slice(0, 3).map((planet, index) => (
                    <li key={index}>{planet.name}</li>
                ))}
                <li><Link to="/planets">View All</Link></li>
            </ul>
        </div>
    );
};

export default Autocomplete;
