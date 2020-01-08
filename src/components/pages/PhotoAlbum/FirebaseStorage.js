import React, { Component } from 'react';
import RideService from '../../../services/RideService';
import FoodService from '../../../services/FoodService';
import Grid from '@material-ui/core/Grid';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import MatLink from '@material-ui/core/Link';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';

 class FirebaseStorage extends Component {
    constructor(props){
        super(props);
        this.state= {
          urlRide : [],
          urlFood : []
        }
      }
      async componentDidMount(){
        await RideService.getImageUrls()
        .then(response=>{
          this.setState({urlRide:response.data})
        })
        .catch((error)=>{ 
          console.log(error)
        })
        await FoodService.getImageUrls()
        .then(response=>{
          this.setState({urlFood:response.data})
        })
        .catch((error)=>{ 
          console.log(error)
        })
      }
    render() {
        const {urlRide,urlFood} = this.state;
        const images = urlRide.concat(urlFood);
        console.log(images)
        if(images){
            return (
                <div>
                     <Breadcrumbs aria-label="breadcrumb" className="breadcrumb-margins">
            <MatLink color="inherit" href="/home">
              Home
            </MatLink>
            <MatLink color="inherit" href="/photoAlbum">
              Photo Album
            </MatLink>
            <Typography color="textPrimary">Firebase Storage</Typography>
          </Breadcrumbs>
          <Container> 
                    <Grid container spacing={2}> 
                     {
                     images.map((u)=>{
                        return <Grid item sm={6} key={u._id}>
                            <img src={u.imageUrl} alt={u._id} className="galleryImg"/>
                            </Grid>
                     })}
                     </Grid>
                     </Container>
                </div>
            )
        }else{
            return <div>No photos in database</div>
        }
    }
}
export default FirebaseStorage