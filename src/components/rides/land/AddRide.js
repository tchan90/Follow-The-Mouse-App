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
import BlockIcon from '@material-ui/icons/Block';


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
         }
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
    //If form valid
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
     
}
     
    render() {
        const {name,location,information,image,link,fastPass,hiddenMickey} = this.state
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
                    <SelectMenu name="location" type="location" value={location} label="Location" onChange={this.handleChange}/>
                    <SelectMenuTF name="fastPass" type="fastPass" value={fastPass} label="Fast Pass" 
                    onChange={this.handleChange}/>
                    <SelectMenuTF name="hiddenMickey" type="hiddenMickey" value={hiddenMickey} label="Hidden Mickey" 
                    onChange={this.handleChange}/>
                    </div>
            </div>
            <div> <Information name="information" type="information" value={information} label="Information" 
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

export default AddRideArn