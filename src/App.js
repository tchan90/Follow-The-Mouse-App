import React from 'react';
import './App.css';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Landing from './components/pages/Landing';
import ListAll from './components/pages/ListAll';
import Admin from './components/pages/Admin';
import AddRideArn from './components/rides/land/AddRide';
import ViewRideArn from './components/rides/land/ViewRide-Arn';
import ViewFoodArn from './components/food/land/ViewFood-Arn';
import AdminList from './components/pages/AdminList';
import EditRideArn from './components/rides/land/EditRide';
import AddFoodArn from './components/food/land/AddFoodArn';
import EditFoodArn from './components/food/land/EditFoodArn';
import PhotoAlbum from './components/pages/PhotoAlbum/PhotoAlbum';
import FirebaseStorageRides from './components/pages/PhotoAlbum/FirebaseStorage';
import SignIn from './components/authentication/SignIn'

function App() {
  return (
    <div className="App">
      <Router>
      <Navbar />
      <Switch> 
      <Route  path="/" exact component={Landing}/>
      <Route  path="/ListAll" exact component={ListAll}/>
      <Route path="/admin" exact component={Admin}/>
      <Route path="/addRide-Arnaheim" exact component={AddRideArn}/>
      <Route path="/ride/:id" exact component={ViewRideArn}/>
      <Route path="/restaurant/:id" exact component={ViewFoodArn}/>
      <Route path="/admin-list" exact component={AdminList}/>
      <Route path="/updateRide-Arnaheim/:id" exact component={EditRideArn}/>
      <Route path="/addFood-Arnaheim" exact component={AddFoodArn}/>
      <Route path="/updateRestaurant-Arnaheim/:id" exact component={EditFoodArn}/>
      <Route path="/photoAlbum" exact component={PhotoAlbum}/>
      <Route path="/firebaseStorage_rides" exact component={FirebaseStorageRides}/>
      <Route path="/signIn" exact component={SignIn}/>
      </Switch> 
      </Router>
    </div>
  );
}

export default App;
