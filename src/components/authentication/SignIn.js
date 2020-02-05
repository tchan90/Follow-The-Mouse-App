import React, { Component } from 'react'
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {login} from '../../actions/authActions';
import { Alert } from '@material-ui/lab';


class SignIn extends Component {
    constructor(){
        super();
        this.state={
            email:'',
            password:'',
            msg:null,
        }
        this.onChange=this.onChange.bind(this);
        this.onSubmit=this.onSubmit.bind(this);
    }

    static propTypes = {
        isAuthenticated: PropTypes.bool,
        error: PropTypes.object.isRequired,
        login: PropTypes.func.isRequired,
    }

    componentDidUpdate(prevProps){
        const {error,isAuthenticated} = this.props;
        if (error !== prevProps.error){
            //check for login error
            if (error.id === 'LOGIN_FAIL'){
                this.setState({msg: error.msg.msg});
            }else{
                this.setState({msg:null})
            }
        }
        if (isAuthenticated) {
            //check if this is right***
            props.history.push("/admin");
          }
    }

    onChange = (event) => {
        event.preventDefault();
  const { name, value } = event.target;
        this.setState({[name]:value})
        }
    onSubmit(e){
          e.preventDefault()
              const user={
                email:this.state.email,
                password:this.state.password,
              };
              console.log(user);
              //Attempt to login
              this.props.login(user)
              console.log('login success')
         }
      
    render() {
        const {email,password} = this.state;
        return (
            <div>
                <form className="signInForm" onSubmit={this.onSubmit}>
                <h1>Sign In</h1>
                <div className='flex-vert'>
                    {this.state.msg ?  <Alert severity="error">{this.state.msg}</Alert> : null }
             <TextField name="email" type="email" label="Email" value={email} onChange={this.onChange} 
                   /> 
            <TextField name="password" type="password" label="Password" value={password} onChange={this.onChange}
                   /> 
                   <div style={{paddingTop:"20px"}}> 
<Button color="primary" type="submit">
        Submit
      </Button>  
     </div></div>
            </form>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated,
    error: state.error
})

export default connect(mapStateToProps, {login})(SignIn)