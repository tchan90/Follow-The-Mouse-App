import React from 'react';
import Container from '@material-ui/core/Container';

 const Jumbotron=(props) => {
    return (
        <div>
           <Container maxWidth="lg" className="jumbo-img" >
           <div className="overlay"> 
           <h1 className="ride-name">{props.name}</h1>
           </div>
           </Container>
        </div>
    )
}
export default Jumbotron