import React, { Component, Fragment } from 'react';
import { Modal } from 'react-bootstrap';
import PalCard from '../cards/PalCard';
import { displayDateFromNow, toCapCase, toUpperCase } from '../../../utilities';
import CloseIcon from '../icons/close';
import UserInfoLong from '../UserInfoLong';

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
        <div className="card-container col-3 my-1">
          <PalCard
            pal={pal}
            handleModalShow={this.handleShow}
            handleLikeClick={handleLikeClick}
          />
        </div>
        <Modal show={this.state.showModal} onHide={this.handleHide}>
          <img
            className="modal-image"
            src={pal.user.absolutePicture.large}
            alt="..."
          />
          <button
            onClick={this.handleHide}
            className="bg-white icon action-icon modal-close">
            <CloseIcon />
          </button>
          <Modal.Body className="modal-body">
            <UserInfoLong user={pal.user} className="W-100" />
          </Modal.Body>
        </Modal>
      </Fragment>
    );
  }
};
export default PalModal;
