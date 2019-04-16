import React, { Component, Fragment } from 'react';
import { Modal } from 'react-bootstrap';
import UserInfoCollapsable from '../UserInfoCollapsable';
import CloseIcon from '../icons/close';
import ThumbnailStack from '../ThumbnailStack';
import { getTopN } from '../../../utilities';

export default class UserListModal extends Component {
  constructor(props) {
    super(props);
    this.state = { showModal: false };
    this.handleShow = this.handleShow.bind(this);
    this.handleHide = this.handleHide.bind(this);
  }
  handleShow() {
    this.props.handleShow && this.props.handleShow();
    this.setState({ showModal: true });
  }
  handleHide() {
    this.props.handleHide && this.props.handleHide();
    this.setState({ showModal: false });
  }
  render() {
    let { topUsers, users } = this.props;
    return (
      <Fragment>
        <ThumbnailStack users={topUsers} onClick={this.handleShow} />
        <Modal show={this.state.showModal} onHide={this.handleHide}>
          <a
            onClick={this.handleHide}
            className="bg-white action-icon modal-close">
            <CloseIcon />
          </a>
          <Modal.Body>
            <div className="mt-5">
              {users &&
                users.map(user => (
                  <div className="m-1">
                    <UserInfoCollapsable user={user} />
                  </div>
                ))}
            </div>
          </Modal.Body>
        </Modal>
      </Fragment>
    );
  }
}
