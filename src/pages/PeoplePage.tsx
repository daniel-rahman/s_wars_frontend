import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import BackButton from '../components/BackButton';
import '../styles/PeoplePage.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faPencil, faTrash, faSave, faTimes } from '@fortawesome/free-solid-svg-icons';

interface Person {
    name: string;
    gender: string;
    birth_year: string;
}

const PeoplePage: React.FC = () => {
    const [people, setPeople] = useState<Person[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [editingIndex, setEditingIndex] = useState<number | null>(null);
    const [editedPerson, setEditedPerson] = useState<Person | null>(null);
    const [searchParams] = useSearchParams();
    const searchTerm = searchParams.get('search') || '';

    useEffect(() => {
        setIsLoading(true);
        fetch(`https://swapi.dev/api/people/?search=${searchTerm}`)
            .then(response => response.json())
            .then(data => {
                setPeople(data.results);
                setIsLoading(false);
            })
            .catch(error => {
                console.error('Error fetching people data:', error);
                setIsLoading(false);
            });
    }, [searchTerm]);

    const handleDelete = (index: number) => {
        const newPeople = [...people];
        newPeople.splice(index, 1);
        setPeople(newPeople);
    };

    const handleAdd = () => {
        const newPerson: Person = { name: "New Character", gender: "gender", birth_year: "birth year" };
        setPeople([...people, newPerson]);
    };

    const handleEdit = (index: number) => {
        setEditingIndex(index);
        setEditedPerson({ ...people[index] });
    };

    const handleSave = (index: number) => {
        if (editedPerson) {
            const newPeople = [...people];
            newPeople[index] = editedPerson;
            setPeople(newPeople);
            setEditingIndex(null);
            setEditedPerson(null);
        }
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>, field: keyof Person) => {
        if (editedPerson) {
            setEditedPerson({ ...editedPerson, [field]: e.target.value });
        }
    };

    return (
        <div className="people-page">
            <div style={{
                display: 'flex',
                padding: '20px',
                alignItems: "center"
            }}>

                <BackButton /> <h1 style={{ flexGrow: '1' }}>People</h1>
            </div>
            {!isLoading &&
                <div className='display_flex_row'>
                    <button onClick={handleAdd}><FontAwesomeIcon icon={faPlus} /></button>
                </div>
            }

            {isLoading ? (
                <div className="spinner"></div>
            ) : (
                <table>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Gender</th>
                            <th>Birth Year</th>
                            <th >Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {people.map((person, index) => (
                            <tr key={index}>
                                <td>
                                    {editingIndex === index ? (
                                        <input
                                            type="text"
                                            value={editedPerson?.name || ""}
                                            onChange={(e) => handleInputChange(e, 'name')}
                                        />
                                    ) : (
                                        person.name
                                    )}
                                </td>
                                <td>
                                    {editingIndex === index ? (
                                        <input
                                            type="text"
                                            value={editedPerson?.gender || ""}
                                            onChange={(e) => handleInputChange(e, 'gender')}
                                        />
                                    ) : (
                                        person.gender
                                    )}
                                </td>
                                <td>
                                    {editingIndex === index ? (
                                        <input
                                            type="text"
                                            value={editedPerson?.birth_year || ""}
                                            onChange={(e) => handleInputChange(e, 'birth_year')}
                                        />
                                    ) : (
                                        person.birth_year
                                    )}
                                </td>
                                <td style={{ width: '80px' }}>
                                    <div className='display_flex_row'>

                                        {editingIndex === index ? (
                                            <>
                                                <button title='Save' className='table_icons' onClick={() => handleSave(index)}><FontAwesomeIcon icon={faSave} /> </button>
                                                <button title='Cancel' className='table_icons' onClick={() => setEditingIndex(null)}><FontAwesomeIcon icon={faTimes} /> </button>
                                            </>
                                        ) : (
                                            <>
                                                <button title='Edit' className='table_icons' onClick={() => handleEdit(index)}><FontAwesomeIcon icon={faPencil} /> </button>
                                                <button title='Delete' className='table_icons' onClick={() => handleDelete(index)}><FontAwesomeIcon icon={faTrash} /> </button>
                                            </>
                                        )}
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default PeoplePage;
