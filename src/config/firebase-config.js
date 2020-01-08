import firebase from 'firebase/app';
import 'firebase/storage';

var config = {
    apiKey: "AIzaSyA2xk3ODIfqlBCv-8fwnAbHwuD9rs2CBoE",
    authDomain: "disney-itinery.firebaseapp.com",
    databaseURL: "https://disney-itinery.firebaseio.com",
    projectId: "disney-itinery",
    storageBucket: "disney-itinery.appspot.com",
    messagingSenderId: "1042626257929",
    appId: "1:1042626257929:web:4bed6450ba9b18bb4f04d8"
  };

  firebase.initializeApp(config);
  
  var storage = firebase.storage();

  export{
      storage,firebase as default
  }
