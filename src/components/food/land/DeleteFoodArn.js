import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import FoodService from '../../../services/FoodService'

class DeleteFoodArn extends Component {
    
  deleteFood = async() => {
        if(
          window.confirm(
            `Do you want to delete this restaurant with id ${this.props.id}?`
          )
        )
        {
          await FoodService.deleteRestaurant(this.props.id)
          .then(window.location.reload())
          console.log('Ride deleted')
        }
        
      }

    render() {
        return (
            <div>
                <Button color="secondary" onClick={this.deleteFood}>Delete</Button>
            </div>
        )
    }
}
export default DeleteFoodArn