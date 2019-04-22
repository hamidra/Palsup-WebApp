import React from 'react';
import { connect } from 'react-redux';
import * as dux from '../../redux/dux/index';
import { Formik, Field, Form } from 'formik';

const SignUpForm = ({ onSubmit }) => (
  <div>
    <div className=" row justify-content-center">
      <div className="col-12 col-lg-6 border p-5 m-5 rounded">
        <h1>Sign Up</h1>
        <h2>To hang out with Kool Pals</h2>
        <Formik
          initialValues={{
            name: {
              first: '',
              last: ''
            },
            gender: 'UNKNOWN',
            email: '',
            cell: '',
            password: '',
            dob: ''
          }}
          onSubmit={async (
            values,
            { setSubmitting, initialValues, resetForm }
          ) => {
            await onSubmit(values);
            setSubmitting(false);
            resetForm(initialValues);
          }}>
          <Form>
            <div className="form-row">
              <div className="form-group col-sm-6">
                <Field
                  name="name.first"
                  className="form-control mr-2"
                  placeholder="First name"
                />
              </div>
              <div className="form-group col-sm-6">
                <Field
                  name="name.last"
                  className="form-control col"
                  placeholder="Last name"
                />
              </div>
            </div>
            <div className="form-group">
              <Field
                name="email"
                className="form-control"
                type="email"
                placeholder="Email"
              />
            </div>
            <div className="form-group">
              <Field
                name="password"
                className="form-control"
                type="password"
                placeholder="New password"
              />
            </div>
            <div className="form-group">
              <label class="form-check-label" for="dob">
                Birthday
              </label>
              <Field name="dob" className="form-control" type="date" />
            </div>
            <button type="submit" className="btn btn-primary col-sm-4 mb-1">
              SignUp
            </button>
            <p>
              Already a member? <a href="/signin">Login</a>
            </p>
          </Form>
        </Formik>
      </div>
    </div>
  </div>
);

const mapDispatchToProps = dispatch => ({
  onSubmit: async values => {
    var user = {
      gender: values.gender,
      name: values.name,
      email: values.email,
      cell: values.cell,
      password: values.password,
      dob: values.dob
    };
    dispatch(dux.asyncActions.createUser(user));
  }
});

export default connect(
  null,
  mapDispatchToProps
)(SignUpForm);
