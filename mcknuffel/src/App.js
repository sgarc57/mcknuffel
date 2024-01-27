import logo from './img/mcknuffel_bear.png';
import React from 'react';
import './App.css';
import * as Helper from './helper.js';


function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        {/*
        */}
        <Helper.Home products={Helper.products} />;
      </header>
    </div>
  );
}

export default App;
