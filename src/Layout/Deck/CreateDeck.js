import React, { useState } from "react"; // USE EFFECT IS ONLY FOR TESTING
import { Link, useHistory } from "react-router-dom";
import { createDeck } from "../../utils/api";
import DeckForm from "./DeckForm";

// ------- COMPONENT TO CREATE DECK ------- //
function CreateDeck({ decks, setDecks }) {
  const history = useHistory();
  const initialForm = {
    name: "",
    description: "",
  };
  const [formData, setFormData] = useState(initialForm);

  // ------- CHANGE HANDLER FOR INPUT FIELDS ------- //
  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  // ------- SUBMIT HANDLER ------- //
  const handleSubmit = (event) => {
    event.preventDefault();

    createDeck(formData) // IMPORTED HELPER FUNCTION TO MAKE A "POST" REQUEST TO CREATE DECK
      .then((response) => {
        setDecks([...decks, response]); // SET DECKS STATE WITH NEW DECK ADDED
        setFormData(initialForm); // CLEAR THE "FORM" INPUT FIELDS
        history.push(`/decks/${response.id}`); // TAKE USER TO "VIEW" DECK SCREEN WHEN SUBMIT IS CLICKED
      })
      .catch((error) => {
        console.error(`Error creating deck: ${error.message}`); // CATCH ANY ERRORS
      });
  };

  // ------- CANCEL HANDLER TAKES USER TO "HOME" SCREEN ------- //
  const handleCancel = () => {
    history.push("/");
  };

  // ------- RETURN NAV BAR AND DECKFORM WITH FUNCTIONALITY ------- //
  return (
    <div>
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <Link to="/">
              <span className="oi oi-home"></span> Home
            </Link>
          </li>
          <li className="breadcrumb-item active" aria-current="page">
            Create Deck
          </li>
        </ol>
      </nav>
      <DeckForm
        header="Create Deck"
        handleSubmit={handleSubmit}
        handleChange={handleChange}
        handleCancel={handleCancel}
        formData={formData}
        buttonOne="Cancel"
        buttonTwo="Submit"
      />
    </div>
  );
}

export default CreateDeck;
