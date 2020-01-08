import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {Link} from 'react-router-dom';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import pink from '@material-ui/core/colors/pink';
import classnames from 'classnames';

const useStyles = makeStyles(theme => ({
    root: {
      width: '100%',
      maxWidth: 600,
      backgroundColor: theme.palette.background.paper
    },
    fantasyBg:{
        backgroundColor: pink[100],
        border:"1px solid #ec407a"
      },
    listCard:{
        cursor:"pointer"
    }
  }));

 const ListRideArn = ({rides}) => {
    const classes = useStyles();
  
    return (
        <div>
            {rides && rides.map(ride=>{
      return(
        <div key={ride._id}> 
             <List className={classes.root}>
        <ListItem alignItems="flex-start" className={classnames(classes.fantasyBg, classes.listCard)} type="button" component={Link} to={`/ride/${ride._id}`}>      
        <ListItemAvatar>
        <Avatar alt="Ride" src={ride.image} />
      </ListItemAvatar>
      <div className="listStyles"> <h2>{ride.name}</h2>
      <p>{ride.location}</p></div> </ListItem>  
</List>
</div>
 )
})}
        </div>
    )
}
export default ListRideArn