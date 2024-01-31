import "./App.css";

import { Player } from "./components/Player";
import { attributes } from "./attributes";
import { useEffect, useState } from "react";

function App() {
  const getFromLocalStorage = (attribute) => {
    const value = localStorage.getItem(attribute);

    if (!value) {
      return;
    }

    console.log(attribute, value);

    return JSON.parse(value);
  };

  const setToLocalStorage = (attribute, value) => {
    localStorage.setItem(attribute, JSON.stringify(value));
  };

  const [hands, setHands] = useState(getFromLocalStorage("hands") ?? 1);
  const [players, setPlayers] = useState(getFromLocalStorage("players") ?? []);

  useEffect(() => {
    setToLocalStorage("hands", hands);
  }, [hands]);

  useEffect(() => {
    setToLocalStorage("players", players);
  }, [JSON.stringify(players)]);

  const resetGame = () => {
    setPlayers(() => []);
    setHands(() => 1);
  };

  const handleReset = () => {
    const areYouSure = window.confirm("Are you sure you want to reset game?");

    if (areYouSure) {
      resetGame();
    }
  };

  const handleAddNewPlayer = () => {
    setPlayers((players) => [
      ...players,
      {
        id: players.length,
        name: "new player",
        ...attributes.reduce((acc, attribute) => {
          acc[attribute] = 0;

          return acc;
        }, {}),
      },
    ]);
  };

  const findAndIncrementAttribute = (id, attributeName) => () => {
    setPlayers((players) =>
      players.map((player) => {
        if (player.id === id) {
          return { ...player, [attributeName]: player[attributeName] + 1 };
        }

        return player;
      })
    );
  };

  console.log("render");

  const handleNameChange = (id) => (name) => {
    setPlayers((players) =>
      players.map((player) => {
        if (player.id === id) {
          return { ...player, name };
        }

        return player;
      })
    );
  };

  const handleDestroyPlayer = (id) => () => {
    const areYouSure = window.confirm(
      "Are you sure you want to destroy the player?"
    );

    if (areYouSure) {
      setPlayers((players) => players.filter((player) => player.id !== id));
    }
  };

  const handleOpen = (id) => () => {
    findAndIncrementAttribute(id, "pfr")();
    findAndIncrementAttribute(id, "vpip")();
  };

  const handleNextHand = () => {
    setHands((hands) => hands + 1);
  };

  const handlePreviousHand = () => {
    setHands((hands) => hands - 1);
  };

  return (
    <div className="App">
      <div>
        <button onClick={handleNextHand}>Next hand</button>
        <button onClick={handlePreviousHand}>Minus hand</button>
      </div>

      <table>
        <thead>
          <tr>
            <th>HUD</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {players.map((player) => (
            <Player
              key={player.id}
              totalHands={hands}
              player={player}
              onChangeName={handleNameChange(player.id)}
              onOpen={handleOpen(player.id)}
              onCall={findAndIncrementAttribute(player.id, "vpip")}
              onThreeBet={findAndIncrementAttribute(player.id, "threeBet")}
              onFourBet={findAndIncrementAttribute(player.id, "fourBet")}
              onThreeBetFold={findAndIncrementAttribute(
                player.id,
                "threeBetFold"
              )}
              onThreeBetCall={findAndIncrementAttribute(
                player.id,
                "threeBetCall"
              )}
              onThreeBetPush={findAndIncrementAttribute(
                player.id,
                "threeBetPush"
              )}
              onFourBetCall={findAndIncrementAttribute(
                player.id,
                "fourBetCall"
              )}
              onFourBetPush={findAndIncrementAttribute(
                player.id,
                "fourBetPush"
              )}
              onFourBetFold={findAndIncrementAttribute(
                player.id,
                "fourBetFold"
              )}
              onPlayerDestroy={handleDestroyPlayer(player.id)}
            ></Player>
          ))}
        </tbody>
      </table>

      <p className="total-hands">Total hands: {hands}</p>

      <button onClick={handleAddNewPlayer}>Add new player</button>
      <button className="danger" onClick={handleReset}>
        Reset game
      </button>
    </div>
  );
}

export default App;
