import axios from 'axios';
import {returnErrors } from './errorActions';
import {LOGIN_SUCCESS, LOGIN_FAIL, LOGOUT_SUCCESS, USER_LOADING, USER_LOADED, GET_ERRORS, CLEAR_ERRORS, AUTH_ERROR} from './types'

// Check token and load user
export const loadUser = () => (dispatch, getState) => {
    //User loading
    dispatch({ type: USER_LOADING});

    axios.get('http://localhost:5000/admin', tokenConfig(getState))
    .then(res => dispatch({
        type: USER_LOADED,
        payload:res.data
    }))
    .catch(err => {
        dispatch(returnErrors(err.response.data, err.response.status));
        dispatch({
            type: AUTH_ERROR
        });
    });
};

//Login User
export const login = ({email,password}) => dispatch => {
    //Headers
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    };

    //Request body
    const body = JSON.stringify({email,password})

    axios
    .post('http://localhost:5000/signIn', body, config)
    .then(res => 
        dispatch({
            type:LOGIN_SUCCESS,
            payload:res.data
        })
        )
        .catch(err=>{
            dispatch(
                returnErrors(err.response.data, err.response.status, 'LOGIN_FAIL')
            );
            dispatch({
                type:LOGIN_FAIL
            })
        })
}

//Logout User
export const logout = () => {
    return {
        type: LOGOUT_SUCCESS
    };
};

//Setup config/headers and token
export const tokenConfig = getState => {
    //Get token from local storage
    const token = getState().auth.token;

    //Headers
    const config = {
        headers: {
            "Content-type": "application/json"
        }
    }

    //if token, add to headers
    if(token){
        config.headers['x-auth-token'] = token;
    }

    return config;
};