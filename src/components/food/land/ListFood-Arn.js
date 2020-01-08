import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {Link} from 'react-router-dom';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import classnames from 'classnames';

const useStyles = makeStyles(theme => ({
    root: {
      width: '100%',
      maxWidth: 600,
      backgroundColor: theme.palette.background.paper
    },
    fantasyBg:{
        backgroundColor: "#80deea",
        border:"1px solid #00acc1"
      },
    listCard:{
        cursor:"pointer"
    }
  }));

 const ListFoodArn = ({restaurants}) => {
    const classes = useStyles();
  
    return (
        <div>
            {restaurants && restaurants.map(restaurant=>{
      return(
        <div key={restaurant._id}> 
             <List className={classes.root}>
        <ListItem alignItems="flex-start" className={classnames(classes.fantasyBg, classes.listCard)} type="button" component={Link} to={`/restaurant/${restaurant._id}`}>      
        <ListItemAvatar>
        <Avatar alt="Ride" src={restaurant.image} />
      </ListItemAvatar>
      <div className="listStyles"> <h2>{restaurant.name}</h2>
      <p>{restaurant.location}</p></div> </ListItem>  
</List>
</div>
 )
})}
        </div>
    )
}
export default ListFoodArn