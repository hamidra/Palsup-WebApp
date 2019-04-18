import { connect } from 'react-redux';
import EditableEventInfoModal from '../components/modals/EditableEventInfoModal';
import * as dux from '../../redux/dux/index';

const mapDispatchToProps = dispatch => ({
  handleSubmit: async (eventId, eventPatch) => {
    dispatch(dux.asyncActions.updateEvent(eventId, eventPatch));
  }
});

export default connect(
  null,
  mapDispatchToProps
)(EditableEventInfoModal);
