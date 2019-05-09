import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Formik, Field, Form } from 'formik';
import * as dux from '../../redux/dux/index';
import moment from 'moment';
import ProfilePicEditorContainer from '../containers/ProfilePicEditorContainer';

const UserProfile = class UserProfile extends Component {
  constructor(props) {
    super(props);
    this.state = { isEditable: false };
  }
  toggleEditMode() {
    this.setState(state => ({
      isEditable: !state.isEditable
    }));
  }
  validatePasswordChange(currentPass, newPass, newPassRetype) {
    if (newPass !== newPassRetype) {
      return false;
    }
    return true;
  }
  render() {
    const { user, handleSubmit } = this.props;
    return (
      <div>
        <div className=" row justify-content-center m-lg-6">
          <div className="col-12 col-lg-3 position-relative">
            <ProfilePicEditorContainer />
          </div>
          <div className="col-12 col-lg-6 border p-5 rounded">
            <Formik
              initialValues={{
                id: user.id,
                gender: user.gender,
                name: user.name,
                email: user.email,
                currentPassword: '',
                newPassword: '',
                newPasswordRetype: '',
                cell: user.cell,
                dob: moment.utc(user.dob).format('YYYY-MM-DD')
              }}
              onSubmit={async (values, { setSubmitting }) => {
                if (
                  this.validatePasswordChange(
                    values.currentPassword,
                    values.newPassword,
                    values.newPasswordRetype
                  )
                ) {
                  this.toggleEditMode();
                  await handleSubmit(values);
                  setSubmitting(false);
                } else {
                  alert('password and ');
                }
              }}
              render={props => (
                <Form>
                  <div className="form-row">
                    <div className="form-group col-sm-6">
                      <Field
                        name="name.first"
                        className="form-control mr-2"
                        placeholder="First name"
                        disabled={!this.state.isEditable}
                      />
                    </div>
                    <div className="form-group col-sm-6">
                      <Field
                        name="name.last"
                        className="form-control col"
                        placeholder="Last name"
                        disabled={!this.state.isEditable}
                      />
                    </div>
                  </div>
                  <div className="form-group">
                    <Field
                      name="email"
                      className="form-control"
                      type="email"
                      placeholder="Email"
                      disabled={!this.state.isEditable}
                    />
                  </div>
                  <div className="form-group">
                    <Field
                      name="currentPassword"
                      className="form-control"
                      type="password"
                      placeholder={
                        this.state.isEditable
                          ? 'Current password'
                          : 'Change password'
                      }
                      disabled={!this.state.isEditable}
                    />
                  </div>
                  <div className="form-group">
                    <Field
                      name="newPassword"
                      className={`form-control ${
                        !this.state.isEditable ? 'd-none' : ''
                      }`}
                      type="password"
                      placeholder="New password"
                      disabled={!this.state.isEditable}
                    />
                  </div>
                  <div className="form-group">
                    <Field
                      name="newPasswordRetype"
                      className={`form-control ${
                        !this.state.isEditable ? 'd-none' : ''
                      }`}
                      type="password"
                      placeholder="Retype new password"
                      disabled={!this.state.isEditable}
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-check-label" for="dob">
                      Birthday
                    </label>
                    <Field
                      name="dob"
                      className="form-control"
                      type="date"
                      disabled={!this.state.isEditable}
                    />
                  </div>
                  <button
                    type="submit"
                    className={`btn btn-primary col-4 ${!this.state
                      .isEditable && 'd-none'}`}>
                    Save
                  </button>
                  <button
                    className={`btn btn-primary col-4 float-right ${
                      this.state.isEditable ? 'd-none' : ''
                    }`}
                    onClick={e => {
                      e.preventDefault();
                      this.toggleEditMode();
                    }}>
                    Edit
                  </button>
                  <button
                    className={`btn btn-primary col-4 float-right ${
                      !this.state.isEditable ? 'd-none' : ''
                    }`}
                    onClick={props.handleReset}>
                    Cancle
                  </button>
                </Form>
              )}
            />
          </div>
        </div>
      </div>
    );
  }
};

const mapStateToProps = state => ({
  user: state.user && state.user.info
});

const mapDispatchToProps = dispatch => ({
  handleSubmit: async values => {
    const userId = values.id;
    const user = {
      gender: values.gender,
      name: values.name,
      email: values.email,
      password: values.newPassword,
      cell: values.cell,
      dob: values.dob
    };
    dispatch(dux.asyncActions.updateUser(userId, user));
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UserProfile);
