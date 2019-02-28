import React, { Component } from 'react';
import { Formik, Form, Field } from 'formik';
import { connect } from 'react-redux';
import * as userConversationsDux from '../../redux/dux/userConversations';

const MessageBox = class extends Component {
  render() {
    const { handleSubmit } = this.props;
    return (
      <Formik
        initialValues={{ messageText: '' }}
        onSubmit={async (
          values,
          { setSubmitting, resetForm, initialValues }
        ) => {
          await handleSubmit(values);
          setSubmitting(false);
          resetForm(initialValues);
        }}>
        <Form>
          <div className="input-group my-3">
            <Field
              name="messageText"
              component="textarea"
              className="col-11 form-control"
              placeholder="Type a message"
              rows="2"
            />
            <button type="submit" class="btn btn-primary input-group-append">
              <span>s</span>
            </button>
          </div>
        </Form>
      </Formik>
    );
  }
};

const mapDispatchToProps = (dispatch, ownProps) => ({
  handleSubmit: async values => {
    const messageContent = {
      text: values.messageText
    };
    return dispatch(
      userConversationsDux.asyncActions.sendMessageToEvent(
        ownProps.eventId,
        messageContent
      )
    );
  }
});

export default connect(
  null,
  mapDispatchToProps
)(MessageBox);
