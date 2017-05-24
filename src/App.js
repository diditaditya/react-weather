import React, { Component } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';

import './App.css';
import store from './store/configureStore';
import Header from './components/Header';
import ViewHead from './components/ViewHead';
import ViewBody from './components/ViewBody';

class App extends Component {

  render() {
    return (
      <Router>
        <div>
          <Header/>
          <ViewHead/>
          <ViewBody/>
        </div>
      </Router>
    );
  }

}


const AppWithStore = (props) => {
  return (
    <Provider store={store} >
      <App/>
    </Provider>
  );
}


export default AppWithStore;