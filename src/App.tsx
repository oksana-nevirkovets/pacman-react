import React from 'react';
import 'normalize.css';
import 'antd/dist/antd.css';

import './App.css';
import { BrowserRouter as Router } from 'react-router-dom';
import { Routes } from './Routes';
import { AppMenu } from './components/AppMenu';
import { Store } from './lib/Store';
import { StoreProvider } from './components/StoreContext';

const store = new Store();

// Make the store available for debugging in the JS console
(window as any).store = store;

const App: React.FC = () => {
  return (
    <StoreProvider value={store}>
      <Router>
        <div className="App">
          <AppMenu />
          <Routes />
        </div>
      </Router>
    </StoreProvider>
  );
};

export default App;
