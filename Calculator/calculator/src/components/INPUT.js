import React, {Component} from 'react';

class INPUT extends Component {
  handelOnChange = e => {
    this.setState ({value: e.target.value});
  };

  render () {
    return (
      <div className="INPUT">
        <input
          value={this.props.value}
          onChange={this.handelOnChange}
        />
      </div>
    );
  }
}

export default INPUT;
