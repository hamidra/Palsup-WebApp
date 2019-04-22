import React, { Component, Fragment } from 'react';
import { Modal } from 'react-bootstrap';
import { displayDateFromNow } from '../../../utilities';
import EventCard from '../cards/EventCard';
import CloseIcon from '../icons/close';

const EventModal = class extends Component {
  constructor(props) {
    super(props);
    this.state = { showModal: false };
    this.handleShow = this.handleShow.bind(this);
    this.handleHide = this.handleHide.bind(this);
  }
  handleShow() {
    this.setState({ showModal: true });
  }
  handleHide() {
    this.setState({ showModal: false });
  }
  render() {
    const { event, handleLikeClick } = this.props;
    return (
      <Fragment>
        <div className="card-container col-3 my-1">
          <EventCard
            event={event}
            handleLikeClick={handleLikeClick}
            handleModalShow={this.handleShow}
          />
        </div>
        <Modal show={this.state.showModal} onHide={this.handleHide}>
          <a
            onClick={this.handleHide}
            className="bg-white action-icon modal-close">
            <CloseIcon />
          </a>
          <img class="modal-image" src={event.absoluteImage} alt="..." />
          <Modal.Body>
            <h5>{event.activity}</h5>
            <p>{event.description}</p>
            <p>{displayDateFromNow(event.date)}</p>
          </Modal.Body>
        </Modal>
      </Fragment>
    );
  }
};

export default EventModal;
