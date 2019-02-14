import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Formik, Field } from 'formik';
import Button from "@material-ui/core/Button";
import Input from '../../components/UI/Input/Input';
import * as Yup from 'yup';
import * as actions from '../../store/actions';

const validationSchema = Yup.object().shape({
  email: Yup.string().required().email('email is invalid'),
  password: Yup.string().required()
});

class Auth extends Component {
  componentDidUpdate() {
    const { error } = this.props;
    if (error) {
      this.form.setErrors({email: error});
      this.form.setSubmitting(false)      
    }
  }

  render() {
    return (
      <Formik
        ref={el => (this.form = el)}
        initialValues={{ email: '', password: '' }}
        onSubmit={ (model) => this.props.onAuth(model.email, model.password) }
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
          <form onSubmit={handleSubmit}>
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
            <div>
             <Button
               type="submit"
               variant="contained"
               color="primary"
               disabled={isSubmitting || !isValid}
             >
               Sign In
             </Button>
            </div>
          </form>
        )}
      </Formik>
    );
  }
}

const mapStateToProps = state => {
  return {
    error: state.auth.error,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onAuth: (email, password) => dispatch(actions.auth(email, password)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Auth);