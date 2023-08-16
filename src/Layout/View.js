import React, { useEffect, useState } from 'react';
import { Link, useParams, useHistory } from 'react-router-dom';
import { readDeck, deleteDeck } from '../utils/api';
import CardsList from './Card/CardsList';

// View component
function View() {
  const { deckId } = useParams();
  const history = useHistory();
  const [deck, setDeck] = useState({ cards: [] });

  // Function to load decks
  function loadingDeck() {
    readDeck(deckId).then(setDeck); // Helper function to make an api call
  }

  useEffect(loadingDeck, [deckId]); // Dependency

  // Delete handler with prompt
  const handleDelete = () => {
    const confirmed = window.confirm(
      'Are you sure you want to delete this deck?'
    );

    if (confirmed) {
      deleteDeck(deckId) // Imported helper function to make api call
        .then(() => {
          history.push('/'); // Take user to home page
        })
        .catch((error) => {
          console.error('Error deleting deck:', error); // Catch any errors
        });
    }
  };

  // Return navbar, buttons, and cardlist with functionality
  return (
    <>
      <nav aria-label='breadcrumb'>
        <ol className='breadcrumb'>
          <li className='breadcrumb-item'>
            <Link to='/'>
              <span className='oi oi-home'></span> Home
            </Link>
          </li>
          <li className='breadcrumb-item active' aria-current='page'>
            {deck.name}
          </li>
        </ol>
      </nav>
      <div>
        <h2>{deck.name}</h2>
        <p>{deck.description}</p>
      </div>
      <div>
        <Link to={`/decks/${deckId}/edit`} className='btn btn-secondary mr-2'>
          <span className='oi oi-pencil'></span> Edit
        </Link>
        <Link to={`/decks/${deckId}/study`} className='btn btn-primary mr-2'>
          <span className='oi oi-book'></span> Study
        </Link>
        <Link
          to={`/decks/${deckId}/cards/new`}
          className='btn btn-primary mr-2'
        >
          <span className='oi oi-plus'></span> Add Cards
        </Link>
        <button className='btn btn-danger' onClick={handleDelete}>
          <span className='oi oi-trash'></span> Delete Deck
        </button>
      </div>
      <div className='mt-4'>
        <CardsList deck={deck} setDeck={setDeck} />
      </div>
    </>
  );
}

export default View;
