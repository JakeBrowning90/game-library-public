import { useState } from "react";
import GameList from "./components/GameList";
import GameDetail from "./components/GameDetail"
import { Routes, Route, Link, useNavigate } from "react-router";

function App() {

  return (
    <>
      <header>Header</header>
      <main>
        <Routes>
          <Route path="/" element={<GameList />}/>
          <Route path="/:gameId" element={<GameDetail />}/>
        </Routes>
      </main>
    </>
  );
}

export default App;
