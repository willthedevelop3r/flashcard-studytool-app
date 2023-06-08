import React, { useState } from "react";
import { Route, Switch } from "react-router-dom";
import Header from "./Header";
import NotFound from "./NotFound";
import Home from "./Home";
import CreateDeck from "./Deck/CreateDeck";
import View from "./View";
import Study from "./Study";
import CreateCard from "./Card/CreateCard";
import EditCard from "./Card/EditCard";
import EditDeck from "./Deck/EditDeck";

// ------- COMPONENT FOR LAYOUT ------- //
function Layout() {
  const [decks, setDecks] = useState([]);
  const [cards, setCards] = useState([]);
  const [deck, setDeck] = useState({});

  // ------- RETURN COMPONENTS WITH ROUTES AND PROPS PASSED IN ------- //
  return (
    <>
      <Header />
      <div className="container">
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route path="/decks/new">
            <CreateDeck decks={decks} setDecks={setDecks} />
          </Route>
          <Route exact path="/decks/:deckId">
            <View />
          </Route>
          <Route path="/decks/:deckId/study">
            <Study
              cards={cards}
              setCards={setCards}
              deck={deck}
              setDeck={setDeck}
            />
          </Route>
          <Route path="/decks/:deckId/edit">
            <EditDeck />
          </Route>
          <Route path="/decks/:deckId/cards/new">
            <CreateCard
              cards={cards}
              setCards={setCards}
              deck={deck}
              setDeck={setDeck}
            />
          </Route>
          <Route path="/decks/:deckId/cards/:cardId/edit">
            <EditCard />
          </Route>
          <Route path="*">
            <NotFound />
          </Route>
        </Switch>
      </div>
    </>
  );
}

export default Layout;
