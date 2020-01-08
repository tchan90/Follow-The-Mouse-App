import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';

const useStyles = makeStyles(theme => ({
    formControl: {
      margin: theme.spacing(1),
      minWidth: 120,
    },
    selectEmpty: {
      marginTop: theme.spacing(2),
    },
  }));


const SelectMenuTF=({name,label,value,onChange,type})=> {
    const classes = useStyles();

    return (
             <FormControl className={classes.formControl}>
        <InputLabel id="demo-simple-select-label">{label}</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          name={name}
          type={type}
          value={value}
          onChange={onChange}
        >
          <MenuItem  value="" />
          <MenuItem  value="true">Yes</MenuItem >
          <MenuItem  value="false">No</MenuItem >
        </Select>
      </FormControl>
                )
}
export default SelectMenuTF