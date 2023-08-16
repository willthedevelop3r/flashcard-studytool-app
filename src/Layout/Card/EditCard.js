import React, { useState, useEffect } from 'react';
import { Link, useParams, useHistory } from 'react-router-dom';
import { readDeck, updateCard, readCard } from '../../utils/api';
import CardForm from './CardForm';

// Component to edit card
function EditCard() {
  const { deckId, cardId } = useParams();
  const history = useHistory();
  const [deck, setDeck] = useState({});
  const [card, setCard] = useState({
    front: '',
    back: '',
    id: cardId,
  });

  useEffect(() => {
    readDeck(deckId) // Imported helper function to make api call
      .then(setDeck) // Set deck state to response
      .catch((error) => {
        console.error(`Failed to load deck: ${error.message}`); // Catch any errors
      });

    readCard(cardId) // Imported helper function to make api call
      .then(setCard) // Set card state to response
      .catch((error) => {
        console.error(`Failed to load card: ${error.message}`); // Catch any errors
      });
  }, [deckId, cardId]); // Dependency

  // Submit handler
  const handleSubmit = (event) => {
    event.preventDefault();

    updateCard(card) // Imported helper function to make api call
      .then(() => {
        history.push(`/decks/${deckId}`); // Take user to 'view' deck page
      })
      .catch((error) => {
        console.error(`Failed to update card: ${error.message}`); // Catch any errors
      });
  };

  // Change handler for input fields
  const handleChange = (event) => {
    const { name, value } = event.target;
    setCard({ ...card, [name]: value });
  };

  // Cancel handler takes user to 'view' deck page
  const handleCancel = () => {
    history.push(`/decks/${deckId}`);
  };

  // Return nav bar and cardform with functionality
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
            Edit Card {cardId}
          </li>
        </ol>
      </nav>
      <CardForm
        header={`${deck.name}: Edit`}
        handleCancel={handleCancel}
        handleSubmit={handleSubmit}
        handleChange={handleChange}
        formData={card}
        cancelLabel='Cancel'
        submitLabel='Save'
      />
    </>
  );
}

export default EditCard;
