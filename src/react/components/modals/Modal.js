import React from 'react';

const Modal = ({ children, modalId }) => (
  <div class="modal fade" id={modalId} tabindex="-1" role="dialog">
    <div class="modal-dialog" role="document">
      <div class="modal-content card">{children}</div>
    </div>
  </div>
);

export default Modal;
