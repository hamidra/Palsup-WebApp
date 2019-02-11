import { Formik, Field, Form } from 'formik';
import React, { Component } from 'react';
import { createUser } from '../controllers/userController';

export default class SignUp extends Component {
  signUpUser(values) {
    var user = {
      gender: values.gender,
      name: values.name,
      email: values.email,
      cell: values.cell,
      password: values.password,
      dob: values.dob,
      registrationDate: Date.now().toString()
    };
    return createUser(user)
      .then(r => r.json())
      .then(json => {
        if (json.error) {
          throw new Error(json.error);
        } else if (json.data) {
          alert(JSON.stringify(json, null, 2));
        } else {
          throw new Error('no data field in the result');
        }
      });
  }

  render() {
    return (
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
              onSubmit={(values, actions) => {
                this.signUpUser(values);
                actions.setSubmitting(false);
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
                <button type="submit" class="btn btn-primary col-4">
                  SignUp
                </button>
              </Form>
            </Formik>
          </div>
        </div>
      </div>
    );
  }
}
