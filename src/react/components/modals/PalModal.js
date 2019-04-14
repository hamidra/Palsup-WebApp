import React, { Component, Fragment } from 'react';
import { Modal } from 'react-bootstrap';
import PalCard from '../cards/PalCard';
import { displayDateFromNow } from '../../../utilities';
import CloseIcon from '../icons/close';

const PalModal = class extends Component {
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
    const { pal, handleLikeClick } = this.props;
    return (
      <Fragment>
        <PalCard
          pal={pal}
          handleShowModal={this.handleShow}
          handleLikeClick={handleLikeClick}
        />
        <Modal show={this.state.showModal} onHide={this.handleHide}>
          <img
            class="modal-image"
            src={pal.user.absolutePicture.large}
            alt="..."
          />
          <a
            onClick={this.handleHide}
            className="bg-white action-icon modal-close">
            <CloseIcon />
          </a>
          <Modal.Body class="modal-body">
            <h5 class="modal-title">
              {`${pal.user.name.first} ${pal.user.name.last}`}
            </h5>
            <p>{`${pal.location.city}, ${pal.location.state}`}</p>
            <p>
              {`down for ${pal.activity}`} <br /> {displayDateFromNow(pal.date)}
            </p>
          </Modal.Body>
        </Modal>
      </Fragment>
    );
  }
};
export default PalModal;
