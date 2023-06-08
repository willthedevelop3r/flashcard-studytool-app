import React, { useState, useEffect } from "react";
import { Link, useParams, useHistory } from "react-router-dom";
import { readDeck, updateCard, readCard } from "../../utils/api";
import CardForm from "./CardForm";

// ------- COMPONENT TO EDIT CARD ------- //
function EditCard() {
  const { deckId, cardId } = useParams();
  const history = useHistory();
  const [deck, setDeck] = useState({});
  const [card, setCard] = useState({
    front: "",
    back: "",
    id: cardId,
  });

  useEffect(() => {
    readDeck(deckId) // IMPORTED HELPER FUNCTION TO MAKE AN API CALL TO READ DECK
      .then(setDeck) // SET DECK STATE TO RESPONSE
      .catch((error) => {
        console.error(`Failed to load deck: ${error.message}`); // CATCH ANY ERRORS
      });

    readCard(cardId) // IMPORTED HELPER FUNCTION TO MAKE AN API CALL TO READ CARD
      .then(setCard) // SET CARD STATE TO RESPONSE
      .catch((error) => {
        console.error(`Failed to load card: ${error.message}`); // CATCH ANY ERRORS
      });
  }, [deckId, cardId]); // DECKID AND CARDID DEPENDENCY

  // ------- SUBMIT HANDLER ------- //
  const handleSubmit = (event) => {
    event.preventDefault();

    updateCard(card) // IMPORTED HELPER FUNCTION TO MAKE A "PUT" REQUEST TO EDIT CARD
      .then(() => {
        history.push(`/decks/${deckId}`); // TAKE USER TO "VIEW" DECK PAGE
      })
      .catch((error) => {
        console.error(`Failed to update card: ${error.message}`); // CATCH ANY ERRORS
      });
  };

  // ------- CHANGE HANDLER FOR INPUT FIELDS ------- //
  const handleChange = (event) => {
    const { name, value } = event.target;
    setCard({ ...card, [name]: value });
  };

  // ------- CANCEL HANDLER TAKES USER TO "VIEW" DECK PAGE ------- //
  const handleCancel = () => {
    history.push(`/decks/${deckId}`);
  };

  // ------- RETURN NAV BAR AND CARDFORM WITH FUNCTIONALITY ------- //
  return (
    <>
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
        cancelLabel="Cancel"
        submitLabel="Save"
      />
    </>
  );
}

export default EditCard;
