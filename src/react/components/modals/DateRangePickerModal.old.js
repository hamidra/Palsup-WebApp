import React from 'react';
import Modal from './Modal';
import DateRangePicker from '../DateRangePicker';

const DateRangePickerModal = ({ modalId, handleSearchClick }) => (
  <Modal modalId={modalId}>
    <button type="button" class="close modal-close" data-dismiss="modal">
      <span aria-hidden="true">&times;</span>
    </button>
    <div class="modal-body m-3">
      <DateRangePicker handleSearchClick={handleSearchClick} />
    </div>
  </Modal>
);

export default DateRangePickerModal;
