import React, { Component } from 'react';
import {storage} from '../../../config/firebase-config';
import Button from '@material-ui/core/Button';
import Name from '../../FormFields/Name';
import SelectMenu from '../../FormFields/SelectMenu-Arn';
import SelectMenuMeal from '../../FormFields/Select-mealType';
import SelectService from '../../FormFields/Select-service';
import Information from '../../FormFields/Information';
import SingleField from '../../FormFields/SingleField';
import Upload from '../../FormFields/Upload';
import {Link} from'react-router-dom';
import Typography from '@material-ui/core/Typography';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import MatLink from '@material-ui/core/Link';
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';
import FoodService from '../../../services/FoodService'


class AddFoodArn extends Component {
    state={
        name:'',
        location:'',
        food:'',
        image:'',
        imageUrl:'',
        link:'',
        mealType:'',
        service:'',
     }

handleChange = (e) => {
   this.setState({
       [e.target.name]: e.target.value
   })
} 
//target file name/details to be uploaded
handleUploadChange = event => {
    this.setState({
        image: event.target.files[0],
        loaded:0,
    })
 }
handleSubmit = async(e) => {
    e.preventDefault();
    //upload image to Firebase
    const{image} = this.state;
    const uploadTask = storage.ref(`foodImages/${image.name}`).put(image);
        //Event listener
        //Progress, error, and complete are seperate functions
    uploadTask.on('state_changed', (snapshot)=>{
        //progress function
    }, (error) => {
        //error function
        console.log(error);
    }, ()=>{
        //complete function
        storage.ref('foodImages').child(image.name).getDownloadURL().then(url => {
            console.log(url);
            this.setState({
                imageUrl: url
            })
            const newFood={
                name:this.state.name,
                location:this.state.location,
                food:this.state.food,
                imageUrl:this.state.imageUrl,
                link:this.state.link,
                mealType:this.state.mealType,
                service:this.state.service,
            }
            console.log(newFood)
            //post new ride
             FoodService.postRestaurant(newFood)
            .then(res=> console.log(res.data))
            .catch(err=>console.log('Error ' + err))
            //reset 
            this.setState({
                name:'',
                location:'',
                food:'',
                image:'',
                imageUrl:'',
                link:'',
                mealType:'',
                service:'',
            })
        })
    });
}
     
    render() {
        const {name,location,food,image,link,mealType,service} = this.state
        return (
            <div> 
            <Breadcrumbs aria-label="breadcrumb" className="breadcrumb-margins">
            <MatLink color="inherit" href="/home">
              Home
            </MatLink>
            <MatLink color="inherit" href="/admin">
              Admin
            </MatLink>
            <Typography color="textPrimary">Disneyland Arnaheim</Typography>
            <Typography color="textPrimary">Add Restaurant</Typography>
          </Breadcrumbs>
            <form onSubmit={this.handleSubmit} className="formStyle">
                <h1>Add Restaurant</h1>
                <div className='formContainer'>
                    <div> 
                    <Name name="name" type="name" value={name} label="Name" onChange={this.handleChange}/>
                    <SelectMenu name="location" type="location" value={location} label="Location" onChange={this.handleChange}/>
                    <SelectMenuMeal name="mealType" type="mealType" value={mealType} label="Meal Type" onChange={this.handleChange}/>
                    <SelectService name="service" type="service" value={service} label="Service Type" onChange={this.handleChange}/>
                    </div>
            </div>
            <div> <Information name="food" type="food" value={food} label="Foods" 
                    onChange={this.handleChange}/></div>
            <div>  <SingleField name="link" type="link" value={link} label="link" 
                    onChange={this.handleChange}/> </div>
                  
                    <div style={{marginTop:'20px'}}> 
                    <Upload onChange={this.handleUploadChange}/>
                    {image ? <div>
                    <CheckCircleOutlineIcon fontSize="small" style={{marginTop:'10px'}}/> Image added!
                    </div> : ''}
                    </div>
                <div style={{marginTop:'20px'}}>
<Button color="primary" type="submit">
        Submit
      </Button>  
      <Button color="primary" type="submit" component={Link} to="/admin">
        Cancel
      </Button></div>
            </form>
            </div> 
        )
    }
}

export default AddFoodArn