import { connect } from 'react-redux';
import PalsPanel from '../components/PalsPanel';
import * as dux from '../../redux/dux/index';

const mapStateToProps = state => ({
  user: state.user && state.user.isAuthenticated && state.user.info,
  pals:
    state.activityPals && state.activityPals.items
      ? state.activityPals.items
      : {}
});

const mapDispatchToProps = dispatch => ({
  handleLikeClick: (palId, liked) =>
    dispatch(dux.asyncActions.toggleLikePal(palId, liked))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PalsPanel);
