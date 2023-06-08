import React, { useState, useEffect } from "react";
import { Link, useParams, useHistory } from "react-router-dom";
import { readDeck, updateDeck } from "../../utils/api";
import DeckForm from "./DeckForm";

// ------- COMPONENT TO EDIT DECK ------- //
function EditDeck() {
  const { deckId } = useParams();
  const [deck, setDeck] = useState({ name: "", description: "" });
  const history = useHistory();

  useEffect(() => {
    readDeck(deckId) // IMPORTED HELPER FUNCTION TO MAKE AN API CALL TO READ DECK
      .then(setDeck) // SET DECK STATE TO RESPONSE
      .catch((error) => {
        console.error(`Failed to load deck: ${error.message}`); // CATCH ANY ERRORS
      });
  }, [deckId]); // DECKID DEPENDENCY

  // ------- SUBMIT HANDLER ------- //
  const handleSubmit = (event) => {
    event.preventDefault();
    updateDeck(deck) // IMPORTED HELPER FUNCTION TO MAKE A "PUT" REQUEST TO EDIT DECK
      .then(() => {
        history.push(`/decks/${deckId}`); // TAKE USER TO "VIEW" DECK SCREEN
      })
      .catch((error) => {
        console.error(`Failed to update deck: ${error.message}`); // CATCH ANY ERRORS
      });
  };

  // ------- CHANGE HANDLER FOR INPUT FIELDS ------- //
  const handleChange = (event) => {
    const { name, value } = event.target;
    setDeck({ ...deck, [name]: value });
  };

  // ------- CANCEL HANDLER TAKES USER TO "VIEW" DECK SCREEN ------- //
  const handleCancel = () => {
    history.push(`/decks/${deckId}`);
  };

  // ------- RETURN NAV BAR AND DECKFORM WITH FUNCTIONALITY ------- //
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
            Edit Deck
          </li>
        </ol>
      </nav>
      <DeckForm
        header="Edit Deck"
        handleCancel={handleCancel}
        handleSubmit={handleSubmit}
        handleChange={handleChange}
        formData={deck}
        buttonOne="Cancel"
        buttonTwo="Submit"
      />
    </>
  );
}

export default EditDeck;
