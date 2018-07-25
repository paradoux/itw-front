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
    this.setState({ ...this.state, tasks: [task] })
  }

  render() {
    return (
      <div className="App">
        <div className="container">
          <Header />
          <div className="row no-gutters">
            <Phase newTasks={this.state.tasks} />
          </div>
          <Form onProjectCreation={task => this.handleProjectCreation(task)} />
        </div>
      </div>
    );
  }
}

export default App;
