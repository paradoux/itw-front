import React, { Component } from 'react';
import './App.css';

import Phase from './containers/Phase'
import Header from './components/Header'
import Form from './containers/Form'

class App extends Component {

  constructor() {
    super();
    this.state = {
      tasks: []
    }
  }

  handleProjectCreation = task => {
    this.setState({ ...this.state, tasks: [task] }) // Take the new task created from Form and update the State
  }

  render() {
    return (
      <div className="App">
        <div className="container">
          <Header />
          <div className="row no-gutters">
            <Phase newTasks={this.state.tasks} /> {/* Take the new task from the state and send it to the Phase component through props */}
          </div>
          <Form onProjectCreation={task => this.handleProjectCreation(task)} /> {/* Lift up the new task created */}
        </div>
      </div>
    );
  }
}

export default App;
