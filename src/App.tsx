import { Menu } from '@material-ui/icons';
import {AppBar, Button, Container, IconButton, Toolbar, Typography} from '@mui/material';
import React from 'react';
import './App.module.css';
import { Todolist } from './components/Todolist';

function App() {
  return (
    <div className="App">
        <div className="App">
            <AppBar position="static">
                <Toolbar>
                    <IconButton edge="start" color="inherit" aria-label="menu">
                        <Menu/>
                    </IconButton>
                    <Typography variant="h6">
                        Todo App
                    </Typography>
                    <Button color="inherit" >Login</Button>
                </Toolbar>
            </AppBar>
            <Container fixed>
                <Todolist title={'what to learn'} filter={'all'}/>
                <Todolist title={'what to buy'} filter={'active'}/>
            </Container>
        </div>

    </div>
  );
}

export default App;
