import { attributes } from "../attributes";
import "./Player.css";

export const Player = ({
  player,
  onChangeName,
  onOpen,
  onThreeBet,
  onFourBet,
  onThreeBetFold,
  onThreeBetCall,
  onThreeBetPush,
  onFourBetCall,
  onFourBetPush,
  onFourBetFold,
  onCall,
  onPlayerDestroy,
  totalHands,
}) => {
  const showPercentage = (number) => {
    return Math.round((number / totalHands) * 100);
  };

  return (
    <tr>
      <td>
        <input
          value={player.name}
          onChange={({ target: { value } }) => onChangeName(value)}
        />
        {attributes.map((attributeName) => (
          <p key={attributeName}>
            {attributeName} {showPercentage(player[attributeName])}
          </p>
        ))}

        <button className="danger" onClick={onPlayerDestroy}>
          Remove player
        </button>
      </td>

      <td>
        <div className="actions">
          <button onClick={onCall}>Call</button>
          <button onClick={onOpen}>Raise first</button>
          <button onClick={onThreeBet}>3bet</button>
          {/* <button onClick={onFourBet}>4bet</button> */}
          <button onClick={onThreeBetFold}>Fold to 3bet</button>
          {/* <button onClick={onFourBetFold}>Fold to 4bet</button> */}
          <button onClick={onThreeBetCall}>Call to 3bet</button>
          {/* <button onClick={onFourBetCall}>Call to 4bet</button> */}
          <button onClick={onThreeBetPush}>Push to 3bet</button>
          {/* <button onClick={onThreeBetPush}>Push to 4bet</button> */}
        </div>
      </td>
    </tr>
  );
};
