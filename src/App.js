import React, { Component } from 'react';
import logo from './logo.svg';
import Exchange from './container/Exchange/Exchange';
import './App.css';
import { Route, Switch } from 'react-router-dom';

class App extends Component {
  render() {
    return (
      <Switch>
        
        <Route path='/' exact component={Exchange} />
      </Switch>


    );
  }
}

export default App;
