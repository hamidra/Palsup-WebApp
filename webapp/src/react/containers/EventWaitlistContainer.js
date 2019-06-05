import { connect } from 'react-redux';
import UserListModal from '../components/modals/UserListModal';
import * as dux from '../../redux/dux/index';
import { getTopN } from '../../utilities';

const mapStateToProps = (state, ownProps) => {
  return {
    topUsers:
      ownProps.event &&
      ownProps.event.group &&
      getTopN(ownProps.event.group.waitlist, 4),
    users: ownProps.event && state.eventWaitlist.items[ownProps.event.id]
  };
};
const mapDispatchToProps = (dispatch, ownProps) => ({
  handleShow: () =>
    ownProps.event &&
    dispatch(dux.asyncActions.fetchEventWaitlist(ownProps.event.id)),
  handleVoteOnWaitlist: (waitlistUserId, vote) =>
    ownProps.event &&
    dispatch(
      dux.asyncActions.submitVoteOnEventWaitlist(
        ownProps.event.id,
        waitlistUserId,
        vote
      )
    )
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UserListModal);
