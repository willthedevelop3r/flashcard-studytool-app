import React, { useState, useEffect } from 'react';
import { Link, useParams, useHistory } from 'react-router-dom';
import { readDeck, createCard } from '../../utils/api';
import CardForm from './CardForm';

// Component to create card
function CreateCard({ cards, setCards }) {
  const { deckId } = useParams();
  const history = useHistory();
  const [deck, setDeck] = useState({ cards: [] });
  const initialForm = {
    front: '',
    back: '',
  };

  const [formData, setFormData] = useState(initialForm);

  useEffect(() => {
    readDeck(deckId) // Imported helper function to make an api call to read deck
      .then(setDeck) // Setting deck state to response
      .catch((error) => {
        console.error(`Failed to load deck: ${error.message}`); // Catch any errors
      });
  }, [deckId]); // DeckId dependency

  // Change handler for input fields
  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  // Submit handler
  const handleSubmit = (event) => {
    event.preventDefault();
    const newCard = {
      front: formData.front,
      back: formData.back,
      deckId,
    };

    createCard(deckId, newCard) // Call the api helper function
      .then(() => {
        setCards([...cards, newCard]); // Set cards state with new card added
        setFormData(initialForm); // Clear form input fields
      })
      .catch((error) => {
        console.error(`Failed to create deck: ${error.message}`); // Catch any errors
      });
  };

  // Cancel handler takes user to "view" deck page
  const handleCancel = () => {
    history.push(`/decks/${deckId}`);
  };

  // Return nav bar and cardfrom with functionality
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
            Add Card
          </li>
        </ol>
      </nav>
      <CardForm
        header={`${deck.name}: Add Card`}
        handleCancel={handleCancel}
        handleSubmit={handleSubmit}
        handleChange={handleChange}
        formData={formData}
        cancelLabel='Done'
        submitLabel='Save'
      />
    </>
  );
}

export default CreateCard;
