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
        <EventCard
          event={event}
          handleShowModal={this.handleShow}
          handleLikeClick={handleLikeClick}
        />
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
          <Modal.Footer>
            <img
              src={
                event &&
                event.group &&
                event.group.members &&
                event.group.members[0] &&
                event.group.members[0].absolutePicture &&
                event.group.members[0].absolutePicture.thumbnail
              }
            />
          </Modal.Footer>
        </Modal>
      </Fragment>
    );
  }
};

export default EventModal;
