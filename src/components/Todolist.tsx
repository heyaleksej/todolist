import React from 'react'
import {Button} from "@mui/material";

type TodolistType = {
    title:string
    filter: 'all'|'active'|'completed'
}


export const Todolist = (props:TodolistType) => {
    return(
        <div>
            <h1>{props.title}</h1>
          <div>
              <input/>
              <button>+</button>
          </div>
            <div>
                <ul><input type={"checkbox"}></input><span>css</span></ul>
                <ul><input type={"checkbox"}></input><span>js</span></ul>
                <ul><input type={"checkbox"}></input><span>html</span></ul>
            </div>
            <div style={{paddingTop: '10px'}}>
                <Button variant={props.filter === 'all' ? 'outlined' : 'text'}
                        color={'inherit'}
                >All
                </Button>
                <Button variant={props.filter === 'active' ? 'outlined' : 'text'}
                        color={'primary'}>Active
                </Button>
                <Button variant={props.filter === 'completed' ? 'outlined' : 'text'}
                        color={'secondary'}>Completed
                </Button>
            </div>
        </div>
    )

}