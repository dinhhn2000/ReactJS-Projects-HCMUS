import React, { Component } from 'react';
import './styles.css';

class Cell extends Component {
  render() {
    return this.props.isCoordinate
      ? <button
        className="cell"
        style={{
          color: '#000000',
          backgroundColor: '#ffffff',
          fontSize: 18,
        }}
        disabled
      >
        {this.props.value}
      </button>
      : <button
        className="cell"
        style={{
          color: this.props.value === 'X' ? '#ed2d2d' : '#0cc938',
          backgroundColor: this.props.isWon ? '#F8BB2F' : '#ffffff',
        }}
        onClick={() => this.props.onClick()}
      >
        {this.props.value}
      </button>;
  }
}

export default Cell;
