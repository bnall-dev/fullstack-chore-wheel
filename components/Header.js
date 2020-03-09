import React, { useState } from 'react';

const Header = ({ view, setView }) => {
  return (
    <div id="header">
      <a
        href="#"
        className={view === '#' ? 'selected' : ''}
        onClick={() => setView('#')}
      >
        <div id="banner">
          <h1>Chore Wheel</h1>
          <img id="icon" src="./assets/icon.png" />
        </div>
      </a>
      <div id="menu">
        <a
          href="#roommates"
          className={view === 'roommates' ? 'selected' : ''}
          onClick={() => setView('roommates')}
        >
          <button className="menuButton">Roommates</button>
        </a>
        <a
          href="#chores"
          className={view === 'chores' ? 'selected' : ''}
          onClick={() => setView('chores')}
        >
          <button className="menuButton">Chores</button>
        </a>
      </div>
    </div>
  );
};

export default Header;
