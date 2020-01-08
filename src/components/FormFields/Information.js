import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

const useStyles = makeStyles(theme => ({
    textField: {
      marginLeft: theme.spacing(1),
      marginRight: theme.spacing(1),
      width: 200,
    },
  }));

 const Information=({name,label,value,onChange,type})=> {
    const classes = useStyles();
  
    return (
        <TextField
        id="standard-multiline-static"
        multiline
        rows="4"
        className={classes.textField}
        margin="normal"
        name={name}
          type={type}
          value={value}
          onChange={onChange}
          label={label}
      />
    )
}
export default Information