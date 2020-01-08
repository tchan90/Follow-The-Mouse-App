import React, { Component } from 'react';
import RideService from '../../../services/RideService';
import Jumbotron from '../../cards/Jumbotron';
import Grid from '@material-ui/core/Grid';
import {LocationOn,ListAlt,Launch} from '@material-ui/icons';
import Typography from '@material-ui/core/Typography';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import MatLink from '@material-ui/core/Link';

class ViewRideArn extends Component {
  constructor(props){
    super(props);
    this.state= {
      ride : []
    }
  }
  async componentDidMount(){
    await RideService.getSpecificRide(this.props.match.params.id)
    .then(response=>{
      this.setState({ride:response.data})
    })
    .catch((error)=>{
      console.log(error)
    })
  }
  render() {
    const {ride} = this.state;
    console.log(ride)
    return (
      <div>
        <Breadcrumbs aria-label="breadcrumb" className="breadcrumb-margins">
            <MatLink color="inherit" href="/">
              Home
            </MatLink>
            <MatLink color="inherit" href="/ListAll">
              All Rides
            </MatLink>
            <Typography color="textPrimary">{ride.name}</Typography>
          </Breadcrumbs>
      <div className="background-viewCard">
        <div className="viewCard"> 
        <Jumbotron name={ride.name}/>
        <Grid container spacing={3} style={{padding:'15px 5px'}}> 
        <Grid item md={6}>
      <LocationOn/> {ride.location}
        </Grid>
        <Grid item md={6}>
         <ListAlt/> {ride.information}
        </Grid>
        </Grid>
        <Grid container spacing={3} style={{padding:'15px 5px'}}> 
        <Grid item md={6}>
        <Launch/> {ride.link}
        </Grid>
        <Grid item md={6}>
         {ride.hiddenMickey=true? <i class="fas fa-search"></i> : ''}
         {ride.fastPass=true ? <i class="fas fa-ticket-alt"></i> : ''}
        </Grid>
        </Grid>
        </div>
        </div> 
      </div>
    )
  }
} 
export default ViewRideArn