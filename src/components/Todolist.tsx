import React, {useCallback, useEffect} from 'react'
import {TaskStatuses, TaskType} from "../api/api";
import {FilterValuesType} from "../bll/todolists-reducer";
import {useDispatch} from 'react-redux'
import {EditableSpan} from '../common/EditableSpan/EditableSpan';
import {IconButton} from '@mui/material';
import {Delete} from '@material-ui/icons';
import {AddItemForm} from "../common/AddItemForm/AddItemForm";
import {Task} from './Task/Task';
import {fetchTasksTC} from '../bll/task-reducer';
import clip3 from "../common/Img/klipBlue.png";
import s from "./TodolistsPage.module.css";
import SplitButton from "../common/ButtonGroup/SplitButton";


type PropsType = {
    id: string
    title: string
    tasks: Array<TaskType>
    addTask: (title: string, todolistId: string) => void
    removeTask: (taskId: string, todolistId: string) => void
    removeTodolist: (id: string) => void
    filter: FilterValuesType
    changeTaskTitle: (todolistId: string, taskId: string, newTitle: string) => void
    changeTodolistTitle: (todolistId: string, title: string) => void
    changeFilter: (value: FilterValuesType, todolistId: string) => void
    changeTaskStatus: (todolistId: string, id: string, status: TaskStatuses) => void


}

export const Todolist = React.memo(function (props: PropsType) {

    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(fetchTasksTC(props.id))
    }, [])

    const addTask = useCallback((title: string) => {
        props.addTask(title, props.id)
    }, [props.id])

    const removeTodolist = () => {
        props.removeTodolist(props.id)
    }

    const changeTodolistTitleObertka = useCallback((title: string) => {
        props.changeTodolistTitle(props.id, title)
    }, [props.id, props.changeTodolistTitle])

    const onAllClickHandler = useCallback(() => props.changeFilter('all', props.id), [props.id, props.changeFilter])
    const onActiveClickHandler = useCallback(() => props.changeFilter('active', props.id), [props.id, props.changeFilter])
    const onCompletedClickHandler = useCallback(() => props.changeFilter('completed', props.id), [props.id, props.changeFilter])


    let tasksForTodolist = props.tasks

    if (props.filter === 'active') {
        tasksForTodolist = props.tasks.filter(t => t.status === TaskStatuses.New)
    }
    if (props.filter === 'completed') {
        tasksForTodolist = props.tasks.filter(t => t.status === TaskStatuses.Completed)
    }


    return <div className={s.taskWrapper}>
        <img src={clip3} className={s.clip}/>
        <h3  className={s.titleBlock} style={{marginBlockStart:'0', display: 'flex', margin:'auto', paddingBottom: '2%'}}>
            <EditableSpan value={props.title} onChange={changeTodolistTitleObertka}/>
            <IconButton onClick={removeTodolist}>
                <Delete/>
            </IconButton>
        </h3>
        <AddItemForm addItem={addTask} label={'Enter new task name'} inputStyle={{width:'100%'}}/>
        <div className={s.tasksList}>
            {
                tasksForTodolist.map(t => <Task key={t.id} task={t}
                                                todolistId={props.id}
                                                removeTask={props.removeTask}
                                                changeTaskTitle={props.changeTaskTitle}
                                                changeTaskStatus={props.changeTaskStatus}

                />)
            }
        </div>
        <div>
            <SplitButton onAllClickHandler={onAllClickHandler} onActiveClickHandler={onActiveClickHandler} onCompletedClickHandler={onCompletedClickHandler}/>
        </div>

    </div>
})



