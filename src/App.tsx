import { CircularProgress, LinearProgress } from '@material-ui/core';
import {AppBar, Button, Container, Toolbar, Typography} from '@mui/material';
import React, {useCallback, useEffect } from 'react';
import { useDispatch } from 'react-redux/es/hooks/useDispatch';
import { useSelector } from 'react-redux/es/hooks/useSelector';
import {BrowserRouter} from 'react-router-dom';
import {initializeAppTC, RequestStatusType } from './bll/app-reducer';
import { AppRootStateType } from './bll/store';
import { logoutTC } from './components/auth-reducer';
import {ErrorSnackbar} from "./common/ErrorSnackbar/ErrorSnackbar";
import {RoutesNav} from "./components/Routes/RoutesNav";

function App() {

    const status = useSelector<AppRootStateType, RequestStatusType>((state) => state.app.status)
    const isInitialized = useSelector<AppRootStateType, boolean>((state) => state.app.isInitialized)
    const isLoggedIn = useSelector<AppRootStateType, boolean>(state => state.auth.isLoggedIn)
    const dispatch = useDispatch()


    useEffect(() => {
        dispatch(initializeAppTC())
    }, [])

    const logoutHandler = useCallback(() => {
        dispatch(logoutTC())
    }, [])

    if (!isInitialized) {
        return <div
            style={{position: 'fixed', top: '30%', textAlign: 'center', width: '100%'}}>
            <CircularProgress/>
        </div>
    }

    return (
        <BrowserRouter>
            <div className="App">
                <ErrorSnackbar/>
                <AppBar position="static">
                    <Toolbar style={{display: "flex", justifyContent: "space-between"}}>
                        <Typography variant="h6">
                            Todolist
                        </Typography>
                        {isLoggedIn && <Button variant="outlined" color="inherit" onClick={logoutHandler}>Log out</Button>}
                    </Toolbar>
                    {status === 'loading' && <LinearProgress/>}
                </AppBar>
                <Container fixed>
                    <RoutesNav/>
                </Container>
            </div>
        </BrowserRouter>

    );
}

export default App;
