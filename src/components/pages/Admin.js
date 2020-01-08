import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { createMuiTheme, MuiThemeProvider } from "@material-ui/core/styles";
import Button from '@material-ui/core/Button';
import {Link} from 'react-router-dom';
import Container from '@material-ui/core/Container';

const useStyles = makeStyles(theme => ({
    button: {
      margin: theme.spacing(1),
    },
    input: {
      display: 'none',
    },
  }));
const theme = createMuiTheme({
  palette: {
    primary: {main:'#64b5f6'},
    secondary: {main:'#e53935', light:'#bbdefb', dark:'#1e88e5',
    contrastText: '#e3f2fd'}
  },
});

const Admin =() => {
    const classes = useStyles();
    return (
      <MuiThemeProvider theme={theme}>
        <div style={{textAlign:'center'}}>
          <h1>DisneyLand</h1>
          <Container>
             <Button variant="contained" color="primary" className={classes.button} size="large" component={Link} to="/addRide-Arnaheim">
        Add Ride 
      </Button>
      <Button variant="contained" color="primary" className={classes.button} size="large" component={Link} to="/addFood-Arnaheim">
        Add Food 
      </Button>
        </Container>
        <Container>
      <Button variant="contained" color="primary" className={classes.button} size="large" component={Link} to="/admin-list">
        Edit/Delete Data 
      </Button>
        </Container>
        </div>
        </MuiThemeProvider>
    )
}
export default  Admin