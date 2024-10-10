import React, { useState, useEffect } from 'react';
import { searchEntity } from '../services/swapiService';

const CategoryPage: React.FC = () => {
    const [people, setPeople] = useState<any[]>([]);

    useEffect(() => {
        const fetchPeople = async () => {
            const response = await searchEntity('people', '');
            setPeople(response.data.results);
        };

        fetchPeople();
    }, []);

    const handleDelete = (index: number) => {
        const updatedPeople = [...people];
        updatedPeople.splice(index, 1);
        setPeople(updatedPeople);
    };

    const handleCreate = () => {
        setPeople([...people, { name: 'New Character' }]);
    };

    return (
        <div>
            <h1>People</h1>
            <button onClick={handleCreate}>Create</button>
            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {people.map((person, index) => (
                        <tr key={index}>
                            <td>{person.name}</td>
                            <td>
                                <button onClick={() => handleDelete(index)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default CategoryPage;
