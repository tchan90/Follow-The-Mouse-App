import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import RideService from '../../../services/RideService'

class DeleteRide extends Component {
    
    deleteRide = async() => {
        if(
          window.confirm(
            `Do you want to delete this ride with id ${this.props.id}?`
          )
        )
        {
          await RideService.deleteRide(this.props.id)
          .then(window.location.reload())
        }
        
      }

    render() {
        return (
            <div>
                <Button color="secondary" onClick={this.deleteRide}>Delete</Button>
            </div>
        )
    }
}
export default DeleteRide