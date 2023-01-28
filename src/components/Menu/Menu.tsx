import { Box, Menu, MenuItem, Typography } from '@mui/material';
import React, { useState } from 'react';
import styles from './styles';

interface Props<T> {
  handleClick: (o: T) => unknown;
  options: T[];
  selected: T;
  text: (x: T) => string;
  equal: (a: T, b: T) => boolean;
  button: JSX.Element;
}

const Component = <T,>({ handleClick, options, text, selected, equal, button }: Props<T>) => {
  const [anchorEl, setAnchorEl] = useState<Element | null>(null);
  const open = Boolean(anchorEl);

  const handleClose = () => setAnchorEl(null);

  return (
    <Box>
      <Box onClick={(event) => setAnchorEl(event.currentTarget)}>{button}</Box>
      <Menu
        anchorEl={anchorEl}
        keepMounted
        open={open}
        onClose={handleClose}
        PaperProps={{
          style: styles,
        }}
      >
        {options.map((x, index) => (
          <MenuItem
            key={index}
            selected={equal(x, selected)}
            onClick={() => {
              handleClose();
              handleClick(x);
            }}
          >
            {<Typography>{text(x)}</Typography>}
          </MenuItem>
        ))}
      </Menu>
    </Box>
  );
};

export default Component;
