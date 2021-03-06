import React, {Component} from 'react';
import logo from './logo.svg';
import './App.css';

import INPUT from './components/INPUT'

import '../public/styleSheet.css';

class App extends Component {
  constructor (props) {
    super (props);
    this.state = {
      value1: 0,
      value2: 0,
      result: 0,
      autoCalculate: false,
    };
  }

  handelOnChange1 = async(e) => {
    await this.setState ({value1: e.target.value});
    if (this.state.autoCalculate) this.calculate ();
  };

  handelOnChange2 = async(e) => {
    await this.setState ({value2: e.target.value});
    if (this.state.autoCalculate) this.calculate ();
  };

  calculate = () => {
    if (
      isNaN (
        parseInt (this.state.value1, 10) + parseInt (this.state.value2, 10)
      )
    ) {
      alert ('Please check your inputs');
      this.setState ({
        value1: 0,
        value2: 0,
      });
      return;
    }
    this.setState ({
      result: parseInt (this.state.value1, 10) +
        parseInt (this.state.value2, 10),
    });
  };

  autoCalculate = () => {
    if (this.state.autoCalculate === false)
      this.setState ({autoCalculate: true});
    else this.setState ({autoCalculate: false});
    this.calculate ();
  };

  render () {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to React Sum App</h2>
        </div>
        <div className="inputs">
          <div className="INPUT">
            <input
              type="text"
              value={this.state.value1}
              onChange={(e) => this.handelOnChange1(e)}
            />
          </div>
          <h1>+</h1>
          <div className="INPUT">
            <input
              type="text"
              value={this.state.value2}
              onChange={(e) => this.handelOnChange2(e)}
            />
          </div>
        </div>
        <button className="resultBtn" onClick={() => this.calculate()}>
          CALCULATE
        </button>
        <div>
          {this.state.autoCalculate === true
            ? <button
                className="resultBtnAutoGreen"
                onClick={() => this.autoCalculate()}
              >
                AUTO CALCULATE
              </button>
            : <button className="resultBtnAutoRed" onClick={this.autoCalculate}>
                AUTO CALCULATE
              </button>}
        </div>
        <p className="result">{this.state.result}</p>
      </div>
    );
  }
}

export default App;
