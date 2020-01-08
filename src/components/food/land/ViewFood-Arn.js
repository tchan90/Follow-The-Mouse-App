import React, { Component } from 'react';
import FoodService from '../../../services/FoodService';
import Jumbotron from '../../cards/Jumbotron';
import Grid from '@material-ui/core/Grid';
import {LocationOn,ListAlt,Launch} from '@material-ui/icons';
import Typography from '@material-ui/core/Typography';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import MatLink from '@material-ui/core/Link';

class ViewFoodArn extends Component {
  constructor(props){
    super(props);
    this.state= {
      restaurant : []
    }
  }
  async componentDidMount(){
    await FoodService.getSpecificRestaurant(this.props.match.params.id)
    .then(response=>{
      this.setState({restaurant:response.data})
    })
    .catch((error)=>{
      console.log(error)
    })
  }
  render() {
    const {restaurant} = this.state;
    console.log(restaurant)
    return (
      <div>
        <Breadcrumbs aria-label="breadcrumb" className="breadcrumb-margins">
            <MatLink color="inherit" href="/">
              Home
            </MatLink>
            <MatLink color="inherit" href="/ListAll">
              List
            </MatLink>
            <Typography color="textPrimary">{restaurant.name}</Typography>
          </Breadcrumbs>
      <div className="background-viewCard">
        <div className="viewCard"> 
        <Jumbotron name={restaurant.name}/>
        <Grid container spacing={3} style={{padding:'15px 5px'}}> 
        <Grid item md={6}>
      <LocationOn/> {restaurant.location}
        </Grid>
        <Grid item md={6}>
         <ListAlt/> {restaurant.food}
        </Grid>
        </Grid>
        <Grid container spacing={3} style={{padding:'15px 5px'}}> 
        <Grid item md={6}>
        <Launch/> {restaurant.link}
        </Grid>
        <Grid item md={6}>
         {restaurant.mealType='Snack'? <i class="fas fa-cookie-bite"></i> : ''}
         {restaurant.service='Quick' ? <i class="fas fa-running"></i> : ''}
        </Grid>
        </Grid>
        </div>
        </div> 
      </div>
    )
  }
} 
export default ViewFoodArn