import React, { Component, Fragment } from 'react';
import CloseIcon from '../icons/close';
import { Modal } from 'react-bootstrap';
import { Formik, Field, Form } from 'formik';
import { displayEventDate, displayAddress } from '../../../utilities';
import moment from 'moment';

export default class EditableEventInfoModal extends Component {
  constructor(props) {
    super(props);
    this.state = { showModal: false };
    this.handleShow = this.handleShow.bind(this);
    this.handleHide = this.handleHide.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleShow() {
    this.setState({ showModal: true });
  }
  handleHide() {
    this.setState({ showModal: false });
  }
  handleSubmit(values, { setSubmitting, initialValues, resetForm }) {
    if (this.props.handleSubmit && this.props.event) {
      const datetime = new Date(`${values.date} ${values.time}`);
      const eventPatch = {
        activity: values.activity,
        date:
          datetime && datetime > Date.now()
            ? { startDate: datetime, endDate: datetime }
            : undefined,
        location: {
          ...this.props.event.location,
          address: /\S/.test(values.location) ? values.location : undefined
        },
        description: values.description
      };
      this.props.handleSubmit(this.props.event.id, eventPatch);
    }
    this.handleHide();
    setSubmitting(false);
    resetForm(initialValues);
  }
  render() {
    let { event } = this.props;
    return (
      <Fragment>
        <u className="float-right">
          <a
            href="#"
            onClick={e => {
              this.handleShow();
              e.preventDefault();
            }}>
            Edit
          </a>
        </u>
        <div>
          <h4>{event.activity}</h4>
          <p>{displayEventDate(event.date)}</p>
          <p>{displayAddress(event.location)}</p>
          <p>{event.description}</p>
        </div>
        <Modal show={this.state.showModal} onHide={this.handleHide}>
          <a
            onClick={this.handleHide}
            className="bg-white action-icon modal-close">
            <CloseIcon />
          </a>
          <Modal.Body>
            <Formik
              initialValues={{
                activity: event.activity,
                date:
                  event.date &&
                  moment(event.date.startDate).format('YYYY-MM-DD'),
                time:
                  event.date && moment(event.date.startDate).format('HH:mm'),
                location: event.location && event.location.address,
                description: event.description
              }}
              onSubmit={this.handleSubmit}>
              <Form className="py-5">
                <div className="form-group">
                  <label class="form-check-label" for="description">
                    Title
                  </label>
                  <Field name="activity" className="form-control w-50" />
                </div>
                <label class="form-check-label" for="time">
                  Time
                </label>
                <div className="form-row">
                  <div className="form-group col-6">
                    <Field name="date" className="form-control" type="date" />
                  </div>
                  <div className="form-group col-5">
                    <Field name="time" className="form-control" type="time" />
                  </div>
                  <div className="form-group col-1">
                    <label class="form-check-label" for="time">
                      PDT
                    </label>
                  </div>
                </div>
                <div className="form-group">
                  <label class="form-check-label" for="time">
                    Location
                  </label>
                  <Field name="location" className="form-control" />
                </div>
                <div className="form-group">
                  <label class="form-check-label" for="description">
                    Description
                  </label>
                  <Field
                    name="description"
                    component="textarea"
                    className="form-control"
                    rows="4"
                  />
                </div>
                <button type="submit" class="btn btn-primary col-4">
                  Save
                </button>
              </Form>
            </Formik>
          </Modal.Body>
        </Modal>
      </Fragment>
    );
  }
}
