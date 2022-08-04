import { Menu } from '@material-ui/icons';
import {AppBar, Button, Container, IconButton, Toolbar, Typography} from '@mui/material';
import React from 'react';
import { TodolistsPage } from './components/TodolistsPage';

function App() {
  return (
    <div>
        <div className="App">
            <AppBar position="static">
                <Toolbar>
                    <IconButton edge="start" color="inherit" aria-label="menu">
                        <Menu/>
                    </IconButton>
                    <Typography variant="h6"> TodoApp</Typography>
                    <Button color="inherit" >Login</Button>
                </Toolbar>
            </AppBar>
            <Container fixed>
                <TodolistsPage/>
            </Container>
        </div>
    </div>
  );
}

export default App;
