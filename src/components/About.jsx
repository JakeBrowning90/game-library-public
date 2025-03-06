import React from "react";
import { Link } from "react-router";
// import apiSource

function About(
  {
    // Props
  }
) {
  // State declarations
  // Functions
  // Render
  return (
    <div>
      <Link to={"/"} className="mainLink">
        Back
      </Link>
      <div className="blueBlock">
        <h2>About</h2>
        <p>This is a fullstack app designed as a concept for use by a board game café. Guests may browse the collection and filter by game title, player count, difficulty, and genre. </p>
        <a href="https://github.com/JakeBrowning90/game-library-public">
          Github Repo & README
        </a>
        <p>Project by Jake Browning, 2025.</p>
        <a href="https://jakebrowning90.github.io/personal-portfolio/">
          My Portfolio
        </a>
      </div>
    </div>
  );
}

export default About;
