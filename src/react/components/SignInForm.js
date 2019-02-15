import { Formik, Field, Form } from 'formik';
import React, { Component } from 'react';

const SignInForm = ({ onSubmit }) => (
  <div>
    <div className=" row justify-content-center">
      <div className="col-12 col-lg-6 border p-5 m-5 rounded">
        <h1>Log in</h1>
        <Formik
          initialValues={{
            userId: '',
            password: ''
          }}
          onSubmit={onSubmit}>
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
            <button type="submit" class="btn btn-primary col-4">
              Log in
            </button>
          </Form>
        </Formik>
      </div>
    </div>
  </div>
);

export default SignInForm;
