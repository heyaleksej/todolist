import React from 'react';
import './App.css';
import { Todolist } from './components/Todolist';

function App() {
  return (
    <div className="App">
       <Todolist title={'what to learn'}/>
       <Todolist title={'what to buy'}/>
    </div>
  );
}

export default App;
