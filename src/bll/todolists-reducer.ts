import {Dispatch} from 'redux'
import {todolistAPI, TodolistType} from '../api/api'
import { handleServerNetworkError } from '../utils/error-utils';
import {RequestStatusType, setAppStatusAC, SetAppStatusActionType} from "./app-reducer";
import { AppThunk } from './store';

const initialState: Array<TodolistDomainType> = []

export const todolistsReducer = (state: Array<TodolistDomainType> = initialState, action: ActionsType): Array<TodolistDomainType> => {
    switch (action.type) {
        case 'REMOVE-TODOLIST':
            return state.filter(tl => tl.id !== action.id)
        case 'ADD-TODOLIST':
            return [{...action.todolist, filter: 'all', entityStatus: 'idle'}, ...state]
        case 'SET-TODOLISTS':
            return action.todolists.map(tl => ({...tl, filter: 'all', entityStatus: 'idle'}))
        case "CHANGE-TODOLISTS-TITLE":
            return state.map(m=>m.id === action.todolistsId ? {...m, title:action.title}:m)
        case 'CHANGE-TODOLIST-FILTER':
            return state.map(t => t.id === action.id ? {...t, filter: action.filter} : t)
        case "DRAG-TODOLIST":
            return  state.map(tl => (tl.id === action.todolist.id)
                    ? {...tl, order: (action.currentTodo.order)}
                    : (tl.id === action.currentTodo.id)
                    ? {...tl, order: action.todolist.order}: tl)
        default:
            return state
    }
}

// actions
export const removeTodolistAC = (id: string) => ({type: 'REMOVE-TODOLIST', id} as const)
export const DropTodolistAC = (currentTodo:TodolistType, todolist: TodolistType) => ({type: 'DRAG-TODOLIST', currentTodo, todolist} as const)
export const addTodolistAC = (todolist: TodolistType) => ({type: 'ADD-TODOLIST', todolist} as const)
export const setTodolistsAC = (todolists: Array<TodolistType>) => ({type: 'SET-TODOLISTS', todolists} as const)
export const changeTodolistTitleAC = (todolistsId: string, title: string) => ({
    type: 'CHANGE-TODOLISTS-TITLE',
    todolistsId,
    title
} as const)
export const changeTodolistFilterAC = (id: string, filter: FilterValuesType) => ({
    type: 'CHANGE-TODOLIST-FILTER',
    id,
    filter
} as const)

// thunks
export const fetchTodolistsTC = (): AppThunk => {
    return (dispatch: ThunkDispatch) => {
        dispatch(setAppStatusAC('loading'))
        todolistAPI.getTodolists()
            .then((res) => {
                dispatch(setTodolistsAC(res.data))
                dispatch(setAppStatusAC('succeeded'))

            })
    }
}
export const removeTodolistTC = (todolistId: string):AppThunk => {
    return (dispatch: ThunkDispatch) => {
        todolistAPI.deleteTodolist(todolistId)
            .then(() => {
                dispatch(removeTodolistAC(todolistId))
            })
    }
}
export const addTodolistTC = (title: string):AppThunk => {
    return (dispatch: ThunkDispatch) => {
        dispatch(setAppStatusAC('loading'))
        todolistAPI.createTodolist(title)
            .then((res) => {
                dispatch(addTodolistAC(res.data.data.item))
                dispatch(setAppStatusAC('succeeded'))

            })
    }
}

export const changeTodolistTitleTC = (todolistId: string, title: string) => {
    return (dispatch: ThunkDispatch) => {
        todolistAPI.updateTodolist(todolistId, title)
            .then(() => {
                dispatch(changeTodolistTitleAC(todolistId,title))
            })
            .catch((error) => {
                handleServerNetworkError(error, dispatch)
            })

    }
}

export const changeTodolistOrderTC = (currentTodo:TodolistType, todolist:TodolistType) => {
    return (dispatch: ThunkDispatch) => {
        todolistAPI.reorderTodolist(currentTodo.id, todolist.id)
            .then((res) => {
                dispatch(DropTodolistAC(currentTodo, todolist))

            })
            .catch((error) => {
                handleServerNetworkError(error, dispatch)
            })

    }
}

// types
export type AddTodolistActionType = ReturnType<typeof addTodolistAC>;
export type RemoveTodolistActionType = ReturnType<typeof removeTodolistAC>;
export type SetTodolistsActionType = ReturnType<typeof setTodolistsAC>;
type ActionsType =
    | RemoveTodolistActionType
    | AddTodolistActionType
    | SetTodolistsActionType
    | ReturnType<typeof changeTodolistTitleAC>
    | ReturnType<typeof changeTodolistFilterAC>
    | ReturnType<typeof DropTodolistAC>

export type FilterValuesType = 'all' | 'active' | 'completed';
export type TodolistDomainType = TodolistType & {
    filter: FilterValuesType
    entityStatus: RequestStatusType

}

type ThunkDispatch = Dispatch<ActionsType | SetAppStatusActionType>

