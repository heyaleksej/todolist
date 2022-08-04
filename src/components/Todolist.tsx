import React, { useCallback, useEffect } from 'react'
import {TaskStatuses, TaskType} from "../api/api";
import {FilterValuesType} from "../bll/todolists-reducer";
import { useDispatch } from 'react-redux'
import { EditableSpan } from '../common/EditableSpan/EditableSpan';
import { IconButton } from '@mui/material';
import { Delete } from '@material-ui/icons';
import {AddItemForm} from "../common/AddItemForm/AddItemForm";
import { Task } from './Task/Task';
import Button from '@material-ui/core/Button';
import { fetchTasksTC } from '../bll/task-reducer';




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


}

export const Todolist = React.memo(function (props: PropsType) {

    const dispatch = useDispatch()
    useEffect(() => {
        const thunk = fetchTasksTC(props.id)
        dispatch(thunk)
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


    let tasksForTodolist = props.tasks

    if (props.filter === 'active') {
        tasksForTodolist = props.tasks.filter(t => t.status === TaskStatuses.New)
    }
    if (props.filter === 'completed') {
        tasksForTodolist = props.tasks.filter(t => t.status === TaskStatuses.Completed)
    }

    return <div>
        <h3><EditableSpan value={props.title} onChange={changeTodolistTitleObertka}/>
            <IconButton onClick={removeTodolist}>
                <Delete/>
            </IconButton>
        </h3>
        <AddItemForm addItem={addTask}/>
        <div>
            {
                tasksForTodolist.map(t => <Task key={t.id} task={t}
                                                todolistId={props.id}
                                                removeTask={props.removeTask}
                                                changeTaskTitle={props.changeTaskTitle}
                />)
            }
        </div>
        <div style={{paddingTop: '10px'}}>
            <Button variant={props.filter === 'all' ? 'outlined' : 'text'}
                    onClick={()=>{}}
                    color={'inherit'}
            >All
            </Button>
            <Button variant={props.filter === 'active' ? 'outlined' : 'text'}
                    onClick={()=>{}}
                    color={'primary'}>Active
            </Button>
            <Button variant={props.filter === 'completed' ? 'outlined' : 'text'}
                    onClick={()=>{}}
                    color={'secondary'}>Completed
            </Button>
        </div>
    </div>
})



