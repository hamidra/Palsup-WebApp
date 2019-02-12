import { Formik, Field, Form } from 'formik';
import React, { Component } from 'react';

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
          onSubmit={onSubmit}>
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
            <button type="submit" class="btn btn-primary col-4">
              SignUp
            </button>
          </Form>
        </Formik>
      </div>
    </div>
  </div>
);

export default SignUpForm;
