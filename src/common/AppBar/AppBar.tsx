import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import logo from './../Img/todoist-icon-svgrepo-com.svg'
import s from './../../App.module.css'
import Container from '@mui/material/Container';
import MenuIcon from '@mui/icons-material/Menu';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import {useAppDispatch, useAppSelector} from "../Hooks/hooks";
import {useCallback} from "react";
import {addTodolistTC} from "../../bll/todolists-reducer";
import {logoutTC} from "../../components/auth-reducer";
import {LinearProgress, Typography} from '@material-ui/core';
import {AddItemForm} from "../AddItemForm/AddItemForm";


export const ResponsiveAppBar = () => {

    const status = useAppSelector((state) => state.app.status)
    const isLoggedIn = useAppSelector(state => state.auth.isLoggedIn)
    const dispatch = useAppDispatch()


    const addTodolist = useCallback((title: string) => {
        dispatch(addTodolistTC(title))
    }, [dispatch])

    const logoutHandler = useCallback(() => {
        dispatch(logoutTC())
    }, [])

    const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);


    const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    return (
        <AppBar position="static" style={{background:'none'}}>
            <Toolbar disableGutters className={s.toolBar}>
                <img src={logo} className={s.logo}/>
                <Typography variant="h6" className={s.appTitle}>
                    Todolist App
                </Typography>
                <Container style={{padding:'1%'}}>
                    <AddItemForm addItem={addTodolist} label={'Enter new todolist name'} inputStyle={s.input} />
                </Container>
                <Tooltip title="Open settings">
                    <IconButton onClick={handleOpenUserMenu} sx={{p: 0}}>
                        <MenuIcon/>
                    </IconButton>
                </Tooltip>
                <Menu
                    sx={{mt: '45px'}}
                    id="menu-appbar"
                    anchorEl={anchorElUser}
                    anchorOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                    }}
                    keepMounted
                    transformOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                    }}
                    open={Boolean(anchorElUser)}
                    onClose={handleCloseUserMenu}
                >
                    <MenuItem onClick={handleCloseUserMenu}>
                        {isLoggedIn && <Typography onClick={logoutHandler}>Log out</Typography>}
                    </MenuItem>
                </Menu>
            </Toolbar>
            {status === 'loading' && <LinearProgress/>}
        </AppBar>
    );
};
