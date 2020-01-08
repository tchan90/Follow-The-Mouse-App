import React, { Component } from 'react'
import Container from '@material-ui/core/Container';
import PaperCard from '../cards/PaperCard';
import RideService from '../../services/RideService';
import FoodService from '../../services/FoodService'

class ListAll extends Component {
  constructor(props){
    super(props);
    this.state= {
      rides : [],
      restaurants: []
    }
  }
  async componentDidMount(){
    await RideService.getallRides()
    .then(response=>{
      this.setState({rides:response.data})
    })
    .catch((error)=>{
      console.log(error)
    })

   await FoodService.getAllRestaurants()
   .then(response=>{
     this.setState({restaurants:response.data})
   })
   .catch((error)=>{
     console.log(error)
   })  
  }
  render() {
    const {rides,restaurants} = this.state;
    console.log(rides)
      return (
        <div>
           <h1 style={{textAlign:'center'}}>DISNEYLAND</h1>
            <Container maxWidth="lg">
         <PaperCard rides={rides} restaurants={restaurants}/>
        </Container>
        </div>
      )
  }
}

export default (ListAll)