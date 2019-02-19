import React from 'react';
import Modal from './Modal';
import { displayDateFromNow } from '../../../utilities';

const EventModal = ({ pal, modalId }) => (
  <Modal modalId={modalId}>
    <img class="modal-image" src={pal.user.picture.large} alt="..." />
    <button type="button" class="close modal-close" data-dismiss="modal">
      <span aria-hidden="true">&times;</span>
    </button>
    <div class="modal-body">
      <h5 class="modal-title">
        {`${pal.user.name.first} ${pal.user.name.last}`}
      </h5>
      <p>{`${pal.location.city}, ${pal.location.state}`}</p>
      <p>
        {`down for ${pal.activity}`} <br /> {displayDateFromNow(pal.date)}
      </p>
    </div>
  </Modal>
);

export default EventModal;
