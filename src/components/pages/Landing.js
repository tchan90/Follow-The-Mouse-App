import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import {Link} from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
const useStyles = makeStyles(theme => ({
    root: {
      flexGrow: 1,
    },
    paper: {
      padding: theme.spacing(2),
      textAlign: 'center',
      color: theme.palette.text.secondary,
    },
  }));

const Landing = () => {
    const classes = useStyles();

    return (
             <div className={classes.root}>
                  <Grid container spacing={4} >
             <Grid item lg={6} xs={12}>
          <Paper className={classes.paper}> <Link to="/ListAll"><button className="landing-btn list-btn">List</button></Link></Paper>
        </Grid>
        <Grid item lg={6} xs={12}>
          <Paper className={classes.paper}> <Link to="/itinery"><button className="landing-btn itinery-btn">Itinery</button></Link></Paper>
        </Grid>
        <Grid item lg={6} xs={12}>
          <Paper className={classes.paper}> <Link to="/hiddenMickeys"><button className="landing-btn hm-btn">Hidden Mickeys</button></Link></Paper>
        </Grid>
        <Grid  item lg={6} xs={12}>
          <Paper className={classes.paper}><Link to="/photoAlbum"><button className="landing-btn photo-btn">Photo Album</button></Link></Paper>
        </Grid>
        </Grid>
        </div>            
    )
}
export default Landing