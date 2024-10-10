import React from 'react';
import { Link } from 'react-router-dom';

interface SearchResultsProps {
    results: any;
}

const SearchResults: React.FC<SearchResultsProps> = ({ results }) => {
    return (
        <div>
            {Object.keys(results).map((category) => (
                <div key={category}>
                    <h3>{category}</h3>
                    <ul>
                        {results[category].slice(0, 3).map((item: any, index: number) => (
                            <li key={index}>{item.name || item.title}</li>
                        ))}
                    </ul>
                    <Link to={`/${category}`}>View All</Link>
                </div>
            ))}
        </div>
    );
};

export default SearchResults;
