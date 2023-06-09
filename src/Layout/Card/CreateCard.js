import React, { useState, useEffect } from "react";
import { Link, useParams, useHistory } from "react-router-dom";
import { readDeck, createCard } from "../../utils/api";
import CardForm from "./CardForm";

// ------- COMPONENT TO CREATE CARD ------- //
function CreateCard({ cards, setCards }) {
  const { deckId } = useParams();
  const history = useHistory();
  const [deck, setDeck] = useState({ cards: [] });
  const initialForm = {
    front: "",
    back: "",
  };

  const [formData, setFormData] = useState(initialForm);

  useEffect(() => {
    readDeck(deckId) // IMPORTED HELPER FUNCTION TO MAKE AN API CALL TO READ DECK
      .then(setDeck) // SETTING DECK STATE TO RESPONSE
      .catch((error) => {
        console.error(`Failed to load deck: ${error.message}`); // CATCH ERROR
      });
  }, [deckId]); // DECKID DEPENDENCY

  // ------- CHANGE HANDLER FOR INPUT FIELDS ------- //
  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  // ------- SUBMIT HANDLER ------- //
  const handleSubmit = (event) => {
    event.preventDefault();
    const newCard = {
      front: formData.front,
      back: formData.back,
      deckId,
    };

    createCard(deckId, newCard) // IMPORTED HELPER FUNCTION TO MAKE A "POST" REQUEST TO CREATE CARD
      .then(() => {
        setCards([...cards, newCard]); // SET CARDS STATE WITH THE NEW CARD ADDED
        setFormData(initialForm); // CLEAR "FORM" INPUT FIELDS
      })
      .catch((error) => {
        console.error(`Failed to create deck: ${error.message}`); // CATCH ANY ERRORS
      });
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
        cancelLabel="Done"
        submitLabel="Save"
      />
    </>
  );
}

export default CreateCard;
