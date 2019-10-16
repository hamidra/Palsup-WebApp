import { connect } from 'react-redux';
import UserListModal from '../components/modals/UserListModal';
import * as dux from '../../redux/dux/index';
import { getTopN } from '../../utilities';

const mapStateToProps = (state, ownProps) => {
  return {
    topUsers:
      ownProps.event &&
      ownProps.event.group &&
      getTopN(ownProps.event.group.members, 4),
    users: ownProps.event && state.eventMembers.items[ownProps.event.id]
  };
};
const mapDispatchToProps = (dispatch, ownProps) => ({
  handleShow: () =>
    ownProps.event &&
    dispatch(dux.asyncActions.fetchEventMembers(ownProps.event.id))
});

export default connect(mapStateToProps, mapDispatchToProps)(UserListModal);
