import React, { useEffect, useState } from "react";
import { Link, useParams, useHistory } from "react-router-dom";
import { readDeck } from "../utils/api";

// ------- STUDY COMPONENT ------- //
function Study({ cards, setCards }) {
  const [isFlipped, setIsFlipped] = useState(false);
  const [cardIndex, setCardIndex] = useState(0);
  const [deck, setDeck] = useState({});
  const { deckId } = useParams();
  const history = useHistory();

  useEffect(() => {
    readDeck(deckId) // IMPORTED HELPER FUNCTION TO MAKE AN API CALL TO READ DECK
      .then((response) => {
        setDeck(response); // SET DECK STATE TO RESPONSE
        setCards(response.cards); // SET CARDS STATE TO RESPONSE.CARDS
      })
      .catch((error) => {
        console.error(`Failed to load: ${error.message}`); // CATCH ANY ERRORS
      });
  }, [deckId, setCards]); // DECKID AND SETCARDS DEPENDENCY

  // ------- HANDLER FOR FLIP BUTTON ------- //
  const handleFlip = () => setIsFlipped(!isFlipped);

  // ------- HANDLER FOR NEXT BUTTON WITH RESTART PROMPT ------- //
  const handleNext = () => {
    // IF TRUE THERE ARE MORE CARDS TO SHOW
    if (cardIndex < cards.length - 1) {
      setCardIndex(cardIndex + 1); // ADD ONE TO CARDINDEX STATE
      setIsFlipped(false); // SET ISFLIPPED STATE TO BACK FALSE TO SHOW FRONT OF CARD
    } else {
      const confirmed = window.confirm(
        "Restart the deck? Click 'Cancel' to return to the home screen."
      );
      // IF TRUE RESTART DECK OTHERWISE TAKE USER TO HOME
      if (confirmed) {
        setCardIndex(0); // SET CARDINDEX STATE BACK TO ZERO TO RESTART DECK
        setIsFlipped(false);
      } else {
        history.push("/");
      }
    }
  };

  const currentCard = cards[cardIndex]; // CONST VARIABLE TO KEEP TRACK OF CARDS INDEX

  // ------- TERNERY LOGIC IMPLEMENTED AFTER H2 TO DISPLAY CONTENTS ACCORDINGLY ------- //
  return (
    <div>
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <Link to="/">
              <span className="oi oi-home"></span> Home
            </Link>
          </li>
          <li className="breadcrumb-item">
            <Link to={`/decks/${deckId}`}>{deck.name}</Link>
          </li>
          <li className="breadcrumb-item active" aria-current="page">
            Study
          </li>
        </ol>
      </nav>
      <h2>Study: {deck.name}</h2>
      {cards.length >= 3 ? (
        <div className="card">
          <div className="card-body">
            <h5 className="card-title">
              Card {cardIndex + 1} of {cards.length}
            </h5>
            <p className="card-text">
              {isFlipped ? currentCard.back : currentCard.front}
            </p>
            <button className="btn btn-secondary mr-2" onClick={handleFlip}>
              Flip
            </button>
            {isFlipped && (
              <button className="btn btn-primary" onClick={handleNext}>
                Next
              </button>
            )}
          </div>
        </div>
      ) : (
        <div className="alert alert-info">
          <h3>Not enough cards in the deck.</h3>
          <p>You need at least 3 cards to study.</p>
          <Link to={`/decks/${deckId}/cards/new`} className="btn btn-primary">
            <span className="oi oi-plus"></span> Add Cards
          </Link>
        </div>
      )}
    </div>
  );
}

export default Study;
