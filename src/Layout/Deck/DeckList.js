import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { listDecks, deleteDeck } from "../../utils/api";

// ------- COMPONENT TO LIST DECKS ------- //
function DeckList() {
  const [decks, setDecks] = useState([]);

  // ------- FUNCTION TO HANDLE LOADED DECKLIST ------- //
  function loadingDecks() {
    listDecks() // IMPORTED HELPER FUNCTION TO MAKE AN API CALL TO FETCH DECKS
      .then(setDecks) // SET DECKS STATE TO RESPONSE
      .catch((error) => {
        console.error(`Error loading deck: ${error.message}`); // CATCH ANY ERRORS
      });
  }

  useEffect(loadingDecks, []); // CALL LOADINGDECKS ONCE

  // ------- DELETE HANDLER WITH PROMPT ------- //
  const handleDelete = (deckId) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this deck?"
    );

    if (confirmed) {
      deleteDeck(deckId) // IMPORTED HELPER FUNCTION TO MAKE A "DELETE" REQUEST TO DELETE DECK
        .then(loadingDecks) // CALL LOADINGDECKS FUNCTION
        .catch((error) => {
          console.error("Error deleting deck:", error); // CATCH ANY ERRORS
        });
    }
  };

  // ------- LIST VARIABLE CREATED TO MAP OVER DECKS TO CREATE LIST WITH FUNCTIONALITY ------- //
  const list = decks.map((deck) => (
    <div key={deck.id} className="card w-75 mb-3">
      <div className="card-body">
        <h5 className="card-title">{deck.name}</h5>
        <small>{deck.cards.length} cards</small>
        <p>{deck.description}</p>
        <div className="buttons d-flex justify-content-end">
          <Link to={`/decks/${deck.id}`} className="btn btn-secondary mr-2">
            <span className="oi oi-eye"></span> View
          </Link>
          <Link to={`/decks/${deck.id}/study`} className="btn btn-primary">
            <span className="oi oi-book"></span> Study
          </Link>

          <button
            className="btn btn-danger ml-auto"
            onClick={() => handleDelete(deck.id)}
          >
            <span className="oi oi-trash"></span>
          </button>
        </div>
      </div>
    </div>
  ));

  // ------- RETURN LIST VARIABLE ------- //
  return (
    <>
      <Link to="/decks/new" className="btn btn-secondary">
        <span className="oi oi-plus" /> Create Deck
      </Link>
      <ul className="list-group mt-2 deck-list">{list}</ul>
    </>
  );
}

export default DeckList;
