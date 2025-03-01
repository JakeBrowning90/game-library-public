import React, { useState, useEffect } from "react";
import { Link } from "react-router";
import arrowDown from "../assets/arrowdown.svg";
import arrowUp from "../assets/arrowup.svg";

function GameList(
  {
    // Props
  }
) {
  // State declarations
  const [qTitle, setQTitle] = useState("");
  const [qGameWeight, setQGameWeight] = useState("");
  const [qCount, setQCount] = useState("");
  const [gameList, setGameList] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  // Functions
  // const API_SOURCE = "http://localhost:3000/";
  let apiSource;
  if (import.meta.env.MODE === "development") {
    //use dev keys
    apiSource = import.meta.env.VITE_API_SOURCE;
  } else {
    //use .env variables
    apiSource = process.env.VITE_API_SOURCE;
  }

  useEffect(() => {
    fetch(apiSource + "game/circ", {
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (response.status >= 400) {
          throw new Error("Game list fetch error");
        }
        return response.json();
      })
      .then((response) => setGameList(response))
      .catch((error) => setError(error))
      .finally(() => setLoading(false));
  }, []);

  const handleQTitle = (e) => {
    setQTitle(e.target.value);
  };

  const handleQGameWeight = (e) => {
    setQGameWeight(e.target.value);
  };

  const handleQCount = (e) => {
    setQCount(e.target.value);
  };

  const toggleAdvForm = () => {
    const advSearch = document.querySelector(".advSearch");
    advSearch.classList.toggle("hidden");
    const icon = document.getElementById("expandIcon");
    if (icon.src == arrowDown) {
      icon.src = arrowUp;
    } else if (icon.src == arrowUp) {
      icon.src = arrowDown;
    }
  };

  async function submitQuery(e) {
    e.preventDefault();
    await fetch(
      apiSource +
        `game/circ/?title=${qTitle}&weight=${qGameWeight}&count=${qCount}`,
      {
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
      .then((response) => {
        if (response.status >= 400) {
          throw new Error("Game list fetch error");
        }
        return response.json();
      })
      .then((response) => setGameList(response));
  }

  // Render
  if (loading) return <p>Loading game list...</p>;
  if (error) return <p>Network error, please try again later.</p>;

  return (
    <div className="mainDiv">
      <h1 className="pageHeader">Game List</h1>
      <form onSubmit={submitQuery} className="blueBlock">
        <div className="formHeader">
          <h2>Search</h2>
          <div className="moreLabel">
            <p>Advanced</p>
            <img
              src={arrowDown}
              alt=""
              id="expandIcon"
              onClick={toggleAdvForm}
            />
          </div>
        </div>

        <div className="formBody">
          <label htmlFor="queryTag">Title:</label>
          <input
            type="text"
            name="queryTag"
            id="queryTag"
            value={qTitle}
            onChange={handleQTitle}
          />
          <div className="formBody advSearch hidden">
            <label htmlFor="qPlayerCt">Player count:</label>
            <input
              type="number"
              name="qPlayerCt"
              id="qPlayerCt"
              value={qCount}
              onChange={handleQCount}
            />
            <fieldset className="diffField searchDiff">
              <legend>Difficulty:</legend>
              <div className="marker allRadio toggleSet">
                <input
                  type="radio"
                  name="gameWeight"
                  id="gameWeight1"
                  value=""
                  onChange={handleQGameWeight}
                  defaultChecked={qGameWeight === ""}
                />
                <label htmlFor="gameWeight1">All</label>
              </div>

              <div className="marker easy toggleSet">
                <input
                  type="radio"
                  name="gameWeight"
                  id="gameWeight1"
                  value="Easy"
                  onChange={handleQGameWeight}
                  defaultChecked={qGameWeight === "Easy"}
                />
                <label htmlFor="gameWeight1">Easy</label>
              </div>
              <div className="marker medium toggleSet">
                <input
                  type="radio"
                  name="gameWeight"
                  id="gameWeight2"
                  value="Medium"
                  onChange={handleQGameWeight}
                  defaultChecked={qGameWeight === "Medium"}
                />
                <label htmlFor="gameWeight2">Med</label>
              </div>
              <div className="marker complex toggleSet">
                <input
                  type="radio"
                  name="gameWeight"
                  id="gameWeight3"
                  value="Complex"
                  onChange={handleQGameWeight}
                  defaultChecked={qGameWeight === "Complex"}
                />
                <label htmlFor="gameWeight3">Comp</label>
              </div>
            </fieldset>
          </div>
          <button>Search</button>
        </div>
      </form>

      {gameList.length == 0 ? (
        <h2 className="pageHeader">No games found</h2>
      ) : (
        <>
          <h2 className="pageHeader">{gameList.length} games found:</h2>
          <ul>
            {gameList.map((game) => {
              return (
                <li key={game.id} className="blueBlock gameLI">
                  <p className="gameTitle">{game.title}</p>
                  <p>Ages {game.ageRec}+ </p>

                  {game.playerCtMax ? (
                    <p>
                      {game.playerCtMin} - {game.playerCtMax} players
                    </p>
                  ) : (
                    <p>{game.playerCtMin} players</p>
                  )}

                  {game.timeMax ? (
                    <p>
                      {game.timeMin} - {game.timeMax} min.
                    </p>
                  ) : (
                    <p>{game.timeMin} min.</p>
                  )}
                  {game.gameWeight == "Easy" && (
                    <p className="marker easy">{game.gameWeight}</p>
                  )}
                  {game.gameWeight == "Medium" && (
                    <p className="marker medium">{game.gameWeight}</p>
                  )}
                  {game.gameWeight == "Complex" && (
                    <p className="marker complex">{game.gameWeight}</p>
                  )}

                  {game.inCirc ? (
                    <p className="available">Available</p>
                  ) : (
                    <p className="unavailable">Unavailable</p>
                  )}
                  <Link to={`/${game.id}`}>Detail</Link>
                </li>
              );
            })}
          </ul>
        </>
      )}
    </div>
  );
}

export default GameList;
