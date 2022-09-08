import * as React from 'react';
import ButtonGroup from '@mui/material/ButtonGroup';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import Grow from '@mui/material/Grow';
import Paper from '@mui/material/Paper';
import Popper from '@mui/material/Popper';
import MenuItem from '@mui/material/MenuItem';
import MenuList from '@mui/material/MenuList';
import { ButtonX } from '../Button/ButtonX';

const options = ['All', 'Active', 'Completed'];

type PropsType ={
    onAllClickHandler:()=>void;
    onActiveClickHandler:()=>void;
    onCompletedClickHandler:()=>void;

}

export default function SplitButton(props:PropsType) {
    const [open, setOpen] = React.useState(false);
    const anchorRef = React.useRef<HTMLDivElement>(null);
    const [selectedIndex, setSelectedIndex] = React.useState(0);


    const handleMenuItemClick = (
        event: React.MouseEvent<HTMLLIElement, MouseEvent>,
        index: number,
    ) => {
        setSelectedIndex(index);
        setOpen(false);
        index === 0 ?  props.onAllClickHandler(): index === 1 ?  props.onActiveClickHandler() : props.onCompletedClickHandler();


    };

    const handleToggle = () => {
        setOpen((prevOpen) => !prevOpen);
    };

    const handleClose = (event: Event) => {
        if (
            anchorRef.current &&
            anchorRef.current.contains(event.target as HTMLElement)
        ) {
            return;
        }

        setOpen(false);
    };

    const ButtonGroupStyle ={
        width:'92%', justifyContent:'center',boxShadow:'0'
    }



    return (
        <React.Fragment>
            <ButtonGroup sx={ButtonGroupStyle} variant="contained" ref={anchorRef} aria-label="split button">
                <ButtonX style={{width:'60%'}} type='button'  onClick={handleToggle}>{options[selectedIndex]}
                    <ArrowDropDownIcon />
                </ButtonX>

            </ButtonGroup>
            <Popper
                sx={{zIndex: 1}}
                open={open}
                anchorEl={anchorRef.current}
                role={undefined}
                transition
                disablePortal
            >
                {({ TransitionProps, placement }) => (
                    <Grow
                        {...TransitionProps}
                        style={{
                            transformOrigin:
                                placement === 'bottom' ? 'center top' : 'center bottom',
                        }}
                    >
                        <Paper>
                            <ClickAwayListener onClickAway={handleClose}>
                                <MenuList id="split-button-menu" autoFocusItem>
                                    {options.map((option, index) => (
                                        <MenuItem
                                            key={option}
                                            disabled={index === selectedIndex}
                                            selected={index === selectedIndex}
                                            onClick={(event) => handleMenuItemClick(event, index)}
                                        >
                                            {option}
                                        </MenuItem>
                                    ))}
                                </MenuList>
                            </ClickAwayListener>
                        </Paper>
                    </Grow>
                )}
            </Popper>
        </React.Fragment>
    );
}