import React from 'react';
import './App.css';
import Player from './components/Player/Player'
import ChessBoard from './containers/ChessBoard/ChessBoard';

function App() {
  return (
    <div className="App">
      <Player color='#e84b3a' mainPlayer={true} />
      <ChessBoard></ChessBoard>
      <Player color='#56a560' mainPlayer={false} />
    </div>
  );
}

export default App;
