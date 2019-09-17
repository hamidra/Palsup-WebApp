import React from 'react';
import { connect } from 'react-redux';
import * as dux from '../../redux/dux/index';
import { Formik, Field, Form } from 'formik';
import { Redirect } from 'react-router-dom';

const SignUpForm = ({ onSubmit, isAuthenticated }) => (
  <div>
    {isAuthenticated && <Redirect to="/" />}
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
            education: {
              school: '',
              class: ''
            },
            work: { organization: '', title: '' },
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
              <label className="form-check-label" for="dob">
                Birthday
              </label>
              <Field name="dob" className="form-control" type="date" />
            </div>
            <label className="form-check-label">Education</label>
            <div className="form-row">
              <div className="form-group col-sm-6">
                <Field
                  name="education.school"
                  className="form-control mr-2"
                  placeholder="school"
                />
              </div>
              <div className="form-group col-sm-6">
                <Field
                  name="education.class"
                  className="form-control col"
                  placeholder="class of"
                />
              </div>
            </div>
            <label className="form-check-label">Work</label>
            <div className="form-row">
              <div className="form-group col-sm-6">
                <Field
                  name="work.title"
                  className="form-control mr-2"
                  placeholder="title"
                />
              </div>
              <div className="form-group col-sm-6">
                <Field
                  name="work.organization"
                  className="form-control col"
                  placeholder="company"
                />
              </div>
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
const mapStateToProps = state => ({
  isAuthenticated:
    state.user && state.user.isAuthenticated && state.user.info ? true : false
});
const mapDispatchToProps = dispatch => ({
  onSubmit: async values => {
    var user = {
      gender: values.gender,
      name: values.name,
      email: values.email,
      cell: values.cell,
      password: values.password,
      work: [values.work],
      education: [values.education],
      dob: values.dob
    };
    dispatch(dux.asyncActions.createUser(user));
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SignUpForm);
