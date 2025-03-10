import GameList from "./components/GameList";
import GameDetail from "./components/GameDetail";
import About from "./components/About";
import ErrorScreen from "./components/ErrorScreen";
import { Routes, Route, Link, useNavigate } from "react-router";

function App() {
  return (
    <>
      <header>
        <Link to="/">Home</Link>
        <a href="https://game-library-private.fly.dev/">Staff App</a>
        <a href="/about">About</a>
      </header>
      <main>
        <Routes>
          <Route path="/" element={<GameList />} />
          <Route path="/:gameId" element={<GameDetail />} />
          <Route path="/about" element={<About />} />
          <Route path="*" element={<ErrorScreen />} />
        </Routes>
      </main>
    </>
  );
}

export default App;
