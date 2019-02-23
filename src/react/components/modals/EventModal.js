import React from 'react';
import Modal from './Modal';
import { displayDateFromNow } from '../../../utilities';

const EventModal = ({ event, modalId }) => (
  <Modal modalId={modalId}>
    <img class="modal-image" src={event.image} alt="..." />
    <button type="button" class="close modal-close" data-dismiss="modal">
      <span aria-hidden="true">&times;</span>
    </button>
    <div class="modal-body">
      <h5 class="modal-title">{event.activity}</h5>
      <p>{event.description}</p>
      <p>{displayDateFromNow(event.date)}</p>
    </div>
    <div class="modal-footer">
      <img
        src={
          event &&
          event.group &&
          event.group.members &&
          event.group.members[0] &&
          event.group.members[0].picture &&
          event.group.members[0].picture.thumbnail
        }
      />
    </div>
  </Modal>
);

export default EventModal;
