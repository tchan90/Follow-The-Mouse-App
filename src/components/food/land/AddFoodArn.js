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
import FoodService from '../../../services/FoodService';
import { Alert } from '@material-ui/lab';

const validateForm = (errors) => {
    let valid = true;
    Object.values(errors).forEach(
      // if we have an error string set valid to false
      (val) => val.length > 0 && (valid = false)
    );
    return valid;
  }

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
        errors:{
            name:'',
            location:'',
            food:'',
            image:'',
            link:'',
            mealType:'',
            service:'',
            },
     }

handleChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    let errors = this.state.errors; 
    switch(name){
        case 'name':
            errors.name = value.length < 1 ? 'You must fill in this field' : '';
        break;
        case 'location': 
        errors.location = value.length < 1  ? 'You must select an option' : '';
        break;
        case 'food':
            errors.food = value.length < 1  ? 'You must fill in this field':'';
        break;
        case 'image':
            errors.image = value.length < 1   ? 'You must upload an image' : '';
        break;
        case 'link': 
            errors.link = value.length < 1  ? 'You must provide a link' : '';
        break;
        case 'mealType' : 
            errors.mealType = value.length < 1 ? 'You must select an option':'';
        break;
        case 'service' : 
            errors.service = value.length < 1 ? 'You must select an option': '';
        break;
        default:
            break;
    }
    this.setState({errors, [name]: value}, ()=> {
        console.log(errors)
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
    //validation
    if(validateForm(this.state.errors)){
        console.info('Valid Form')
         //upload image to Firebase
     const{image} = this.state;
     const uploadTask = storage.ref(`rideImages/${image.name}`).put(image);
         //Event listener
         //Progress, error, and complete are seperate functions
     uploadTask.on('state_changed', (snapshot)=>{
         //progress function
     }, (error) => {
         //error function
         console.log('Firebase error msg: ' + error);
     }, ()=>{
         //complete function
         storage.ref('rideImages').child(image.name).getDownloadURL().then(url => {
             console.log(url);
             this.setState({
                 imageUrl: url
             })
             //store data into database
             const newRide={
                name:this.state.name,
                location:this.state.location,
                information:this.state.information,
                link:this.state.link,
                fastPass:this.state.fastPass,
                hiddenMickey:this.state.hiddenMickey,
                imageUrl: this.state.imageUrl
            }
            console.log(newRide)
            //post new ride
             FoodService.addRide(newRide)
            .then(res=> console.log(res.data))
            .catch(err=>console.log('Error ' + err))
            //reset 
            this.setState({
                name:'',
                location:'',
                information:'',
                image:'',
                imageUrl:'',
                link:'',
                fastPass:'',
                hiddenMickey:'',
            })
         })
     });
    }else{
        console.error('invalid form')
    }
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
        const {name,location,food,image,link,mealType,service,errors} = this.state
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
                    {errors.name.length > 0 && 
  <Alert severity='error'>{errors.name}</Alert>}
                    <SelectMenu name="location" type="location" value={location} label="Location" onChange={this.handleChange}/>
                    {errors.location.length > 0 && 
  <Alert severity='error'>{errors.location}</Alert>}
                    <SelectMenuMeal name="mealType" type="mealType" value={mealType} label="Meal Type" onChange={this.handleChange}/>
                    {errors.mealType.length > 0 && 
  <Alert severity='error'>{errors.mealType}</Alert>}
                    <SelectService name="service" type="service" value={service} label="Service Type" onChange={this.handleChange}/>
                    {errors.service.length > 0 && 
  <Alert severity='error'>{errors.service}</Alert>}
                    </div>
            </div>
            <div> <Information name="food" type="food" value={food} label="Foods" 
                    onChange={this.handleChange}/>
                        {errors.food.length > 0 && 
  <Alert severity='error'>{errors.food}</Alert>}
                    </div>
            <div>  <SingleField name="link" type="link" value={link} label="link" 
                    onChange={this.handleChange}/> 
                       {errors.link.length > 0 && 
  <Alert severity='error'>{errors.link}</Alert>}
                    </div>
                    <div style={{marginTop:'20px'}}> 
                    <Upload onChange={this.handleUploadChange}/>
                    {errors.image.length > 0 && 
  <Alert severity='error'>{errors.image}</Alert>}
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