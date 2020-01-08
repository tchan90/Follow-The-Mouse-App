import React from 'react';
import TextField from '@material-ui/core/TextField';

const SingleField=({name,label,value,onChange,type,errors})=> {
  return (
      <TextField id="standard-basic" name={name}
      type={type}
      value={value}
      onChange={onChange}
      label={label}
      />
  );
}

export default SingleField