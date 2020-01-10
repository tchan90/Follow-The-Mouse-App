import React, { Component, Fragment } from 'react';
import Button from '@material-ui/core/Button';
import {connect} from 'react-redux';
import {logout} from '../../actions/authActions';
import PropTypes from 'prop-types'


 class SignOut extends Component {
     static propTypes = {
         logout: PropTypes.func.isRequired
     }
    render() {
        return (
            <Fragment>
 <Button variant="contained" color="primary" size="large" onClick={this.props.logout} href="">
        Sign Out 
      </Button>
            </Fragment>
        )
    }
}
export default connect(
    null, {logout}
)(SignOut)