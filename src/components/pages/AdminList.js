import React, { Component } from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import Container from '@material-ui/core/Container';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import RideService from '../../services/RideService';
import FoodService from '../../services/FoodService';
import Button from '@material-ui/core/Button';
import {Link} from 'react-router-dom';
import DeleteRide from '../rides/land/DeleteRide';
import DeleteFood from '../food/land/DeleteFoodArn'


 class AdminList extends Component {
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
        const {rides,restaurants} = this.state
        console.log(rides,restaurants)
        return (
            <div>
                  <Container component={Paper}>
      <Table className='adminTable' size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            <TableCell>Rides</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rides.map(ride => (
            <TableRow key={ride._id}>
              <TableCell component="th" scope="row">
                {ride.name}
              </TableCell>
              <TableCell align="right"><img src={ride.image} alt={ride.name}/></TableCell>
              <TableCell align="right"><Button color="primary" component={Link} to={`/updateRide-Arnaheim/${ride._id}`}>Edit</Button></TableCell>
              <TableCell><DeleteRide id={ride._id}></DeleteRide> </TableCell>
            </TableRow>
          ))}
        </TableBody>
        <TableHead>
          <TableRow>
            <TableCell>Restaurants</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {restaurants.map(restaurant => (
            <TableRow key={restaurant._id}>
              <TableCell component="th" scope="row">
                {restaurant.name}
              </TableCell>
              <TableCell align="right"><img src={restaurant.image} alt={restaurant.name}/></TableCell>
              <TableCell align="right"><Button color="primary" component={Link} to={`/updateRestaurant-Arnaheim/${restaurant._id}`}>Edit</Button></TableCell>
              <TableCell><DeleteFood id={restaurant._id}></DeleteFood> </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Container>
            </div>
        )
    }
}
export default AdminList