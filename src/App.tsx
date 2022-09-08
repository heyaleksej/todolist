import {CircularProgress} from '@material-ui/core';
import {Container} from '@mui/material';
import React, {useEffect } from 'react';
import { useSelector } from 'react-redux/es/hooks/useSelector';
import {HashRouter} from 'react-router-dom';
import {initializeAppTC} from './bll/app-reducer';
import { AppRootStateType } from './bll/store';
import {ErrorSnackbar} from "./common/ErrorSnackbar/ErrorSnackbar";
import {RoutesNav} from "./components/Routes/RoutesNav";
import {useAppDispatch} from "./common/Hooks/hooks";
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
        <HashRouter>
            <div>
                <ErrorSnackbar/>
                <ResponsiveAppBar/>
                <Container fixed>
                    <RoutesNav/>
                </Container>
            </div>
        </HashRouter>

    );
}

export default App;
