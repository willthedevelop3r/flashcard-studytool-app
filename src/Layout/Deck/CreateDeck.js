import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { createDeck } from '../../utils/api';
import DeckForm from './DeckForm';

// Component to create deck
function CreateDeck({ decks, setDecks }) {
  const history = useHistory();
  const initialForm = {
    name: '',
    description: '',
  };
  const [formData, setFormData] = useState(initialForm);

  // Change handler for input fields
  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  // Submit handler
  const handleSubmit = (event) => {
    event.preventDefault();

    createDeck(formData) // Imported helper function to make api call
      .then((response) => {
        setDecks([...decks, response]); // Set decks with new deck added
        setFormData(initialForm); // Clear the form
        history.push(`/decks/${response.id}`); // Take user to 'view' deck screen
      })
      .catch((error) => {
        console.error(`Error creating deck: ${error.message}`); // Catch any errors
      });
  };

  // Cancel handler takes user to 'home' screen
  const handleCancel = () => {
    history.push('/');
  };

  // Return nav bar and deckform with functionality
  return (
    <div>
      <nav aria-label='breadcrumb'>
        <ol className='breadcrumb'>
          <li className='breadcrumb-item'>
            <Link to='/'>
              <span className='oi oi-home'></span> Home
            </Link>
          </li>
          <li className='breadcrumb-item active' aria-current='page'>
            Create Deck
          </li>
        </ol>
      </nav>
      <DeckForm
        header='Create Deck'
        handleSubmit={handleSubmit}
        handleChange={handleChange}
        handleCancel={handleCancel}
        formData={formData}
        buttonOne='Cancel'
        buttonTwo='Submit'
      />
    </div>
  );
}

export default CreateDeck;
