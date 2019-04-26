import React from 'react';
import { connect } from 'react-redux';
import { Formik, Field, Form } from 'formik';
import * as dux from '../../redux/dux/index';

const SignInForm = ({ onSubmit }) => (
  <div>
    <div className=" row justify-content-center">
      <div className="col-12 col-lg-6 border p-5 m-5 rounded">
        <h1>Log in</h1>
        <p>
          Not registered with us yet? <a href="/signup">Sign up</a>
        </p>
        <Formik
          initialValues={{
            userId: '',
            password: ''
          }}
          onSubmit={async (
            values,
            { setSubmitting, resetForm, initialValues }
          ) => {
            await onSubmit(values);
            setSubmitting(false);
            resetForm(initialValues);
          }}>
          <Form>
            <div className="form-group">
              <Field
                name="userId"
                className="form-control mr-2"
                placeholder="Email or mobile number"
              />
            </div>
            <div className="form-group">
              <Field
                name="password"
                className="form-control"
                type="password"
                placeholder="password"
              />
            </div>
            <button type="submit" className="btn btn-primary col-12 col-lg-4">
              Log in
            </button>
          </Form>
        </Formik>
      </div>
    </div>
  </div>
);

const mapDispatchToProps = dispatch => ({
  onSubmit: async values => {
    var authInfo = {
      userAuthId: values.userId,
      passwordHash: values.password
    };
    dispatch(dux.asyncActions.fetchUserByAuthInfo(authInfo));
  }
});

export default connect(
  null,
  mapDispatchToProps
)(SignInForm);
