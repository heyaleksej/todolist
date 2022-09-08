import React from 'react';
import {Navigate, Route, Routes} from "react-router-dom";
import {TodolistsPage} from "../TodolistsPage";
import {Login} from "../Login/Login";



export const RoutesNav = React.memo(function () {

    return <Routes>
        <Route path={"/"} element={<TodolistsPage/>}/>
        <Route path={"/login"} element={<Login/>}/>
        <Route path={"/*"} element={<Navigate to={'/404'}/>}/>
    </Routes>
})
