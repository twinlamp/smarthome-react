import React, { Component } from 'react';
import { Formik, Field } from 'formik';
import Button from "@material-ui/core/Button";
import Input from '../../components/UI/Input/Input'
import * as Yup from 'yup';

const validationSchema = Yup.object().shape({
  email: Yup.string().required().email('email is invalid'),
  password: Yup.string().required().min(8, 'password must be at least 8 characters')
});

class Auth extends Component {

  onSubmit(model) {
    console.log(model)
  }

  render() {
    return (
      <Formik
        initialValues={{ email: '', password: '' }}
        onSubmit={this.onSubmit}
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

export default Auth