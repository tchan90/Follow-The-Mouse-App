import React from 'react';
import TextField from '@material-ui/core/TextField';

const Name=({name,label,value,onChange,type,defaultValue})=> {

    return (
            <TextField
          id="standard-full-width"
          label={label}
          name={name}
          value={value}
          onChange={onChange}
          type={type}
          style={{ margin: 8 }}
          fullWidth
          margin="normal"
          InputLabelProps={{
            shrink: true,
          }}
        /> 
    )
}
export default Name