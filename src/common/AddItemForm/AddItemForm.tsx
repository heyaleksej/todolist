import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import TextField from '@mui/material/TextField';
import s from './AddItemForm.module.css'
import add from './../Img/add-small-svgrepo-com.svg';

type AddItemFormPropsType = {
    addItem: (title: string) => void
    label: string
    inputStyle?: any
}

export const AddItemForm = React.memo(function (props: AddItemFormPropsType) {
    console.log('AddItemForm called')

    let [title, setTitle] = useState('')
    let [error, setError] = useState<string | null>(null)

    const addItem = () => {
        if (title.trim() !== '') {
            props.addItem(title);
            setTitle('');
        } else {
            setError('Title is required');
        }
    }

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }

    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (error !== null) {
            setError(null);
        }
        if (e.charCode === 13) {
            addItem();
        }
    }

    return <div className={s.addForm}>
        <TextField variant="outlined"
                   error={!!error}
                   value={title}
                   onChange={onChangeHandler}
                   onKeyPress={onKeyPressHandler}
                   label={props.label}
                   helperText={error}
                   className={props.inputStyle}
        />
        <img onClick={addItem} src={add} className={s.addLogo}/>
    </div>
})
