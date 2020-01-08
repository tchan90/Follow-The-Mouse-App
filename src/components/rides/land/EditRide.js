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
import RideService from '../../../services/RideService'


class EditRideArn extends Component {
  constructor(props){
    super(props);
    this.onChangeName = this.onChangeName.bind(this)
    this.onChangeLocation = this.onChangeLocation.bind(this)
    this.onChangeInformation = this.onChangeInformation.bind(this)
    this.onChangeImage = this.onChangeImage.bind(this)
    this.onChangeLink = this.onChangeLink.bind(this)
    this.onChangefastPass = this.onChangefastPass.bind(this)
    this.onChangehiddenMickey = this.onChangehiddenMickey.bind(this)
    this.onChangeImage = this.onChangeImage.bind(this)

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
  
 async componentDidMount(){
    await RideService.getSpecificRide(this.props.match.params.id)
    .then(response=>{
      this.setState({
        name:response.data.name,
        information:response.data.information,
        location:response.data.location,
        link:response.data.link,
        fastPass:response.data.fastPass,
        hiddenMickey:response.data.hiddenMickey,
        imageUrl:response.data.imageUrl
                })
    })
    .catch((error)=>{
      console.log(error)
    })
 }

 handleUploadChange = event => {
  this.setState({
      image: event.target.files[0],
      loaded:0,
  })
}

onChangeName(e){
  this.setState({
    name: e.target.value
  })
}
onChangeLocation(e){
  this.setState({
    location: e.target.value
  })
}
onChangeInformation(e){
  this.setState({
    information: e.target.value
  })
}
onChangeImage(e){
  this.setState({
    image: e.target.value
  })
}
onChangeLink(e){
  this.setState({
    link: e.target.value
  })
}
onChangefastPass(e){
  this.setState({
    fastPass: e.target.value
  })
}
onChangehiddenMickey(e){
  this.setState({
    hiddenMickey: e.target.value
  })
}

handleSubmit = async(e) => {
    e.preventDefault();
     //upload image to Firebase
     const{image} = this.state;
     const uploadTask = storage.ref(`images/${image.name}`).put(image);
        //Event listener
         //Progress, error, and complete are seperate functions
         uploadTask.on('state_changed', (snapshot)=>{
          //progress function
      }, (error) => {
          //error function
          console.log(error);
      }, ()=>{
          //complete function
          storage.ref('images').child(image.name).getDownloadURL().then(url => {
              console.log(url);
              this.setState({
                  imageUrl: url
              })
              const updRide={
                name:this.state.name,
                location:this.state.location,
                information:this.state.information,
                imageUrl:this.state.imageUrl,
                link:this.state.link,
                fastPass:this.state.fastPass,
                hiddenMickey:this.state.hiddenMickey,
            }
            console.log(updRide)
            //update ride
             RideService.updateRide(this.props.match.params.id, updRide)
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
        const {name,location,information,image,link,fastPass,hiddenMickey,imageUrl} = this.state
        return (
            <div> 
            <Breadcrumbs aria-label="breadcrumb" className="breadcrumb-margins">
            <MatLink color="inherit" href="/home">
              Home
            </MatLink>
            <MatLink color="inherit" href="/admin">
              Admin
            </MatLink>
            <MatLink color="textPrimary" href="/admin-list">List</MatLink>
            <Typography color="textPrimary">Edit Ride</Typography>
          </Breadcrumbs>

            <form onSubmit={this.handleSubmit} className="formStyle">
                <h1>Edit Ride</h1>
                <div className='formContainer'>
                    <div> 
                    <Name name="name" type="name" value={name} label="Name" onChange={this.onChangeName}/>
                    <SelectMenu name="location" type="location" value={location} label="Location" onChange={this.onChangeLocation}/>
                    <SelectMenuTF name="fastPass" type="fastPass" value={fastPass} label="Fast Pass" 
                    onChange={this.onChangefastPass}/>
                    <SelectMenuTF name="hiddenMickey" type="hiddenMickey" value={hiddenMickey} label="Hidden Mickey" 
                    onChange={this.onChangehiddenMickey}/>
                    </div>
            </div>
            <div> <Information name="information" type="information" value={information} label="Information" 
                    onChange={this.onChangeInformation}/></div>
            <div>  <SingleField name="link" type="link" value={link} label="link" 
                    onChange={this.onChangeLink}/> </div>
                  
                    <div style={{marginTop:'20px'}}> 
                    <Upload onChange={this.handleUploadChange}/>
                    {image ? <div> <CheckCircleOutlineIcon fontSize="medium" style={{marginTop:'10px'}}/> Image Changed!
                    </div> : ''}
                    <div>
                      <img src={imageUrl} alt="Uploaded image" className="uploadedImg"/>
                    </div>
                    </div>
                <div style={{marginTop:'20px'}}>
<Button color="primary" type="submit">
        Submit
      </Button>  
      <Button color="primary" type="submit" component={Link} to="/admin">
        Cancel
      </Button></div>
      <div>
      </div>
            </form>
            </div> 
        )
    }
}

export default EditRideArn