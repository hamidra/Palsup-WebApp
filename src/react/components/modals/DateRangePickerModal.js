import React, { Fragment, Component } from 'react';
import DateRangePicker from '../DateRangePicker';
import { Modal } from 'react-bootstrap';

class DateRangePickerModal extends Component {
  constructor(props) {
    super(props);

    this.handleShow = this.handleShow.bind(this);
    this.handleClose = this.handleClose.bind(this);

    this.state = {
      show: false
    };
  }

  handleClose(event) {
    this.setState({ show: false });
    event && event.preventDefault();
  }

  handleShow(event) {
    this.setState({ show: true });
    event && event.preventDefault();
  }

  render() {
    const { handleSearchClick } = this.props;
    return (
      <Fragment>
        <button
          class="btn btn-outline-primary rounded w-100 h-100 py-sm-3"
          onClick={this.handleShow}>
          Sometime <span className="d-block float-right">></span>
        </button>
        <Modal show={this.state.show} onHide={this.handleClose}>
          <Modal.Body>
            <DateRangePicker handleSearchClick={handleSearchClick} />
          </Modal.Body>
        </Modal>
      </Fragment>
    );
  }
}

export default DateRangePickerModal;
