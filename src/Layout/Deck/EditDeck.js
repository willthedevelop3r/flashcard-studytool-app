import React, { useState, useEffect } from 'react';
import { Link, useParams, useHistory } from 'react-router-dom';
import { readDeck, updateDeck } from '../../utils/api';
import DeckForm from './DeckForm';

// Component to edit deck
function EditDeck() {
  const { deckId } = useParams();
  const [deck, setDeck] = useState({ name: '', description: '' });
  const history = useHistory();

  useEffect(() => {
    readDeck(deckId) // Imported helper function to make api call
      .then(setDeck) // Set deck state to response
      .catch((error) => {
        console.error(`Failed to load deck: ${error.message}`); // Catch any errors
      });
  }, [deckId]); // Deckid dependency

  // Submit handler
  const handleSubmit = (event) => {
    event.preventDefault();
    updateDeck(deck) // Imported helper function to make an api call
      .then(() => {
        history.push(`/decks/${deckId}`); // Take user to 'view' deck screen
      })
      .catch((error) => {
        console.error(`Failed to update deck: ${error.message}`); // Catch any errors
      });
  };

  // Change handler for input fields
  const handleChange = (event) => {
    const { name, value } = event.target;
    setDeck({ ...deck, [name]: value });
  };

  // Cancel handler takes user to 'view' deck screen
  const handleCancel = () => {
    history.push(`/decks/${deckId}`);
  };

  // Return nav bar and deckform with functionality
  return (
    <>
      <nav aria-label='breadcrumb'>
        <ol className='breadcrumb'>
          <li className='breadcrumb-item'>
            <Link to='/'>
              <span className='oi oi-home'></span> Home
            </Link>
          </li>
          <li className='breadcrumb-item'>
            <Link to={`/decks/${deckId}`}>{deck.name}</Link>
          </li>
          <li className='breadcrumb-item active' aria-current='page'>
            Edit Deck
          </li>
        </ol>
      </nav>
      <DeckForm
        header='Edit Deck'
        handleCancel={handleCancel}
        handleSubmit={handleSubmit}
        handleChange={handleChange}
        formData={deck}
        buttonOne='Cancel'
        buttonTwo='Submit'
      />
    </>
  );
}

export default EditDeck;
