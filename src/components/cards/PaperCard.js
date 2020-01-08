import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import RideListArn from '../rides/land/ListRide-Arn';
import FoodListArn from '../food/land/ListFood-Arn'

const useStyles = makeStyles(theme => ({
    root: {
      flexGrow: 1,
      width: '100%',
      maxWidth: 600,
      backgroundColor: theme.palette.background.paper
    },
    paper: {
      padding: theme.spacing(2),
      textAlign: 'center',
      color: theme.palette.text.secondary,
    }
  }));

 const PaperCard = ({rides,restaurants})=> {
    const classes = useStyles();

    return (
              <Paper className={classes.paper}>
            <h2>Rides</h2>
         <RideListArn rides={rides}/>
         <h2>Restaurants</h2>
         <FoodListArn restaurants={restaurants}/>
          </Paper>
        
    )
}
export default PaperCard