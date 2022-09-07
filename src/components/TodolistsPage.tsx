import React, {useCallback, useEffect, useState} from 'react'
import Grid from '@mui/material/Grid';
import s from './TodolistsPage.module.css'
import {changeTodolistFilterAC, changeTodolistTitleTC, DropTodolistAC,
    fetchTodolistsTC,
    FilterValuesType,
    removeTodolistTC, TodolistDomainType,
} from '../bll/todolists-reducer';
import {addTaskTC, removeTaskTC, updateTaskTC} from "../bll/task-reducer";
import {Todolist} from './Todolist';
import {TaskStatuses} from "../api/api";
import {Navigate} from 'react-router-dom';
import {useAppDispatch, useAppSelector} from "../common/Hooks/hooks";

export const TodolistsPage: React.FC = () => {

    const todolists = useAppSelector(state => state.todolists)
    const tasks = useAppSelector(state => state.tasks)
    const isLoggedIn = useAppSelector(state => state.auth.isLoggedIn)

    const [currentTodo, setCurrentTodo] = useState<any>(null)

    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(fetchTodolistsTC())
    }, [dispatch])

    const removeTask = useCallback(function (id: string, todolistId: string) {
        dispatch(removeTaskTC(id, todolistId))
    }, [dispatch])

    const addTask = useCallback(function (title: string, todolistId: string) {
        const thunk = addTaskTC(title, todolistId)
        dispatch(thunk)
    }, [dispatch])


    const removeTodolist = useCallback(function (id: string) {
        const thunk = removeTodolistTC(id)
        dispatch(thunk)
    }, [dispatch])


    const changeTaskTitle = useCallback((todolistId: string, id: string, newTitle: string) => {
        dispatch(updateTaskTC(todolistId, id, {title: newTitle}))
    }, [])

    const changeTodolistTitle = useCallback((todolistId: string, title: string) => {
        dispatch(changeTodolistTitleTC(todolistId, title))
    }, [])

    const changeFilter = useCallback(function (value: FilterValuesType, todolistId: string) {
        dispatch(changeTodolistFilterAC(todolistId, value))
    }, [dispatch])

    const changeStatus = useCallback(function (todolistId: string, id: string, status: TaskStatuses) {
        dispatch(updateTaskTC(todolistId, id, {status}))
    }, [])

    if (!isLoggedIn) {
        return <Navigate to={"/login"}/>
    }


    function onDragStartHandler(e: React.DragEvent<HTMLDivElement>, tl: any) {
        setCurrentTodo(tl)
        console.log('tl', tl.order)
    }

    function onDragEndHandler(e: React.DragEvent<HTMLDivElement>) {
        e.currentTarget.style.background = ''


    }

    function onDropHandler(e: React.DragEvent<HTMLDivElement>, tl: TodolistDomainType) {
        e.preventDefault()
        e.currentTarget.style.background = ''
        console.log('tl', tl)
       dispatch(DropTodolistAC(currentTodo, tl))
    }

    function onDragLeaveHandler(e: React.DragEvent<HTMLDivElement>) {
        e.currentTarget.style.background = ''

    }

    function onDragOverHandler(e: React.DragEvent<HTMLDivElement>) {
        e.preventDefault()
        console.log('current', currentTodo)
        e.currentTarget.style.background = 'rgba(115,108,108,0.8)'

    }

    const sortTodo = (a:TodolistDomainType, b: TodolistDomainType)=>{
        if (a.order > b.order){
            return 1
        }
        else {
            return -1
        }
    }

    return <>
        <Grid container spacing={3}>
            {
                todolists.sort(sortTodo).map(tl => {
                    let allTodolistTasks = tasks[tl.id]

                    return <Grid item key={tl.id} style={{margin: '2%'}}>
                        <div className={s.todoPage}
                             draggable={true}
                             onDragStart={(e) => {
                                 onDragStartHandler(e, tl)
                             }}
                             onDragEnd={(e) => {
                                 onDragEndHandler(e)
                             }}
                             onDragLeave={(e) => {
                                 onDragLeaveHandler(e)
                             }}
                             onDragOver={(e) => {
                                 onDragOverHandler(e)
                             }}
                             onDrop={(e) => {
                                 onDropHandler(e, tl)
                             }}

                        >
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

                        </div>
                    </Grid>
                })
            }
        </Grid>
    </>
}
