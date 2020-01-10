import React, {Fragment} from 'react';
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
import PersonIcon from '@material-ui/icons/Person';
import SignIn from '../authentication/SignIn';
import Modal from '@material-ui/core/Modal';
import {connect} from 'react-redux';
import PropTypes from 'prop-types'

const useStyles = makeStyles(theme => ({
    root: {
      flexGrow: 1,
    },
    menuButton: {
      marginRight: theme.spacing(2),
    }
  }));

 const Navbar = ({auth}) => {
    const classes = useStyles();  

const adminLink = (
  <Fragment>
     <Link to="/admin">
    <IconButton>
      <AddCircle style={{ fontSize: 30 }}/>
    </IconButton>
    </Link>
  </Fragment>
);

    //Modal
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const handleCloseonLogin = () => {
    setOpen(false)
  }

  //Drawer
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
       <ListItem button><ListItemIcon><PersonIcon/></ListItemIcon><ListItemText primary="Sign In" /></ListItem>

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
    {auth.isAuthenticated ? adminLink :  <IconButton type="button" onClick={handleOpen}>
      <PersonIcon style={{ fontSize: 30 }}/>
    </IconButton>}
    </div>
</AppBar>
<Drawer open={state.left} onClose={toggleDrawer('left', false)}>
        {sideList('left')}
      </Drawer>
      <Modal  aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
        open={open}
        onClose={handleClose}>
 <div className={classes.paper, "signInModal"}>
<SignIn callFromAdmin = {handleCloseonLogin}/>
</div>
</Modal>
        </div>
    )
  }
Navbar.propTypes = {
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
})


export default connect(mapStateToProps, null)(Navbar)