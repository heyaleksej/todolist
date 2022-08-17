import {Dispatch} from 'redux'
import {todolistAPI, TodolistType} from '../api/api'

const initialState: Array<TodolistDomainType> = []

export const todolistsReducer = (state: Array<TodolistDomainType> = initialState, action: ActionsType): Array<TodolistDomainType> => {
    switch (action.type) {
        case 'REMOVE-TODOLIST':
            return state.filter(tl => tl.id !== action.id)
        case 'ADD-TODOLIST':
            return [{...action.todolist, filter: 'all'}, ...state]
        case 'SET-TODOLISTS':
            return action.todolists.map(tl => ({...tl, filter: 'all'}))
        case "CHANGE-TODOLISTS-TITLE":
            return state.map(m=>m.id === action.todolistsId ? {...m, title:action.title}:m)
        case 'CHANGE-TODOLIST-FILTER':
            return state.map(t => t.id === action.id ? {...t, filter: action.filter} : t)
        default:
            return state
    }
}

// actions
export const removeTodolistAC = (id: string) => ({type: 'REMOVE-TODOLIST', id} as const)
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
export const fetchTodolistsTC: any = () => {
    return (dispatch: Dispatch<ActionsType>) => {
        todolistAPI.getTodolists()
            .then((res) => {
                dispatch(setTodolistsAC(res.data))
            })
    }
}
export const removeTodolistTC: any = (todolistId: string) => {
    return (dispatch: Dispatch<ActionsType>) => {
        todolistAPI.deleteTodolist(todolistId)
            .then(() => {
                dispatch(removeTodolistAC(todolistId))
            })
    }
}
export const addTodolistTC: any = (title: string) => {
    return (dispatch: Dispatch<ActionsType>) => {
        todolistAPI.createTodolist(title)
            .then((res) => {
                dispatch(addTodolistAC(res.data.data.item))
            })
    }
}

export const changeTodolistTitleTC: any = (todolistId: string, title: string) => {
    return (dispatch: Dispatch) => {
        todolistAPI.updateTodolist(todolistId, title)
            .then(() => {
                dispatch(changeTodolistTitleAC(todolistId,title))
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
export type FilterValuesType = 'all' | 'active' | 'completed';
export type TodolistDomainType = TodolistType & {
    filter: FilterValuesType
}
