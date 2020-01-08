import React, { Component } from 'react'
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import {Link} from 'react-router-dom';
import UserService from '../../services/UserService'
import classnames from 'classnames';
import RemoveCircleIcon from '@material-ui/icons/RemoveCircle';

const validEmailRegex =   RegExp(/^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i);

const validateForm = (errors) => {
    let valid = true;
    Object.values(errors).forEach(
        (val) => val.length > 0 && (valid = false)
    )
    return valid;
}

class SignIn extends Component {
    constructor(){
        super();
        this.state={
            email:'',
            password:'',
            errorMsg:false,
            errors:{
                email:'',
                password:''
            },
        }
        this.onChange=this.onChange.bind(this);
        this.onSubmit=this.onSubmit.bind(this);
    }
    onChange = (event) => {
        event.preventDefault();
  const { name, value } = event.target;
  let errors = this.state.errors;
        switch(name){
            case 'email':
                errors.email = validEmailRegex.test(value) ? '' : 'Email is not valid';
                break;
            case 'password':
                errors.password = value.length < 6 ? 'Password must be over 6 characters':'';
                break;
                default:
                    break;
        }
        this.setState({errors,[name]:value})
        }
        onSubmit(e){
          e.preventDefault()
          if(validateForm(this.state.errors)){
              console.log('valid')
              const user={
                email:this.state.email,
                password:this.state.password,
              };
              console.log(user);
              UserService.loginUser(user)
              .then(res=> console.log(res.data))
              .catch(error => {
                this.setState({errorMsg:true})
                console.log(error.data)
              }
                );
          }else{
              console.error('invalid form')
          }
        }
      
    render() {
        const {errors,email,password,errorMsg} = this.state;
        return (
            <div>
                <form className="formStyle" style={{marginTop:"20px"}} onSubmit={this.onSubmit}>
                <h1>Sign In</h1>
                <div className='formContainer flex-vert'>
             <TextField name="email" type="email" label="Email" value={email} onChange={this.onChange} className={classnames ('validate',{'is-invalid':errors.email})}
                   /> 
          {errors.email.length > 0 && 
  <span style={{color:'red'}}>{errors.email}</span>}
            <TextField name="password" type="password" label="Password" value={password} onChange={this.onChange} className={classnames ('validate',{'is-invalid':errors.password})}
                   /> 
            {errors.password.length > 0 && 
  <span style={{color:'red'}}>{errors.password}</span>}
  {errorMsg ? <div style={{marginTop:'15px'}}><RemoveCircleIcon color="secondary"/><p style={{color:'red'}}>An error occured signing in</p></div>  : ""}
                   <div style={{paddingTop:"20px"}}> 
<Button color="primary" type="submit">
        Submit
      </Button>  
      <Button color="primary" type="submit" component={Link} to="/admin">
        Cancel
      </Button></div></div>
            </form>
            </div>
        )
    }
}

export default SignIn