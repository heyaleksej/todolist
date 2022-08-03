import React from 'react';
import './App.css';
import { Todolist } from './components/Todolist';

function App() {
  return (
    <div className="App">
       <Todolist title={'what to learn'} filter={'all'}/>
       <Todolist title={'what to buy'} filter={'active'}/>
    </div>
  );
}

export default App;
