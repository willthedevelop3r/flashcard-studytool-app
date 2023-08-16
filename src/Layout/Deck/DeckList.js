import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { listDecks, deleteDeck } from '../../utils/api';

// Component to list decks
function DeckList() {
  const [decks, setDecks] = useState([]);

  // Function to handle loaded decks
  function loadingDecks() {
    listDecks() // Imported helper function to make api call
      .then(setDecks) // Set decks state to response
      .catch((error) => {
        console.error(`Error loading deck: ${error.message}`); // Catch any errors
      });
  }

  useEffect(loadingDecks, []); // Call loading decks once

  // Delete handler with prompt
  const handleDelete = (deckId) => {
    const confirmed = window.confirm(
      'Are you sure you want to delete this deck?'
    );

    if (confirmed) {
      deleteDeck(deckId) // Imported helper function to make api call
        .then(loadingDecks) // Call loading decks
        .catch((error) => {
          console.error('Error deleting deck:', error); // Catch any errors
        });
    }
  };

  // List variable created to map over decks to create list with functionality
  const list = decks.map((deck) => (
    <div key={deck.id} className='card w-75 mb-3'>
      <div className='card-body'>
        <h5 className='card-title'>{deck.name}</h5>
        <small>{deck.cards.length} cards</small>
        <p>{deck.description}</p>
        <div className='buttons d-flex justify-content-end'>
          <Link to={`/decks/${deck.id}`} className='btn btn-secondary mr-2'>
            <span className='oi oi-eye'></span> View
          </Link>
          <Link to={`/decks/${deck.id}/study`} className='btn btn-primary'>
            <span className='oi oi-book'></span> Study
          </Link>

          <button
            className='btn btn-danger ml-auto'
            onClick={() => handleDelete(deck.id)}
          >
            <span className='oi oi-trash'></span>
          </button>
        </div>
      </div>
    </div>
  ));

  // Return list variable
  return (
    <>
      <Link to='/decks/new' className='btn btn-secondary'>
        <span className='oi oi-plus' /> Create Deck
      </Link>
      <ul className='list-group mt-2 deck-list'>{list}</ul>
    </>
  );
}

export default DeckList;
