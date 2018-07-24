import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import Phase from './containers/Phase'
import Header from './components/Header'
import Form from './containers/Form'

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="container">
          <Header />
          <div className="container-fluid">
            <div className="row">
              <Phase />
            </div>
          </div>
          <Form />
        </div>
      </div>
    );
  }
}

export default App;
