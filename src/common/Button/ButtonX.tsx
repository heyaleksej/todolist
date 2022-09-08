import s from './ButtonX.module.css'
import {ButtonHTMLAttributes, DetailedHTMLProps} from "react";
import React from 'react';

type DefaultButtonPropsType = DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>;


type propsType= DefaultButtonPropsType & {
    name?:string
    onClick?:()=>void
    disabled?:boolean
    type: "button" | "submit" | "reset" | undefined
    children?:any
}

export const ButtonX : React.FC<propsType> = ({type, name, children, ...restProps}) => {
    return <button {...restProps} className={s.button} >{name}{children}</button>

}