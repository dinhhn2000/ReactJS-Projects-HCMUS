import React, { Component } from 'react';
import ChessBoard from '../../containers/chessboard';
import '../../App.css';

class Game extends Component {
    constructor(props) {
        super(props);
        this.state = {
            col: 10,
            row: 10,
        };
    }

    changeChessSizeCol(e) {
        this.setState({
            col: parseInt(e.target.value, 10),
        });
    }

    changeChessSizeRow(e) {
        this.setState({
            row: parseInt(e.target.value, 10),
        });
    }

    render() {
        return (
            <div className="Game">
                <label className="mapSizeLabel">ROWS</label>
                <input
                    className="Input"
                    type="number"
                    value={this.state.row}
                    onChange={e => this.changeChessSizeRow(e)}
                    min="10"
                    max="30"
                />
                <label className="mapSizeLabel">COLUMNS</label>
                <input
                    className="Input"
                    type="number"
                    value={this.state.col}
                    onChange={e => this.changeChessSizeCol(e)}
                    min="10"
                    max="25"
                />
                <p>(Max is 25 & Min is 10)</p>
                <p style={{ color: 'red' }}>
                    (Below or above the limit may crash the app)
          </p>
                <button id="restartBtn" onClick={() => window.location.reload()}>
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

export default Game;