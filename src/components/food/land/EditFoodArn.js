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


class EditFoodArn extends Component {
  constructor(props){
    super(props);
    this.onChangeName = this.onChangeName.bind(this)
    this.onChangeLocation = this.onChangeLocation.bind(this)
    this.onChangeFood = this.onChangeFood.bind(this)
    this.onChangeImage = this.onChangeImage.bind(this)
    this.onChangeLink = this.onChangeLink.bind(this)
    this.onChangeMealType = this.onChangeMealType.bind(this)
    this.onChangeService = this.onChangeService.bind(this)
    this.onChangeImage = this.onChangeImage.bind(this)

    this.state={
      name:'',
      location:'',
      food:'',
      image:'',
      imageUrl:'',
      link:'',
      mealType:'',
      service:'',
   }
  }

  async componentDidMount(){
    await FoodService.getSpecificRestaurant(this.props.match.params.id)
    .then(response=>{
      this.setState({
        name:response.data.name,
        food:response.data.food,
        location:response.data.location,
        link:response.data.link,
        mealType:response.data.mealType,
        service:response.data.service,
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
onChangeFood(e){
  this.setState({
    food: e.target.value
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
onChangeMealType(e){
  this.setState({
    mealType: e.target.value
  })
}
onChangeService(e){
  this.setState({
    service: e.target.value
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
    const updRestaurant={
        name:this.state.name,
        location:this.state.location,
        food:this.state.food,
        imageUrl:this.state.image,
        link:this.state.link,
        mealType:this.state.mealType,
        service:this.state.service,
    }
    console.log(updRestaurant)
    //update restaurat
     FoodService.updateRestaurant(this.props.match.params.id,updRestaurant)
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
        const {name,location,food,image,imageUrl,link,mealType,service} = this.state
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
            <Typography color="textPrimary">Edit Restaurant</Typography>
          </Breadcrumbs>
            <form onSubmit={this.handleSubmit} className="formStyle">
                <h1>Edit Restaurant</h1>
                <div className='formContainer'>
                    <div> 
                    <Name name="name" type="name" value={name} label="Name" onChange={this.onChangeName}/>
                    <SelectMenu name="location" type="location" value={location} label="Location" onChange={this.onChangeLocation}/>
                    <SelectMenuMeal name="mealType" type="mealType" value={mealType} label="Meal Type" onChange={this.onChangeMealType}/>
                    <SelectService name="service" type="service" value={service} label="Service Type" onChange={this.onChangeService}/>
                    </div>
            </div>
            <div> <Information name="food" type="food" value={food} label="Foods" 
                    onChange={this.onChangeFood}/></div>
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
            </form>
            </div> 
        )
    }
}

export default EditFoodArn