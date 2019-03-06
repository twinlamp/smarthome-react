import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Formik, Field } from 'formik';
import Button from "@material-ui/core/Button";
import Link from '@material-ui/core/Link';
import Input from '../../components/UI/Input/Input';
import Snackbar from '../../components/UI/Snackbar/Snackbar';
import * as Yup from 'yup';
import * as actions from '../../store/actions';
import classes from './Auth.module.css'
import CircularProgress from '@material-ui/core/CircularProgress';

const validationSchema = Yup.object().shape({
  email: Yup.string().required().email('email is invalid'),
  password: Yup.string().required()
});

class Auth extends Component {
  state = {
    isSignUp: false,
    showSnackbar: false
  }

  componentDidUpdate(prevProps) {
    const { errors } = this.props;
    if (errors) {
      this.form.setErrors(errors);
      this.form.setSubmitting(false)      
    }
    if (!errors && prevProps.loading && !this.props.loading && this.form.getFormikContext().isSubmitting) {
      this.form.setSubmitting(false)
      this.toggleSignUp()
      this.toggleSnackbar()
    }
  }

  toggleSignUp = () => {
    this.setState(prevState => {
      return { isSignup: !prevState.isSignup };
    });
  }

  toggleSnackbar = () => {
    this.setState(prevState => {
      return { showSnackbar: !prevState.showSnackbar };
    })
  }

  onAuth = (model) => {
    if (this.state.isSignup) {
      this.props.onSignUp(model.email, model.password)
    } else {
      this.props.onSignIn(model.email, model.password)
    }
  }

  render() {
    return (
      <React.Fragment>
        <Formik
          ref={el => (this.form = el)}
          initialValues={{ email: '', password: '' }}
          onSubmit={this.onAuth}
          validationSchema={validationSchema}
        >
          {({
            values,
            errors,
            touched,
            handleChange,
            handleBlur,
            handleSubmit,
            isSubmitting,
            isValid
          }) => (
            <form onSubmit={handleSubmit} className={classes.Auth}>
              <Field
                name="email"
                type="text"
                component={Input}
                label="Email"
                margin="normal"
                variant="outlined"
              />
              <Field
                name="password"
                type="password"
                component={Input}
                label="Password"
                margin="normal"
                variant="outlined"
              />
              <Button
                type="submit"
                variant="contained"
                color="primary"
                size="large"
                disabled={isSubmitting || !isValid}
                classes={{
                  disabled: classes.DisabledButton
                }}
              >
                {this.state.isSignup ? 'Sign Up' : 'Sign In'}
                {this.props.loading && <CircularProgress size={24} className={classes.ButtonProgress} />}
              </Button>
              <Link
                className={classes.Link}
                onClick={this.toggleSignUp}
              >
                {this.state.isSignup ? 'Already have an account? Please sign in.' : "Don't have an account? Please sign up."}
              </Link>
            </form>
          )}
        </Formik>
        <Snackbar
          open={this.state.showSnackbar}
          message={<span>You've registered successfully. You can sign in now.</span>}
          onClose={this.toggleSnackbar}
        />
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => {
  return {
    errors: state.auth.errors,
    loading: state.auth.loading
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onSignIn: (email, password) => dispatch(actions.signIn(email, password)),
    onSignUp: (email, password) => dispatch(actions.signUp(email, password)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Auth);