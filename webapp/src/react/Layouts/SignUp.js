import React from 'react';
import { connect } from 'react-redux';
import * as dux from '../../redux/dux/index';
import { Formik, Field, Form } from 'formik';
import { Redirect } from 'react-router-dom';
import * as yup from 'yup';

const SignupSchema = yup.object().shape({
  name: yup.object().shape({
    first: yup
      .string()
      .trim()
      .min(1, 'Required')
      .required('Required')
  }),
  email: yup
    .string()
    .email('Invalid email')
    .required('Required'),
  password: yup
    .string()
    .trim()
    .min(8, 'Password must be more than 8 characters')
    .required('Required'),
  dob: yup.date().required('Required')
});

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
            dob: '',
            bio: ''
          }}
          validationSchema={SignupSchema}
          onSubmit={async (
            values,
            { setSubmitting, initialValues, resetForm }
          ) => {
            await onSubmit(values);
            setSubmitting(false);
            resetForm(initialValues);
          }}>
          {({ errors, touched }) => (
            <Form>
              <div className="form-row">
                <div className="form-group col-sm-6">
                  <Field
                    name="name.first"
                    className="form-control mr-2"
                    placeholder="First name"
                  />
                  {errors.name &&
                  errors.name.first &&
                  touched.name &&
                  touched.name.first ? (
                    <div className="form-error">{errors.name.first}</div>
                  ) : null}
                </div>
                <div className="form-group col-sm-6">
                  <Field
                    name="name.last"
                    className="form-control col"
                    placeholder="Last name"
                  />
                </div>
              </div>
              {/*<div class="custom-control custom-radio custom-control-inline">
              <input
                type="radio"
                id="male"
                name="gender"
                class="custom-control-input"
              />
              <label class="custom-control-label" for="customRadioInline1">
                Male
              </label>
            </div>
            <div class="custom-control custom-radio custom-control-inline">
              <input
                type="radio"
                id="female"
                name="gender"
                class="custom-control-input"
              />
              <label class="custom-control-label" for="customRadioInline2">
                Female
              </label>
            </div>
            <div class="custom-control custom-radio custom-control-inline">
              <input
                type="radio"
                id="other"
                name="gender"
                class="custom-control-input"
              />
              <label class="custom-control-label" for="customRadioInline2">
                Other
              </label>
            </div>*/}
              <div className="form-group">
                <Field
                  name="email"
                  className="form-control"
                  type="email"
                  placeholder="Email"
                />
                {errors.email && touched.email ? (
                  <div className="form-error">{errors.email}</div>
                ) : null}
              </div>
              <div className="form-group">
                <Field
                  name="password"
                  className="form-control"
                  type="password"
                  placeholder="New password"
                />
                {errors.password && touched.password ? (
                  <div className="form-error">{errors.password}</div>
                ) : null}
              </div>
              <div className="form-group">
                <Field
                  name="bio"
                  className="form-control"
                  component="textarea"
                  rows="5"
                  maxlength="500"
                  placeholder="Tell your pals more about yourself in 500 characters"
                />
              </div>
              <div className="form-group">
                <label className="form-check-label" for="dob">
                  Birthday
                </label>
                <Field name="dob" className="form-control" type="date" />
                {errors.dob && touched.dob ? (
                  <div className="form-error">{errors.dob}</div>
                ) : null}
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
                    name="work.organization"
                    className="form-control col"
                    placeholder="company"
                  />
                </div>
                <div className="form-group col-sm-6">
                  <Field
                    name="work.title"
                    className="form-control mr-2"
                    placeholder="title"
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
          )}
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
      work: values.work && values.work.organization.trim() ? [values.work] : [],
      education:
        values.education && values.education.school.trim()
          ? [values.education]
          : [],
      dob: values.dob,
      bio: values.bio
    };
    dispatch(dux.asyncActions.createUser(user));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(SignUpForm);
