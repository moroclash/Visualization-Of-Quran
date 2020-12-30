import React from 'react';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button';


const ITEM_HEIGHT = 48;
let options;


export default function LongList(props) {
  const [anchorEl, setAnchorEl] = React.useState({ title: props.main_title, open: false});

  const handleClick = (event) => {
    setAnchorEl({open: true})
  };
  
  const handleClose = (e) => {
    setAnchorEl({title:e.target.textContent, open: false});
  };

  options = props.options

  return (
    <div>
      <Button aria-controls="simple-menu"  color="secondary" aria-haspopup="true" onClick={handleClick}>
        {anchorEl.title}
      </Button>
      <Menu
        id="long-menu"
        keepMounted
        open={anchorEl.open}
        onClose={handleClose}
        PaperProps={{
          style: {
            maxHeight: ITEM_HEIGHT * 4.5,
            width: '20ch',
          },
        }}
      >
        {options.map((key, option) => (
          <MenuItem key={key} selected={option === anchorEl.title} onClick={handleClose}>
            {`${key} :: ${option}`}
          </MenuItem>
        ))}
      </Menu>
    </div>
  );
}
