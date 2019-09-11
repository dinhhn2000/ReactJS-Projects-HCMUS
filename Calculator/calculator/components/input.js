import React, {Component} from 'react';

class INPUT extends Component {
  constructor (props) {
    super (props);
    this.state = {value: ''};
    this.handelOnChange = this.handelOnChange.bind (this);
  }

  handelOnChange = e => {
    this.setState ({value: e.target.value});
  };

  render () {
    return (
      <div className="INPUT">
        <input
          type="text"
          value={this.state.value}
          onChange={this.handelOnChange}
        />
      </div>
    );
  }
}

export default INPUT;
