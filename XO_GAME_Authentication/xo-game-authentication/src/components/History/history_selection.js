import React from 'react';
import Select from 'react-select';

export default class History extends React.Component {
  constructor (props) {
    super (props);
    this.state = {
      isAscending: true,
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange (selectedMove) {
    const selectedMoveIndex = this.props.moves.indexOf (selectedMove);
    // console.log (`Option selected:`, selectedMove);
    // console.log (`Option selected index:`, selectedMoveIndex);
    this.props.resetMoves (selectedMoveIndex);
  };

  changeOrder () {
    this.setState ({isAscending: !this.state.isAscending});
  }

  render () {
    const selectedMove = this.props.latestMove;
    const moves = this.state.isAscending
      ? this.props.moves
      : this.props.moves.slice ().reverse ();

    return (
      <div>
        <Select
          id="MoveSelection"
          value={selectedMove}
          onChange={this.handleChange}
          options={moves}
        />
        <div style={{display: 'flex', justifyContent: 'center', marginTop: 10}}>
          <button onClick={() => this.changeOrder ()}>Change order</button>
        </div>
      </div>
    );
  }
}
