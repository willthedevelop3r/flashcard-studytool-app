import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { deleteCard, readDeck } from '../../utils/api';

// Component to list cards
function CardsList({ deck, setDeck }) {
  const { deckId } = useParams();
  const { cards = [] } = deck;

  // Delete handler with prompt
  const handleDelete = (id) => {
    const confirmed = window.confirm(
      'Are you sure you want to delete this card?'
    );

    if (confirmed) {
      deleteCard(id) // Imported helper function to make delete requests
        .then(() => readDeck(deckId)) // Imported helper function to read deck
        .then(setDeck) // Set Deck to response
        .catch((error) => {
          console.error('Error deleting card:', error); // Catch any errors
        });
    }
  };

  // List variable created to map over cards to create list with functionality
  const list = cards.map((card) => (
    <li key={card.id}>
      <div className='card mt-3'>
        <div className='card-body'>
          <h5 className='card-title'>Question</h5>
          <p className='card-text'>{card.front}</p>
          <h5 className='card-title'>Answer</h5>
          <p className='card-text'>{card.back}</p>
          <Link
            to={`/decks/${deckId}/cards/${card.id}/edit`}
            className='btn btn-secondary mr-2'
          >
            <span className='oi oi-pencil'></span> Edit
          </Link>
          <button
            className='btn btn-danger'
            onClick={() => handleDelete(card.id)}
          >
            <span className='oi oi-trash'></span>
          </button>
        </div>
      </div>
    </li>
  ));

  // Return list variable
  return (
    <div className='mt-4'>
      <h3>Cards</h3>
      <ul className='list-unstyled'>{list}</ul>
    </div>
  );
}

export default CardsList;
