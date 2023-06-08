import React from "react";
import { Link, useParams } from "react-router-dom";
import { deleteCard, readDeck } from "../../utils/api";

// ------- COMPONENT TO LIST CARDS ------- ///
function CardsList({ deck, setDeck }) {
  const { deckId } = useParams();
  const { cards = [] } = deck;

  // ------- DELETE HANDLER WITH PROMPT ------- //
  const handleDelete = (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this card?"
    );

    if (confirmed) {
      deleteCard(id) // IMPORTED HELPER FUNCTION TO MAKE A "DELETE" REQUEST
        .then(() => readDeck(deckId)) // IMPORTED HELPER FUNCTION TO MAKE A "FETCH" REQUEST
        .then(setDeck) // SET DECK STATE TO RESPONSE
        .catch((error) => {
          console.error("Error deleting card:", error); // CATCH ANY ERRORS
        });
    }
  };

  // ------- LIST VARIABLE CREATED TO MAP OVER CARDS TO CREATE LIST WITH FUNCTIONALITY ------- //
  const list = cards.map((card) => (
    <li key={card.id}>
      <div className="card mt-3">
        <div className="card-body">
          <h5 className="card-title">Question</h5>
          <p className="card-text">{card.front}</p>
          <h5 className="card-title">Answer</h5>
          <p className="card-text">{card.back}</p>
          <Link
            to={`/decks/${deckId}/cards/${card.id}/edit`}
            className="btn btn-secondary mr-2"
          >
            <span className="oi oi-pencil"></span> Edit
          </Link>
          <button
            className="btn btn-danger"
            onClick={() => handleDelete(card.id)}
          >
            <span className="oi oi-trash"></span>
          </button>
        </div>
      </div>
    </li>
  ));

  // ------- RETURN LIST VARIABLE ------- //
  return (
    <div className="mt-4">
      <h3>Cards</h3>
      <ul className="list-unstyled">{list}</ul>
    </div>
  );
}

export default CardsList;
