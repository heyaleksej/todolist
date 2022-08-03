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

}

export const Todolist = React.memo(function (props: PropsType) {
    console.log('Todolist called')

    const dispatch = useDispatch()
    useEffect(() => {
        const thunk = fetchTasksTC(props.id)
        dispatch(thunk)
    }, [dispatch, props.id])

    const addTask = useCallback((title: string) => {
        props.addTask(title, props.id)
    }, [props])

    const removeTodolist = () => {
        props.removeTodolist(props.id)
    }


    let tasksForTodolist = props.tasks

    if (props.filter === 'active') {
        tasksForTodolist = props.tasks.filter(t => t.status === TaskStatuses.New)
    }
    if (props.filter === 'completed') {
        tasksForTodolist = props.tasks.filter(t => t.status === TaskStatuses.Completed)
    }

    return <div>
        <h3><EditableSpan value={props.title} onChange={()=>{console.log('edit')}}/>
            <IconButton onClick={removeTodolist}>
                <Delete/>
            </IconButton>
        </h3>
        <AddItemForm addItem={addTask}/>
        <div>
            {
                tasksForTodolist.map(t => <Task key={t.id} task={t} todolistId={props.id}
                                                removeTask={props.removeTask}
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



