import React, { Component } from 'react';
import { Formik, Form, Field } from 'formik';
import { connect } from 'react-redux';
import SendGlider from '../components/icons/SendGlider';
import * as dux from '../../redux/dux/index';

const MessageBox = class extends Component {
  render() {
    const { handleSubmit, eventId, ...props } = this.props;
    return (
      <div {...props}>
        <Formik
          initialValues={{ messageText: '' }}
          onSubmit={async (
            values,
            { setSubmitting, resetForm, initialValues }
          ) => {
            await handleSubmit(eventId, values);
            setSubmitting(false);
            resetForm(initialValues);
          }}>
          <Form>
            <div className="input-group my-3">
              <Field
                name="messageText"
                component="textarea"
                className="form-control message-box"
                placeholder="Type a message"
                rows="2"
              />
              <button
                type="submit"
                className="btn btn-warning input-group-append">
                <SendGlider className="medium-icon" />
              </button>
            </div>
          </Form>
        </Formik>
      </div>
    );
  }
};

const mapDispatchToProps = dispatch => ({
  handleSubmit: async (eventId, values) => {
    const messageContent = {
      text: values.messageText
    };
    return dispatch(
      dux.asyncActions.sendMessageToEvent(eventId, messageContent)
    );
  }
});

export default connect(
  null,
  mapDispatchToProps
)(MessageBox);
