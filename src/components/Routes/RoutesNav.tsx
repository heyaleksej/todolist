import React from 'react';
import {Route, Routes} from "react-router-dom";
import {TodolistsPage} from "../TodolistsPage";
import {Login} from "../Login/Login";



export const RoutesNav = React.memo(function () {

    return <Routes>
        <Route path={"/"} element={<TodolistsPage/>}/>
        <Route path={"/login"} element={<Login/>}/>
    </Routes>
})
