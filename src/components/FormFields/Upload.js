import React from 'react';
import Button from '@material-ui/core/Button';

const Upload=({onChange})=> {

    return (
        <Button
        variant="contained"
        component="label"
      >
        Upload Image
        <input
          type="file"
          style={{ display: "none" }}
          onChange={onChange}
        />
      </Button>
    )
}
export default Upload