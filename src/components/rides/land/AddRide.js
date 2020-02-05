import React, { Component } from 'react';
import {storage} from '../../../config/firebase-config';
import Button from '@material-ui/core/Button';
import Name from '../../FormFields/Name';
import SelectMenu from '../../FormFields/SelectMenu-Arn';
import SelectMenuTF from '../../FormFields/SelectMenu-TF';
import Information from '../../FormFields/Information';
import SingleField from '../../FormFields/SingleField';
import Upload from '../../FormFields/Upload';
import {Link} from'react-router-dom';
import Typography from '@material-ui/core/Typography';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import MatLink from '@material-ui/core/Link';
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';
import RideService from '../../../services/RideService';
import { Alert } from '@material-ui/lab';

const validateForm = (errors) => {
    let valid = true;
    Object.values(errors).forEach(
      // if we have an error string set valid to false
      (val) => val.length > 0 && (valid = false)
    );
    return valid;
  }

class AddRideArn extends Component {
    constructor(props){
        super(props);
        this.state={
            name:'',
            location:'',
            information:'',
            image:'',
            imageUrl:'',
            link:'',
            fastPass:'',
            hiddenMickey:'',
            errors:{
            name:'',
            location:'',
            information:'',
            image:'',
            link:'',
            fastPass:'',
            hiddenMickey:'',
            },
         
         }
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
        case 'information':
            errors.information = value.length < 1  ? 'You must fill in this field':'';
        break;
        case 'image':
            errors.image = value.length < 1   ? 'You must upload an image' : '';
        break;
        case 'link': 
            errors.link = value.length < 1  ? 'You must provide a link' : '';
        break;
        case 'fastPass' : 
            errors.fastPass = value.length < 1 ? 'You must select an option':'';
        break;
        case 'hiddenMickey' : 
            errors.hiddenMickey = value.length < 1 ? 'You must select an option': '';
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
    //If form valid
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
             RideService.addRide(newRide)
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
       
     
}
     
    render() {
        const {name,location,information,image,link,fastPass,hiddenMickey, errors} = this.state
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
            <Typography color="textPrimary">Add Ride</Typography>
          </Breadcrumbs>
            <form onSubmit={this.handleSubmit} className="formStyle" >
                <h1>Add Ride</h1>
                <div className='formContainer'>
                    <div> 
                    <Name name="name" type="name" value={name} label="Name" onChange={this.handleChange}/>
                    {errors.name.length > 0 && 
  <Alert severity='error'>{errors.name}</Alert>}
                    <SelectMenu name="location" type="location" value={location} label="Location" onChange={this.handleChange}/>
                    {errors.location.length > 0 && 
  <Alert severity='error'>{errors.location}</Alert>}
                    <SelectMenuTF name="fastPass" type="fastPass" value={fastPass} label="Fast Pass" 
                    onChange={this.handleChange}/>
                    {errors.fastPass.length > 0 && 
  <Alert severity='error'>{errors.fastPass}</Alert>}
                    <SelectMenuTF name="hiddenMickey" type="hiddenMickey" value={hiddenMickey} label="Hidden Mickey" 
                    onChange={this.handleChange}/>
                    {errors.hiddenMickey.length > 0 && 
  <Alert severity='error'>{errors.hiddenMickey}</Alert>}
                    </div>
            </div>
            <div> <Information name="information" type="information" value={information} label="Information" 
                    onChange={this.handleChange}/>
                     {errors.information.length > 0 && 
  <Alert severity='error'>{errors.information}</Alert>}</div>
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

export default AddRideArn