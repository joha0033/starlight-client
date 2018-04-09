import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link }  from 'react-router-dom'
import './App.css';

import DataDisplay from '../DataDisplay'

class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <header className="App-header">
            <img src='https://static.wixstatic.com/media/b47bd7_f0a751ba390d408b9b9ed1f202bba7a8.png/v1/fill/w_474,h_196,al_c,usm_0.66_1.00_0.01/b47bd7_f0a751ba390d408b9b9ed1f202bba7a8.png' className="App-logo" alt="logo" />
            <h1 className="App-title">Welcome to React</h1>
          </header>
          <p className="App-intro">
            To get your data, go here <code><Link to="/cans">/cans</Link></code> and enjoy!
          </p>


              <Route exact path="/cans" component={DataDisplay}/>


          </div>
      </Router>
    );
  }
}

export default App;
