import {Box, CircularProgress, IconButton, LinearProgress, Menu, Tooltip } from '@material-ui/core';
import {AppBar, Button, Container, Toolbar, Typography} from '@mui/material';
import React, {useCallback, useEffect } from 'react';
import { useSelector } from 'react-redux/es/hooks/useSelector';
import {BrowserRouter} from 'react-router-dom';
import {initializeAppTC, RequestStatusType } from './bll/app-reducer';
import { AppRootStateType } from './bll/store';
import { logoutTC } from './components/auth-reducer';
import {ErrorSnackbar} from "./common/ErrorSnackbar/ErrorSnackbar";
import {RoutesNav} from "./components/Routes/RoutesNav";
import {AddItemForm} from "./common/AddItemForm/AddItemForm";
import {addTodolistTC} from "./bll/todolists-reducer";
import {useAppDispatch} from "./common/Hooks/hooks";
import s from './App.module.css'
import {ResponsiveAppBar} from "./common/AppBar/AppBar";

function App() {

    const isInitialized = useSelector<AppRootStateType, boolean>((state) => state.app.isInitialized)
    const dispatch = useAppDispatch()


    useEffect(() => {
        dispatch(initializeAppTC())
    }, [])


    if (!isInitialized) {
        return <div
            style={{position: 'fixed', top: '30%', textAlign: 'center', width: '100%'}}>
            <CircularProgress/>
        </div>
    }



    return (
        <BrowserRouter>
            <div>
                <ErrorSnackbar/>
                {/*<AppBar position="static" sx={{}}>*/}
                {/*    <Toolbar style={{display: "flex", justifyContent: "space-between", background:'whitesmoke' , color:'black'}}>*/}
                {/*        <Typography variant="h6" className={s.appTitle}>*/}
                {/*            Todolist App*/}
                {/*        </Typography>*/}
                {/*        <Container style={{padding:'1%'}}>*/}
                {/*            <AddItemForm addItem={addTodolist} label={'Enter new todolist name'}  />*/}
                {/*        </Container>*/}

                {/*        {isLoggedIn && <Button style={{width:'14vw'}} variant="outlined" color="inherit" onClick={logoutHandler}>Log out</Button>}*/}
                {/*    </Toolbar>*/}
                {/*    {status === 'loading' && <LinearProgress/>}*/}

                {/*</AppBar>*/}
                <ResponsiveAppBar/>
                <Container fixed>
                    <RoutesNav/>
                </Container>
            </div>
        </BrowserRouter>

    );
}

export default App;
