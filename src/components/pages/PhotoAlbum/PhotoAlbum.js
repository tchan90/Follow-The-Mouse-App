import React from 'react';
import Fab from '@material-ui/core/Fab';
import Container from '@material-ui/core/Container';
import {Link} from 'react-router-dom';


const PhotoAlbum=()=> {
    return (
        <Container className="photoalb-btns">
             <Fab variant="extended" color="primary" aria-label="add" style={{marginTop:"10px", marginBottom:"10px"}} >
            Personal Storage
        </Fab> 
           <Fab component={Link} to="/firebaseStorage_rides" variant="extended" color="secondary" aria-label="add" style={{marginTop:"10px", marginBottom:"10px"}}>
            Firebase Storage
        </Fab> 
        </Container>
    )
}
export default PhotoAlbum