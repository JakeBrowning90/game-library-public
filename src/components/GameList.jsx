import React, { useState, useEffect } from "react";
import { Link } from "react-router";

function GameList(
  {
    // Props
  }
) {
  // State declarations
  const [query, setQuery] = useState("");
  const [gameList, setGameList] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  // Functions
  // PLACEHOLDER
  const API_SOURCE = "https://game-library-api.fly.dev/";

  useEffect(() => {
    // fetch(import.meta.env.VITE_API_SOURCE + "game/circ", {
    fetch(API_SOURCE + "game/circ", {
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

  const handleQuery = (e) => {
    setQuery(e.target.value);
  };

  async function submitQuery(e) {
    e.preventDefault();
    // await fetch(import.meta.env.VITE_API_SOURCE + `game/?title=${query}`, {
    await fetch(API_SOURCE + `game/?title=${query}`, {
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
      .then((response) => setGameList(response));
  }

  // Render
  if (loading) return <p>Loading game list...</p>;
  if (error) return <p>Network error, please try again later.</p>;

  return (
    <div className="mainDiv">
      <h1 className="pageHeader">Game List</h1>
      <form onSubmit={submitQuery} className="blueBlock">
        <p>Search Games</p>
        <label htmlFor="queryTag">Title:</label>
        <input
          type="text"
          name="queryTag"
          id="queryTag"
          value={query}
          onChange={handleQuery}
        />
        {/* TODO: Add addtl search params */}
        {/* <label htmlFor="">Age Recommendation:</label>
        <label htmlFor="">Min. Player Count:</label>
        <label htmlFor="">Max. Player Count:</label>
        <label htmlFor="">Complexity:</label> */}

        <button>Search</button>
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
