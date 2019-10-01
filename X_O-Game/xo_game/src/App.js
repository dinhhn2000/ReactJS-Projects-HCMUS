import React, {Component} from 'react';
import logo from './logo.svg';
import './App.css';

import ChessBoard from './components/ChessBoard/chessboard';

class App extends Component {
  constructor (props) {
    super (props);
    this.state = {
      col: 10,
      row: 10,
    };
  }

  async changeChessSizeCol (e) {
    await this.setState ({
      col: parseInt (e.target.value, 10),
    });
  }

  async changeChessSizeRow (e) {
    await this.setState ({
      row: parseInt (e.target.value, 10),
    });
  }

  render () {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to React-XO-GAME</h2>
        </div>
        <label className="mapSizeLabel">ROWS</label>
        <input
          className="Input"
          type="number"
          value={this.state.row}
          onChange={e => this.changeChessSizeRow (e)}
          min="10"
          max="30"
        />
        <label className="mapSizeLabel">COLUMNS</label>
        <input
          className="Input"
          type="number"
          value={this.state.col}
          onChange={e => this.changeChessSizeCol (e)}
          min="10"
          max="30"
        />
        <p>(Max is 30 & Min is 10)</p>
        <p style={{color: 'red'}}>
          (Below or above the limit may crash the app)
        </p>
        <button id="restartBtn" onClick={() => window.location.reload ()}>
          RESTART GAME
        </button>
        <ChessBoard
          className="chessBoard"
          CHESS_SIZE_ROW={this.state.row + 1}
          CHESS_SIZE_COL={this.state.col + 1}
        />
      </div>
    );
  }
}

export default App;
