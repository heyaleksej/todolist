import React, { useCallback, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import { AppRootStateType } from '../bll/store';
import {
    addTodolistTC, changeTodolistFilterAC, changeTodolistTitleTC,
    fetchTodolistsTC,
    FilterValuesType,
    removeTodolistTC,
    TodolistDomainType
} from '../bll/todolists-reducer';
import {addTaskTC, removeTaskTC, TasksStateType, updateTaskTC} from "../bll/task-reducer";
import { AddItemForm } from '../common/AddItemForm/AddItemForm';
import { Todolist } from './Todolist';
import {TaskStatuses} from "../api/api";

export const TodolistsPage: React.FC = () => {

    const todolists = useSelector<AppRootStateType, Array<TodolistDomainType>>(state => state.todolists)
    const tasks = useSelector<AppRootStateType, TasksStateType>(state => state.tasks)

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(fetchTodolistsTC())
    }, [dispatch])

    const removeTask = useCallback(function (id: string, todolistId: string) {
        const thunk = removeTaskTC(id, todolistId)
        dispatch(thunk)
    }, [dispatch])

    const addTask = useCallback(function (title: string, todolistId: string) {
        const thunk = addTaskTC(title, todolistId)
        dispatch(thunk)
    }, [dispatch])


    const removeTodolist = useCallback(function (id: string) {
        const thunk = removeTodolistTC(id)
        dispatch(thunk)
    }, [dispatch])


    const addTodolist = useCallback((title: string) => {
        const thunk = addTodolistTC(title)
        dispatch(thunk)
    }, [dispatch])

    const changeTaskTitle = useCallback( (todolistId: string, id: string, newTitle: string) => {
        dispatch(updateTaskTC(todolistId, id, {title: newTitle}))
    }, [])

    const changeTodolistTitle = useCallback( (todolistId: string, title:string) => {
        dispatch(changeTodolistTitleTC(todolistId, title))
    }, [])

    const changeFilter = useCallback(function (value: FilterValuesType, todolistId: string) {
        dispatch(changeTodolistFilterAC(todolistId, value))
    }, [dispatch])

    const changeStatus = useCallback(function (todolistId: string, id: string, status: TaskStatuses) {
        dispatch(updateTaskTC(todolistId, id, {status}))
    }, [])


    return <>
        <Grid container style={{padding: '20px'}}>
            <AddItemForm addItem={addTodolist}/>
        </Grid>
        <Grid container spacing={3}>
            {
                todolists.map(tl => {
                    let allTodolistTasks = tasks[tl.id]

                    return <Grid item key={tl.id}>
                        <Paper style={{padding: '10px'}}>
                            <Todolist
                                id={tl.id}
                                title={tl.title}
                                tasks={allTodolistTasks}
                                removeTask={removeTask}
                                addTask={addTask}
                                filter={tl.filter}
                                removeTodolist={removeTodolist}
                                changeTaskTitle={changeTaskTitle}
                                changeTodolistTitle={changeTodolistTitle}
                                changeFilter={changeFilter}
                                changeTaskStatus={changeStatus}



                            />
                        </Paper>
                    </Grid>
                })
            }
        </Grid>
    </>
}
