import { connect } from 'react-redux';
import PalsPanel from '../components/PalsPanel';
import * as dux from '../../redux/dux/index';
import { withRouter } from 'react-router-dom';

const mapStateToProps = state => ({
  user: state.user && state.user.isAuthenticated && state.user.info,
  activityFilter: state.activity,
  pals:
    state.activityPals && state.activityPals.items
      ? state.activityPals.items
      : {},
  topPals: state.topPals && state.topPals.items ? state.topPals.items : {}
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  handleLikeClick: (palId, liked) => {
    if (ownProps.isAuthenticated) {
      dispatch(dux.asyncActions.toggleLikePal(palId, liked));
    } else {
      ownProps.history.push('/signin');
    }
  }
});

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(PalsPanel)
);
