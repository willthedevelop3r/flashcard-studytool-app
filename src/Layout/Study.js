import React, { useEffect, useState } from 'react';
import { Link, useParams, useHistory } from 'react-router-dom';
import { readDeck } from '../utils/api';

// Study component
function Study({ cards, setCards }) {
  const [isFlipped, setIsFlipped] = useState(false);
  const [cardIndex, setCardIndex] = useState(0);
  const [deck, setDeck] = useState({});
  const { deckId } = useParams();
  const history = useHistory();

  useEffect(() => {
    readDeck(deckId) // Imported helper function to make an api call
      .then((response) => {
        setDeck(response); // Set deck state to response
        setCards(response.cards); // Set cards state to response
      })
      .catch((error) => {
        console.error(`Failed to load: ${error.message}`); // Catch any errors
      });
  }, [deckId, setCards]); // Dependency

  // Handler for flip button
  const handleFlip = () => setIsFlipped(!isFlipped);

  // Handler for next button with restart prompt
  const handleNext = () => {
    // If true there are more cards to show
    if (cardIndex < cards.length - 1) {
      setCardIndex(cardIndex + 1); // Add one to cardindex state
      setIsFlipped(false); // Set isflipped state to back false to show front of card
      const confirmed = window.confirm(
        "Restart the deck? Click 'Cancel' to return to the home screen."
      );
      // If true restart deck otherwise take user to home
      if (confirmed) {
        setCardIndex(0); // Set cardindex state back to zero to restart deck
        setIsFlipped(false);
      } else {
        history.push('/');
      }
    }
  };

  const currentCard = cards[cardIndex]; // Const variable to keep track of cards index

  // Conditional logic implemented after h2 to display contents accordingly
  return (
    <div>
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
            Study
          </li>
        </ol>
      </nav>
      <h2>Study: {deck.name}</h2>
      {cards.length >= 3 ? (
        <div className='card'>
          <div className='card-body'>
            <h5 className='card-title'>
              Card {cardIndex + 1} of {cards.length}
            </h5>
            <p className='card-text'>
              {isFlipped ? currentCard.back : currentCard.front}
            </p>
            <button className='btn btn-secondary mr-2' onClick={handleFlip}>
              Flip
            </button>
            {isFlipped && (
              <button className='btn btn-primary' onClick={handleNext}>
                Next
              </button>
            )}
          </div>
        </div>
      ) : (
        <div className='alert alert-info'>
          <h3>Not enough cards in the deck.</h3>
          <p>You need at least 3 cards to study.</p>
          <Link to={`/decks/${deckId}/cards/new`} className='btn btn-primary'>
            <span className='oi oi-plus'></span> Add Cards
          </Link>
        </div>
      )}
    </div>
  );
}

export default Study;
