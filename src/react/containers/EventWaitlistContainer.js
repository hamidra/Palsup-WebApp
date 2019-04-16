import { connect } from 'react-redux';
import UserListModal from '../components/modals/UserListModal';
import * as dux from '../../redux/dux/index';
import { getTopN } from '../../utilities';

const mapStateToProps = (state, ownProps) => {
  return {
    topUsers: ownProps.event && getTopN(ownProps.event.interested, 4),
    users: ownProps.event && state.eventWaitlist.items[ownProps.event.id]
  };
};
const mapDispatchToProps = (dispatch, ownProps) => ({
  handleShow: () =>
    ownProps.event &&
    dispatch(dux.asyncActions.fetchEventWaitlist(ownProps.event.id))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UserListModal);
