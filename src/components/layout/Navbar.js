import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import IconButton from '@material-ui/core/IconButton';
import {Apps,AddCircle} from '@material-ui/icons'
import {Link} from 'react-router-dom'
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';

const useStyles = makeStyles(theme => ({
    root: {
      flexGrow: 1,
    },
    menuButton: {
      marginRight: theme.spacing(2),
    }
  }));

 const Navbar = () => {
    const classes = useStyles();
    const [state, setState] = React.useState({
        left: false,
      });
    
      const toggleDrawer = (side, open) => event => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
          return;
        }
    
        setState({ ...state, [side]: open });
      };
    
      const sideList = side => (
        <div
          className={classes.list}
          role="presentation"
          onClick={toggleDrawer(side, false)}
          onKeyDown={toggleDrawer(side, false)}
        >
             <List>
       <ListItem button><ListItemIcon><InboxIcon/></ListItemIcon><ListItemText primary="List" /></ListItem>
       <ListItem button><ListItemIcon><InboxIcon/></ListItemIcon><ListItemText primary="Itinery" /></ListItem>
       <ListItem button><ListItemIcon><InboxIcon/></ListItemIcon><ListItemText primary="Photo Album" /></ListItem>
       <ListItem button><ListItemIcon><InboxIcon/></ListItemIcon><ListItemText primary="Hidden Mickeys" /></ListItem>
      </List>
        </div>
      );

    return (
        <div>
            <AppBar position="static">
                <div className="navflex"> 
    <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu" onClick={toggleDrawer('left', true)} >
      <Apps  style={{ fontSize: 30 }}/>
    </IconButton>
    <Link to="/" className="navTitle"> 
    <i className="fas fa-shoe-prints"></i>
   Follow the Mouse
    </Link>
    <Link to="/admin">
    <IconButton>
      <AddCircle style={{ fontSize: 30 }}/>
    </IconButton>
    </Link>
    </div>
</AppBar>
<Drawer open={state.left} onClose={toggleDrawer('left', false)}>
        {sideList('left')}
      </Drawer>
        </div>
    )
}

export default Navbar