import React, { Component, Fragment } from 'react';
import { Modal } from 'react-bootstrap';
import CloseIcon from '../../../icons/close';
import ImageEditor from '../ImageEditor';

const EditableImageModal = class extends Component {
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
    const {
      image,
      height,
      width,
      scale,
      borderRadius,
      border,
      handleImageUpload
    } = this.props;
    return (
      <Fragment>
        <div className="position-relative">
          <img className="w-100" src={image} onClick={this.handleShow} />
          <button
            className="btn btn-primary border"
            onClick={this.handleShow}
            style={{
              position: 'absolute',
              left: '1rem',
              top: '1rem',
              opacity: 0.5
            }}>
            Edit
          </button>
        </div>
        <Modal
          dialogClassName="p-4"
          show={this.state.showModal}
          onHide={this.handleHide}>
          <a
            onClick={this.handleHide}
            style={{ background: 'grey' }}
            className="action-icon modal-close ml-auto">
            <CloseIcon />
          </a>
          <ImageEditor
            className="mx-3"
            image={image}
            height={height}
            width={width}
            scale={scale}
            borderRadius={borderRadius}
            border={border}
            handleImageUpload={handleImageUpload}
          />
          <Modal.Body />
        </Modal>
      </Fragment>
    );
  }
};

export default EditableImageModal;
